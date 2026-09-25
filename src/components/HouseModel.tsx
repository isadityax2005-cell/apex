import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HouseModel() {
  const group = useRef<THREE.Group>(null);

  // A stylized modern architectural villa built with primitives
  return (
    <group ref={group} position={[0, -2, 0]}>
      {/* Ground Floor Base / Foundation */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[40, 1, 30]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Infinity Pool */}
      <mesh position={[0, -0.4, 8]} receiveShadow>
        <boxGeometry args={[20, 1.01, 10]} />
        <meshStandardMaterial color="#001133" />
      </mesh>
      {/* Water surface */}
      <mesh position={[0, 0.11, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshPhysicalMaterial 
          color="#0066ff" 
          transparent 
          opacity={0.8}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9} // Glass-like water
          ior={1.33}
        />
      </mesh>

      {/* Main Living Area (Glass walls) */}
      <mesh position={[0, 2, -4]}>
        <boxGeometry args={[16, 4, 12]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={1} 
          opacity={1} 
          metalness={0} 
          roughness={0.05} 
          ior={1.5} 
          thickness={0.5} 
        />
      </mesh>

      {/* Core Pillar (Solid concrete holding the roof) */}
      <mesh position={[-6, 2, -4]} castShadow>
        <boxGeometry args={[4, 4, 12]} />
        <meshStandardMaterial color="#222222" roughness={0.8} />
      </mesh>

      {/* Second Floor Cantilever (Overhanging) */}
      <mesh position={[2, 5, -2]} castShadow receiveShadow>
        <boxGeometry args={[22, 2, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Second Floor Glass Bedroom */}
      <mesh position={[4, 7, -2]}>
        <boxGeometry args={[14, 3, 10]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          opacity={1} 
          roughness={0.1} 
          ior={1.5} 
        />
      </mesh>

      {/* Roof */}
      <mesh position={[4, 8.75, -2]} castShadow>
        <boxGeometry args={[16, 0.5, 12]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Interior Lighting (Warm glow inside the house) */}
      <pointLight position={[2, 2, -4]} intensity={5} color="#ffaa55" distance={20} />
      <pointLight position={[4, 7, -2]} intensity={3} color="#ffcc88" distance={15} />

      {/* Exterior Ambient Fill */}
      <rectAreaLight 
        width={30} 
        height={30} 
        color="#aaddff" 
        intensity={2} 
        position={[0, 10, 20]} 
        lookAt={[0, 0, 0]} 
      />
    </group>
  );
}
