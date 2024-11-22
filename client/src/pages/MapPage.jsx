import "maplibre-gl/dist/maplibre-gl.css";
import 'maplibre-react-components/style.css';
import { RMap, RNavigationControl } from 'maplibre-react-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import StarlinksMapLayer from "../components/StarlinksMapLayer";
import getStarlinksNewPositions from "../helpers/getNewStarlinksPositions";

function MapPage() {
    const [starlinks, setStarlinks] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

  async function getFlyingStarlinks() {
    const {data} = await axios.get('https://api.spacexdata.com/v4/starlink')
    const activeStarlinks = data.filter(starlink => starlink.spaceTrack.DECAYED !== 1);
    // console.log(activeStarlinks);
    setStarlinks(activeStarlinks);
    setDataFetched(true);
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
   <RMap
   mapStyle='/dark_custom.json'
   minZoom={1}
   >
    <RNavigationControl position="top-right" visualizePitch={true} />
    {/* <StarlinksMapLayer starlinks={starlinks}/> */}
   </RMap>
  )
}

export default MapPage;