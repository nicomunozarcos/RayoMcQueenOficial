import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ThreeDModel = ({ modelPath, modelScale = 1}) => {
  // Carga el modelo GLTF
  const { scene } = useGLTF(modelPath);
  scene.scale.set(modelScale, modelScale, modelScale);

  // Ajusta la posición y rotación inicial del modelo
  scene.position.set(0, -1, 0); // Cambia la posición inicial: [x, y, z]
  scene.rotation.set(0, Math.PI / 2, 0); // Ajusta la rotación inicial: [x, y, z]

  return (
    <Canvas>
      <ambientLight />
      <directionalLight intensity={1} />
      <primitive object={scene}/>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeDModel;
