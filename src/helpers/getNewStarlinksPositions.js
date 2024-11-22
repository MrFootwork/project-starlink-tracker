import updateSatellitePosition from "./updateSatellitePosition";

export default function getStarlinksNewPositions(starlinks){
    const starlinksNewPositions =  starlinks.map(starlink => {
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
  return starlinksNewPositions;
}