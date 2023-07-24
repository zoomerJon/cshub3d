/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/dust2_a_styled.glb");

  useEffect(() => {
    materials.Mat0.envMapIntensity = 0.7;
  }, []);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.VoxelMesh0.geometry}
        material={materials.Mat0}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/dust2_a_styled.glb");
