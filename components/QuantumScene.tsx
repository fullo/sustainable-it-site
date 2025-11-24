/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, Stars, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Add missing type definitions for R3F intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const DataNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </Icosahedron>
  );
};

const FloatingLeaf = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.z = Math.sin(t * 0.5 + position[0]) * 0.1;
            ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[0.8, 0.05, 1.2]} />
                <meshStandardMaterial color="#059669" transparent opacity={0.8} />
            </mesh>
        </group>
    )
}

export const EcoNetworkScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Central Hub */}
          <DataNode position={[0, 0, 0]} color="#059669" scale={1.5} />
          
          {/* Connecting Nodes */}
          <DataNode position={[-3, 1, -2]} color="#34D399" scale={0.6} />
          <DataNode position={[3, -1, -3]} color="#064E3B" scale={0.8} />
          <DataNode position={[-2, -2, 1]} color="#10B981" scale={0.5} />
          
          {/* Abstract flow lines or nature elements */}
          <FloatingLeaf position={[2, 2, -1]} rotation={[0.5, 0.5, 0]} />
          <FloatingLeaf position={[-2, -1, 0]} rotation={[-0.5, -0.2, 0]} />
        </Float>

        <Environment preset="park" />
        {/* Subtle background particles */}
        <Stars radius={100} depth={50} count={400} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const DataCenterScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [4, 3, 5], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} color="#10B981" />
        <pointLight position={[-5, 2, -5]} intensity={0.5} color="#ffffff" />
        <Environment preset="city" />
        
        <group rotation={[0, -Math.PI / 4, 0]} position={[0, -1, 0]}>
            {/* Server Rack 1 */}
            <Box args={[1, 2.5, 1]} position={[0, 1.25, 0]}>
                <meshStandardMaterial color="#1C1917" roughness={0.2} metalness={0.8} />
            </Box>
            {/* Server Lights */}
            {[...Array(5)].map((_, i) => (
                <Box key={i} args={[0.8, 0.05, 0.05]} position={[0, 0.5 + (i * 0.4), 0.51]}>
                    <meshStandardMaterial color="#34D399" emissive="#059669" emissiveIntensity={2} />
                </Box>
            ))}

            {/* Server Rack 2 */}
            <Box args={[1, 2.5, 1]} position={[-1.5, 1.25, -0.5]}>
                <meshStandardMaterial color="#292524" roughness={0.2} metalness={0.8} />
            </Box>
             {[...Array(5)].map((_, i) => (
                <Box key={i} args={[0.8, 0.05, 0.05]} position={[-1.5, 0.5 + (i * 0.4), -0.01]}>
                    <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={1} />
                </Box>
            ))}

            {/* Nature Integration - Trees/Plants inside data center */}
            <Cylinder args={[0.1, 0.1, 1]} position={[1.5, 0.5, 0.5]}>
                <meshStandardMaterial color="#78350F" />
            </Cylinder>
            <Sphere args={[0.5]} position={[1.5, 1.2, 0.5]}>
                <MeshDistortMaterial color="#10B981" distort={0.3} speed={1} />
            </Sphere>

            {/* Floor */}
            <Box args={[10, 0.1, 10]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#e5e7eb" roughness={0.1} />
            </Box>
        </group>
      </Canvas>
    </div>
  );
}

export const StoryScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [3, 3, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={1} color="#10B981" />
        <pointLight position={[-5, 2, -5]} intensity={0.5} color="#ffffff" />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0.5, -0.5, 0]}>
                {/* Book Cover - Spine */}
                <Box args={[0.5, 4, 0.2]} position={[-1.6, 0, 0]}>
                    <meshStandardMaterial color="#064E3B" />
                </Box>
                {/* Front Cover */}
                <Box args={[3, 4, 0.1]} position={[0, 0, 0.15]}>
                    <meshStandardMaterial color="#059669" roughness={0.3} />
                </Box>
                {/* Back Cover */}
                <Box args={[3, 4, 0.1]} position={[0, 0, -0.15]}>
                    <meshStandardMaterial color="#064E3B" roughness={0.3} />
                </Box>
                {/* Pages */}
                <Box args={[2.9, 3.9, 0.2]} position={[0.05, 0, 0]}>
                    <meshStandardMaterial color="#F5F5F4" />
                </Box>
                
                {/* Title placeholder on cover */}
                <Box args={[2, 0.2, 0.02]} position={[0, 1, 0.21]}>
                     <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </Box>
                <Box args={[1.5, 0.1, 0.02]} position={[0, 0.5, 0.21]}>
                     <meshStandardMaterial color="#a7f3d0" />
                </Box>
            </group>
        </Float>
        
        {/* Floating elements representing characters/narrative elements */}
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
             <Icosahedron args={[0.3, 0]} position={[2, 1, 1]}>
                <meshStandardMaterial color="#D97706" wireframe />
             </Icosahedron>
             <Icosahedron args={[0.2, 0]} position={[-2, -1, 2]}>
                <meshStandardMaterial color="#10B981" wireframe />
             </Icosahedron>
        </Float>
      </Canvas>
    </div>
  );
}
