import 'maplibre-gl/dist/maplibre-gl.css';
import './MapPage.css'
import Map, {NavigationControl, GeolocateControl} from 'react-map-gl/maplibre';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef, useCallback } from "react";
import axios from 'axios';
import { twoline2satrec} from 'satellite.js';


import getStarlinksNewPositions from "../helpers/getNewStarlinksPositions";
import StarlinksMapLayer from '../components/StarlinksMapLayer';
import StarlinksMapLayer3D from '../components/StarlinksMapLayer3D';
import Chat from "../components/Chat";
import Scene3D from '../components/Scene3D';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;



function MapPage() {
  const [starlinks, setStarlinks] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const [scene3D, setScene3D] = useState(false);
  const mapRef = useRef();
  const geoControlRef = useRef();

  const API = import.meta.env.VITE_STARLINK_API || 'https://api.spacexdata.com/v4/starlink'

  async function getFlyingStarlinks() {
    const {data} = await axios.get(`${API}`)
    const activeStarlinks = data.filter(starlink => starlink.spaceTrack.DECAYED === 0).map(starlink => {
      starlink.satrec = twoline2satrec(starlink.spaceTrack.TLE_LINE1, starlink.spaceTrack.TLE_LINE2);
      return starlink;
    });
    console.log(activeStarlinks);
    setStarlinks(activeStarlinks);
    setDataFetched(true);
  }

  function setCurrentCoordinates(){
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        
        // const {data} = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
        // console.log(data);
      });
    } else {
      /* geolocation IS NOT available */
    }
  }

  

  useEffect(() => {
    getFlyingStarlinks();
    setCurrentCoordinates();
    const updateTimeout = setInterval(() => {
      if(!dataFetched) return
      // const newStarlinks = getStarlinksNewPositions(starlinks);
      // setStarlinks(newStarlinks); // Disable starlink motion, waiting to fix it
    },1000)
    if(geoControlRef.current) geoControlRef.current.trigger();
    console.log(geoControlRef.current)
    return () => clearInterval(updateTimeout);
  }, [dataFetched])


  return (
    <>
    <Chat/>
    <button className="switchView"  onClick={() => setScene3D(!scene3D)}>{scene3D ? '3D' : '2D'}</button>
    { scene3D ? <Scene3D starlinks={starlinks}/>
    :
      <Map
      antialias
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 2,
      }}
      mapStyle='/dark_custom.json'
      ref={mapRef}
      >
        <NavigationControl/>
        <GeolocateControl ref={geoControlRef}/>
        {starlinks && <StarlinksMapLayer starlinks={starlinks}/>}
        {
          // starlinks &&
          // <StarlinksMapLayer3D starlinks={starlinks}/>
        }
        
      </Map>
    }
    </>
  )
}

export default MapPage;