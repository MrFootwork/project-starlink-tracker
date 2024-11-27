import './CurrentStarlink.css'

function CurrentStarlink({starlink}) {
    return ( 
        <div className="CurrentStarlink">
            <div>Starlink: {starlink && starlink.spaceTrack.OBJECT_NAME}</div>
            <div>Latitude: {starlink && starlink.latitude}</div>
            <div>Longitude: {starlink && starlink.longitude}</div>
            <div>Height(km): {starlink && starlink.height_km}</div>
            <div>Period(min): {starlink && starlink.spaceTrack.PERIOD}</div>
            <div>Velocity(km/s): {starlink && starlink.velocity_kms}</div>
        </div>
     );
}

export default CurrentStarlink;