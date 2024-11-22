import {RSource, RLayer } from 'maplibre-react-components';


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

    
    return ( 
        <>
            <RSource key='satellites' id='satellites' type='geojson' data={satellitesData}/>
            <RLayer
            key='satellites-layer'
            id='satellites-layer'
            source='satellites'
            type='circle'
            paint={satellitesPaint}
            />
        </>
     );
}

export default StarlinksMapLayer;