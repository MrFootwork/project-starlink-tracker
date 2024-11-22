export default function updateSatellitePosition(satellite, deltaTime) {
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