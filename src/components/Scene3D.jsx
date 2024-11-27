import { Suspense } from "react";
import { Canvas} from "@react-three/fiber";
import { OrbitControls, useTexture, Stars } from "@react-three/drei";
import { DoubleSide } from "three";
import { useState } from "react";
import Starlink3D from "./Starlink3D";
import CurrentStarlink from "./CurrentStarlink";

function EarthScene({starlinks, setHoveredStarlink}) {
        const earthTextures = useTexture({
            map:'./textures/8k_earth_daymap.jpg',
            normalMap:'./textures/8k_earth_normal_map.jpg',
            specularMap:'./textures/8k_earth_specular_map.jpg',
            cloudsMap:'./textures/8k_earth_clouds.jpg',
        });



    return ( 
        <>
        <OrbitControls panSpeed={0.5} zoomSpeed={0.6} rotateSpeed={0.4}/>
        <ambientLight intensity={0.5}/>
        <pointLight position={[4.5, 0, 4.5]} intensity={60} color='white' scale={3}/>
        <Stars/>
        <mesh>
            <sphereGeometry args={[3.005, 64, 64]} />
            <meshPhongMaterial map={earthTextures.cloudsMap} opacity={0.4} depthWrite={false} transparent={true} side={DoubleSide}/>
        </mesh>
        <mesh>
            <sphereGeometry args={[3, 64, 64]}/>
            <meshPhongMaterial  color='red' specularMap={earthTextures.specularMap}/>
            <meshStandardMaterial map={earthTextures.map} normalMap={earthTextures.normalMap} metalness={0.4} roughness={0.7}/>
        </mesh>
        {starlinks.map(starlink => <Starlink3D starlink={starlink} setHoveredStarlink={setHoveredStarlink}/>)}
        </>
     );
}




function Scene3D({starlinks}) {

    const [hoveredStarlink, setHoveredStarlink] = useState(null);
    console.log(hoveredStarlink);

    return (
        <>
        <CurrentStarlink starlink={hoveredStarlink}/>
        <Canvas>
            <Suspense fallback={null}>
                <EarthScene starlinks={starlinks} setHoveredStarlink={setHoveredStarlink}/>
            </Suspense>
        </Canvas>
        </>
     );
}

export default Scene3D;