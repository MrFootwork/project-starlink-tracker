import updateSatellitePosition from "./updateSatellitePosition";

export default function getStarlinksNewPositions(starlinks){
    const starlinksNewPositions =  starlinks.map(starlink => {
    let {lat, lon} = updateSatellitePosition(starlink, 0.004);
    // console.log(starlink.longitude, starlink.latitude, lon, lat);
    const newStarlink = {...starlink};
    starlink.longitude = lon;
    starlink.latitude = lat;
    return newStarlink;
  })
  return starlinksNewPositions;
}