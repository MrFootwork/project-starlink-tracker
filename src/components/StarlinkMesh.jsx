function StarlinkMesh({starlink}) {
    return ( 
        <mesh scale={1000} position={[starlink.longitude*100000, starlink.height_km * 1000, starlink.latitude*-100000]}>
            <boxGeometry args={[50, 50, 50]}/>
            <meshStandardMaterial color={'blue'} />
        </mesh>
     );
}

export default StarlinkMesh;