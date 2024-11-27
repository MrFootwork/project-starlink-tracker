import {sgp4, gstime, eciToEcf, eciToGeodetic } from 'satellite.js'

export default function updateSatellitePosition(satellite, deltaTime) {
    // const {
    //     lat, lon, altitude, velocity, inclination, period
    // } = satellite;
    const time = Date.now();
    const gsTime = gstime(time)
    // console.log(time, gsTime);
    const positionAndVelocity = sgp4(satellite.satrec, 60*60*100);
    const ecefCoords = eciToEcf(positionAndVelocity.position, gsTime);
    const geodeticCoords = eciToGeodetic(positionAndVelocity.position, gsTime);

    // console.log(positionAndVelocity, geodeticCoords, ecefCoords);
    
    return {
        lat: satellite.latitude + geodeticCoords.latitude,
        lon: satellite.longitude + geodeticCoords.longitude,
    };
  }