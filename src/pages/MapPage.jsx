import 'maplibre-gl/dist/maplibre-gl.css';
import Map, {NavigationControl} from 'react-map-gl/maplibre';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from "react";
import axios from 'axios';


import getStarlinksNewPositions from "../helpers/getNewStarlinksPositions";
import StarlinksMapLayer from '../components/StarlinksMapLayer';
import StarlinksMapLayer3D from '../components/StarlinksMapLayer3D';
import Chat from "../components/Chat";


function MapPage() {
  const [starlinks, setStarlinks] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const API = import.meta.env.VITE_STARLINK_API || 'https://api.spacexdata.com/v4/starlink'

  async function getFlyingStarlinks() {
    const {data} = await axios.get(`${API}`)
    const activeStarlinks = data.filter(starlink => starlink.spaceTrack.DECAYED !== 1);
    // console.log(activeStarlinks);
    setStarlinks(activeStarlinks);
    setDataFetched(true);
    console.log(starlinks[0]);
  }

  useEffect(() => {
    getFlyingStarlinks();

    const updateTimeout = setInterval(() => {
      if(!dataFetched) return
      const newStarlinks = getStarlinksNewPositions(starlinks);
      setStarlinks(newStarlinks);
    },100)
    return () => clearInterval(updateTimeout);
  }, [dataFetched])

  return (
   <Map
   antialias
   initialViewState={{
    longitude: 0,
    latitude: 0,
    zoom: 2,
  }}
  mapStyle='/dark_custom.json'
   >
    <NavigationControl/>
    {/* <StarlinksMapLayer starlinks={starlinks}/> */}
    {
      starlinks &&
      <StarlinksMapLayer3D starlinks={starlinks}/>
    }
    <Chat/>
   </Map>
  )
}

export default MapPage;