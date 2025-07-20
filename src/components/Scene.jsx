import { Canvas } from "@react-three/fiber";

const Scene = () => {
  console.log("Scene component rendered!"); // More descriptive console log

  return (
    // Canvas is the entry point for react-three/fiber scenes
    <Canvas>
      {/* Mesh component to hold geometry and material */}
      <mesh>
        {/* Define the geometry for the mesh (e.g., a box) */}
        <boxGeometry args={[1, 1, 1]} /> {/* args for width, height, depth */}
        {/* Define the material for the mesh */}
        <meshBasicMaterial color="hotpink" /> {/* Set a color for visibility */}
      </mesh>
    </Canvas>
  );
};

export default Scene;
