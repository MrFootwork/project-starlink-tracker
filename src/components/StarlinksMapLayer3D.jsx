import { Canvas } from "react-three-map/maplibre";
import StarlinkMesh from "./StarlinkMesh";


function StarlinksMapLayer3D({starlinks}) {
    return ( 
        <Canvas latitude={0} longitude={0}>
            <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[0, 0, 0]}
            intensity={Math.PI}
            />
            {starlinks.map(starlink => <StarlinkMesh starlink={starlink}/>)}
        </Canvas>
     );
}

export default StarlinksMapLayer3D;