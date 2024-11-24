import {Source, Layer} from 'react-map-gl'


function StarlinksMapLayer({starlinks}) {
    
    let featureList = [];
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
    
      const satellitesData = {
        "type": "FeatureCollection",
        "features" : featureList
        
      }
    
      const satellitesPaint = {
        'circle-radius': 2,
        'circle-color': '#007cbf'
      }

      const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: satellitesPaint,
      }

    
    return ( 
        <Source id='starlinks' type='geojson' data={satellitesData}>
          <Layer {...layerStyle}/>
        </Source>
     );
}

export default StarlinksMapLayer;