"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LiquidMonolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow, heavy physical idle rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Smooth dampened mouse tilt response
    const targetMouseX = state.pointer.x * 0.35;
    const targetMouseY = state.pointer.y * 0.25;

    meshRef.current.rotation.x += (targetMouseY - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y += (targetMouseX - meshRef.current.rotation.y) * 0.04;

    // Outer ring movement
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -meshRef.current.rotation.x * 0.5;
      outerRingRef.current.rotation.y = -meshRef.current.rotation.y * 0.7;
      outerRingRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Optimized Toroidal Monolith (64x16 geometry = 80% vertex reduction) */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.15}>
        <torusKnotGeometry args={[1, 0.3, 64, 16, 2, 3]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.92}
          roughness={0.08}
          wireframe={false}
        />
      </mesh>

      {/* Orbital Hairline Ring */}
      <mesh ref={outerRingRef} position={[0, 0, 0]} scale={1.6}>
        <torusGeometry args={[1.3, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#F8FAFC"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}
