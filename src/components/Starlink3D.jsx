



function latLonTo3D(lat, lon, radius){
    const phi = (90-lat)*(Math.PI/180);
    const theta = (lon + 180)*(Math.PI/180)

    const x = -(radius * Math.sin(phi)*Math.cos(theta));
    const z = (radius * Math.sin(phi)*Math.sin(theta));
    const y = (radius *  Math.cos(phi));

    return [x, y, z]
}


function Starlink3D({starlink, setHoveredStarlink}) {

    const [x, y, z] = latLonTo3D(starlink.latitude, starlink.longitude, 3)

    return ( 
        <mesh position={[x*1.05, y, z*1.05]} onPointerEnter={async () => setHoveredStarlink(starlink)} onPointerLeave={() => setHoveredStarlink(null)}>
            <boxGeometry args={[0.015, 0.015, 0.015]}/>
            <meshPhongMaterial color='#007cbf'/>
        </mesh>
     );
}

export default Starlink3D;{Starlink3D}