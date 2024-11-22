import './App.css'
import "maplibre-gl/dist/maplibre-gl.css";
import 'maplibre-react-components/style.css';

import { RMap, RNavigationControl, RSource, RLayer } from 'maplibre-react-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function updateSatellitePosition(satellite, deltaTime) {
  // const {
  //     lat, lon, altitude, velocity, inclination, period
  // } = satellite;

  const lat = satellite.latitude;
  const lon = satellite.longitude;
  const altitude = satellite.height_km;
  const velocity = satellite.velocity_km;
  const inclination = satellite.spaceTrack.INCLINATION;
  const period = satellite.spaceTrack.PERIOD;

  // Earth's rotation rate (degrees per second)
  const earthRotationRate = 360 / 86400; // ~0.004167 deg/s

  // Orbital angle change during deltaTime (degrees)
  const deltaNu = (360 / period) * deltaTime; // Change in true anomaly

  // Convert inclination to radians
  const inclinationRad = (inclination * Math.PI) / 180;

  // Calculate the change in latitude
  const deltaLat = deltaNu * Math.sin(inclinationRad); // Approximate latitude change
  let newLat = lat + deltaLat;

  // Clamp latitude to [-90, 90]
  if (newLat > 90) newLat = 180 - newLat;
  if (newLat < -90) newLat = -180 - newLat;

  // Calculate the change in longitude
  const deltaLon = deltaNu / Math.cos((lat * Math.PI) / 180); // Approximate longitude change
  let newLon = lon + deltaLon - earthRotationRate * deltaTime;

  // Normalize longitude to [-180, 180]
  newLon = ((newLon + 540) % 360) - 180;

  return {
      lat: newLat,
      lon: newLon,
  };
}


function App() {
  const [starlinks, setStarlinks] = useState(null);


  async function getFlyingStarlinks() {
    const {data} = await axios.get('https://api.spacexdata.com/v4/starlink')
    const activeStarlinks = data.filter(starlink => starlink.spaceTrack.DECAYED !== 1);
    // console.log(activeStarlinks);
    setStarlinks(activeStarlinks);
  }

  useEffect(() => {
    getFlyingStarlinks();

    const updateTimeout = setInterval(() => {
      if(!starlinks) return;
      const newStarlinks = starlinks.map(starlink => {
        let {lat, lon} = updateSatellitePosition(starlink, 0.004);
        // console.log(starlink.longitude, starlink.latitude, lon, lat);
        const newStarlink = {...starlink};
        if(lat >= 90) lat = -90 + (lat - 90);
        if(lat <= -90) lat = 90 - (lat + 90);
        // if(lon >= 180) lon = -180;
        // if(lon <= -180) lon = 180;
        // starlink.latitude = lat;
        starlink.longitude = lon;
        return newStarlink;
      })

      setStarlinks(newStarlinks);
      // getFlyingStarlinks();
      // console.log(starlinks)
    },100)
    return () => clearInterval(updateTimeout);
  }, [])

  let featureList = []

  // console.log('re-rendered')
  if(starlinks){
    featureList = starlinks.map(starlink => {
      return {
        "type" : "Feature",
        "geometry" : {
          'type' : 'Point',
          'coordinates' : [starlink.longitude, starlink.latitude]
        }
      }
    })
  }

  const pointTestData = {
    "type": "FeatureCollection",
    "features" : featureList
    
  }

  const testPaint = {
    'circle-radius': 2,
    'circle-color': '#007cbf'
  }

  return (
   <RMap
   mapStyle='https://tiles.openfreemap.org/styles/liberty'
   minZoom={2}
   >
    <RNavigationControl position="top-right" visualizePitch={true} />
    <RSource key='test' id='test' type='geojson' data={pointTestData}/>
        <RLayer
        key='test-layer'
        id='test-layer'
        source='test'
        type='circle'
        paint={testPaint}
        />
    {/* {starlinks && starlinks.map(starlink => <Satellite key={starlink.id} starlink={starlink}/>)} */}
    {/* {starlinks && starlinks.slice(0, 100).map(starlink => <Satellite key={starlink.id} starlink={starlink}/>)} */}
   </RMap>
  )
}

export default App
