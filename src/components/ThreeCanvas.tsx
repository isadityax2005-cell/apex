'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { scrollState } from '@/lib/store';
import HouseModel from './HouseModel';

// ============ ASTEROIDS ============
function AsteroidField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Create 2000 tiny asteroids
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 2000; i++) {
      // Random positions spread far and wide
      dummy.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 600
      );
      // Random rotations
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      // Very small scales
      const scale = 0.02 + Math.random() * 0.08;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Very slow rotation of the entire asteroid field
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 2000]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#887766" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
}


function TexturedPlanets() {
  const [
    sunTex, earthDay, earthNight, earthClouds, moonTex,
    mercuryTex, venusTex, marsTex, jupiterTex, saturnTex, saturnRingTex, uranusTex, neptuneTex
  ] = useTexture([
    '/textures/2k_sun.jpg',
    '/textures/2k_earth_daymap.jpg',
    '/textures/2k_earth_nightmap.jpg',
    '/textures/2k_earth_clouds.jpg',
    '/textures/2k_moon.jpg',
    '/textures/2k_mercury.jpg',
    '/textures/2k_venus_surface.jpg',
    '/textures/2k_mars.jpg',
    '/textures/2k_jupiter.jpg',
    '/textures/2k_saturn.jpg',
    '/textures/2k_saturn_ring_alpha.png',
    '/textures/2k_uranus.jpg',
    '/textures/2k_neptune.jpg',
  ]);

  // Fix texture wrapping for all textures
  useMemo(() => {
    [sunTex, earthDay, earthNight, earthClouds, moonTex, mercuryTex, venusTex, marsTex, jupiterTex, saturnTex, uranusTex, neptuneTex].forEach(tex => {
      if (tex) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
      }
    });
    if (saturnRingTex) saturnRingTex.wrapS = THREE.RepeatWrapping;
  }, [sunTex, earthDay, earthNight, earthClouds, moonTex, mercuryTex, venusTex, marsTex, jupiterTex, saturnTex, saturnRingTex, uranusTex, neptuneTex]);

  const earthGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloud1Ref = useRef<THREE.Mesh>(null);
  const cloud2Ref = useRef<THREE.Mesh>(null);
  const cloud3Ref = useRef<THREE.Mesh>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);

  // GROUND TRUTH APPROACH:
  // Three.js sphere UV: longitude 0 maps to the BACK of the sphere (-Z). 
  // India is at roughly Lon 77°E. We need India facing +Z (camera).
  // Three.js sphere faces texture's left edge toward +Z.
  // To bring India to front: rotate earth on Y by -(77/180)*PI + adjustment
  // After testing: the offset needed is approximately -1.3 radians
  const INDIA_ROT_Y = -1.35; // This brings India (lon ~77E) to face the camera
  const MUMBAI_LAT_Y = Math.sin(19.0 * Math.PI / 180); // Y position for lat 19N on a unit sphere

  useFrame((state) => {
    const p = scrollState.progress;
    const t = state.clock.getElapsedTime();

    // Continuous cloud rotation
    if (cloud1Ref.current) cloud1Ref.current.rotation.y = t * 0.012;
    if (cloud2Ref.current) cloud2Ref.current.rotation.y = t * 0.009;
    if (cloud3Ref.current) cloud3Ref.current.rotation.y = t * 0.007;
    if (moonOrbitRef.current) moonOrbitRef.current.rotation.y = t * 0.08;

    let camX = 0, camY = 20, camZ = 280;
    let targetRotY = t * 0.04; // gentle idle spin
    let lookAtY = 0;
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (p < 0.35) {
      // Phase 1: Fly in from deep space past all planets
      const pp = p / 0.35;
      camZ = THREE.MathUtils.lerp(280, 4.5, pp);
      camY = THREE.MathUtils.lerp(20, 0, pp);
    } else if (p < 0.65) {
      // Phase 2: Rotate Earth to show India
      const pp = (p - 0.35) / 0.30;
      camZ = 4.5;
      camY = THREE.MathUtils.lerp(0, MUMBAI_LAT_Y * 4.5, pp); // Arc over the earth
      lookAtY = THREE.MathUtils.lerp(0, MUMBAI_LAT_Y * 0.6, pp);
      targetRotY = THREE.MathUtils.lerp(t * 0.04, INDIA_ROT_Y, THREE.MathUtils.smoothstep(pp, 0, 1));
      targetLookAt.set(0, lookAtY, 0);
    } else if (p < 0.90) {
      // Phase 3: Punch THROUGH clouds, arrive at Mumbai
      const pp = (p - 0.65) / 0.25;
      
      const targetRadius = 1.002;
      const targetY = MUMBAI_LAT_Y * targetRadius;
      const targetZ = Math.sqrt(targetRadius * targetRadius - targetY * targetY);
      
      camZ = THREE.MathUtils.lerp(4.5, targetZ, THREE.MathUtils.smoothstep(pp, 0, 1));
      camY = THREE.MathUtils.lerp(MUMBAI_LAT_Y * 4.5, targetY, THREE.MathUtils.smoothstep(pp, 0, 1));
      camX = THREE.MathUtils.lerp(0, 0.005, pp);
      
      lookAtY = THREE.MathUtils.lerp(MUMBAI_LAT_Y * 0.6, targetY * 0.95, pp);
      targetRotY = INDIA_ROT_Y;
      targetLookAt.set(0, lookAtY, 0);
    } else {
      // Phase 4: Cinematic cut to the 3D House Model at (0, 1000, 0)
      camX = Math.sin(t * 0.1) * 35;
      camZ = Math.cos(t * 0.1) * 35;
      camY = 1000 + 15 + Math.sin(t * 0.05) * 5;
      
      targetRotY = INDIA_ROT_Y;
      targetLookAt.set(0, 1000 + 4, 0);
    }

    state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.07);
    
    // Manage lookAt for smooth panning and sudden cuts
    if (!state.camera.userData.currentLookAt) {
      state.camera.userData.currentLookAt = new THREE.Vector3();
    }
    
    // Hard cut if crossing the 0.90 boundary to avoid wild swings through space
    if (p > 0.90 && p < 0.91) {
      state.camera.userData.currentLookAt.copy(targetLookAt);
      state.camera.position.set(camX, camY, camZ);
    } else {
      state.camera.userData.currentLookAt.lerp(targetLookAt, 0.1);
    }
    
    state.camera.lookAt(state.camera.userData.currentLookAt);

    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        earthGroupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }
  });

  return (
    <>
      <Stars radius={300} depth={120} count={15000} factor={4} saturation={0.1} fade speed={0.5} />
      
      {/* Cinematic house scene located far above the solar system to prevent overlap */}
      <group position={[0, 1000, 0]}>
        <HouseModel />
      </group>

      {/* ============ SUN ============ */}
      {/* ============ SUN ============ */}
      <group position={[0, 0, -200]}>
        <mesh>
          <sphereGeometry args={[22, 64, 64]} />
          {/* Brighter, hotter sun core */}
          <meshBasicMaterial map={sunTex} color={[4, 2.5, 1]} toneMapped={false} />
        </mesh>
        {/* Rays removed per user request */}
        <pointLight intensity={12} distance={1200} color="#ffe8c0" />
        <pointLight intensity={6} distance={1200} color="#ff6010" />
      </group>

      {/* ============ PLANETS along flight path ============ */}

      {/* Neptune - farthest */}
      <mesh position={[35, 8, 240]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial map={neptuneTex} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Uranus */}
      <mesh position={[-40, -5, 185]}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshStandardMaterial map={uranusTex} roughness={0.4} metalness={0.1} />
        {/* Uranus rings - Realistic thin icy bands */}
        <group rotation={[0, 0, Math.PI / 2]}>
          {[5.5, 5.8, 6.4, 6.7, 7.2].map((radius, i) => (
            <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.02, 8, 100]} />
              <meshBasicMaterial color="#aadddd" transparent opacity={0.15 + (i * 0.05)} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </mesh>

      {/* Saturn */}
      <group position={[55, -8, 120]} rotation={[0.3, 0.4, 0.15]}>
        <mesh>
          <sphereGeometry args={[7, 64, 64]} />
          <meshStandardMaterial map={saturnTex} roughness={0.6} />
        </mesh>
        {/* Saturn rings - Enhanced realism */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9, 16, 128]} />
          <meshStandardMaterial
            map={saturnRingTex}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
            emissive={new THREE.Color('#332211')} // Subtle self-illumination so rings don't look completely flat black in shadow
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* Jupiter */}
      <mesh position={[-50, 6, 60]}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial map={jupiterTex} roughness={0.45} />
      </mesh>

      {/* Mars */}
      <mesh position={[22, -2, 30]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={marsTex} roughness={0.8} />
      </mesh>

      {/* Venus */}
      <mesh position={[-28, 3, -35]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial map={venusTex} roughness={0.5} />
        {/* Venus atmosphere */}
        <mesh scale={1.08}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#c8a050" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </mesh>

      {/* Mercury */}
      <mesh position={[20, 1, -90]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial map={mercuryTex} roughness={0.85} />
      </mesh>

      {/* ============ EARTH SYSTEM ============ */}
      <group ref={earthGroupRef} position={[0, 0, 0]}>

        {/* Earth surface */}
        <mesh ref={earthMeshRef}>
          <sphereGeometry args={[1, 128, 128]} />
          <meshStandardMaterial
            map={earthDay}
            emissiveMap={earthNight}
            emissive={new THREE.Color('#ffccaa')}
            emissiveIntensity={1.8}
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Atmospheric glow layer (Rim light effect) */}
        <mesh scale={1.03}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial
            color={[0.2, 0.5, 1.5]}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>

        {/* ====== CLOUD LAYERS - HIGH OPACITY, DoubleSide for fly-through ====== */}
        {/* Layer 1 - lowest, densest */}
        <mesh ref={cloud1Ref} scale={1.012}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={earthClouds}
            transparent
            opacity={0.75}
            alphaTest={0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* Layer 2 - mid altitude, slightly offset */}
        <mesh ref={cloud2Ref} scale={1.025}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={earthClouds}
            transparent
            opacity={0.5}
            alphaTest={0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* Layer 3 - highest, thinnest */}
        <mesh ref={cloud3Ref} scale={1.04}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={earthClouds}
            transparent
            opacity={0.3}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* ====== MOON ====== */}
        <group ref={moonOrbitRef}>
          <mesh position={[3.2, 0.3, 0]}>
            <sphereGeometry args={[0.27, 32, 32]} />
            <meshStandardMaterial map={moonTex} roughness={0.95} />
          </mesh>
        </group>

        {/* ====== MAHARASHTRA / MUMBAI MARKER & LOCAL CLOUDS ====== */}
        {/* 
          The marker is placed exactly at lat 19N, front-facing.
          We also add horizontal cloud layers here that the camera will fly through.
        */}
        <group position={[0, MUMBAI_LAT_Y, Math.sqrt(1 - MUMBAI_LAT_Y * MUMBAI_LAT_Y) * 1.002]}>
          
          {/* LOCAL CLOUDS REMOVED - User requested to remove the white hazy center part */}

          {/* Pulsing core dot */}
          <mesh>
            <sphereGeometry args={[0.003, 16, 16]} />
            <meshBasicMaterial color={[4, 5, 8]} toneMapped={false} />
          </mesh>
          {/* Inner ring */}
          <mesh>
            <ringGeometry args={[0.006, 0.009, 64]} />
            <meshBasicMaterial color={[2, 3, 6]} transparent opacity={0.9} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
          {/* Outer ring */}
          <mesh>
            <ringGeometry args={[0.015, 0.017, 64]} />
            <meshBasicMaterial color={[1, 1.5, 3]} transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
          {/* Maharashtra region glow */}
          <mesh position={[0, 0, -0.002]}>
            <circleGeometry args={[0.04, 32]} />
            <meshBasicMaterial color={[0.1, 0.3, 1]} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>

      </group>
    </>
  );
}

export default function ThreeCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#000005] pointer-events-none">
      <Canvas
        camera={{ position: [0, 20, 280], fov: 42, near: 0.001, far: 2000 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={['#000005']} />
        
        {/* Massively improved scene lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 10, 50]} intensity={1.5} color="#dbeafe" />
        <directionalLight position={[0, 0, -200]} intensity={6.0} color="#ffedd5" />

        <Suspense fallback={null}>
          <TexturedPlanets />
          <AsteroidField />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={2.0} radius={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
