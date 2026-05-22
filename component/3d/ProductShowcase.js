import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Float, MeshReflectorMaterial, RoundedBox, Text, Decal } from '@react-three/drei';
import * as THREE from 'three';

function ProductMockup({ scrollYProgress, mouseX }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 1.2]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, -0.2, 0.1]);
  const posZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);

  useFrame((state) => {
    if (groupRef.current) {
      const mouseInfluence = mouseX ? mouseX.get() * 0.3 : 0;
      groupRef.current.rotation.y = rotateY.get() + mouseInfluence;
      groupRef.current.rotation.x = rotateX.get();
      groupRef.current.position.z = posZ.get();
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <RoundedBox args={[3.5, 2.2, 0.1]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#1C1917"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        <RoundedBox args={[3.3, 2, 0.05]} radius={0.03} smoothness={4} position={[0, 0, 0.08]}>
          <meshStandardMaterial
            color="#F5F3EF"
            metalness={0.1}
            roughness={0.9}
          />
        </RoundedBox>

        <group position={[0, 0.6, 0.1]}>
          <mesh>
            <planeGeometry args={[2.5, 0.08]} />
            <meshStandardMaterial color="#7D4E5B" />
          </mesh>
        </group>
        <group position={[0, 0.35, 0.1]}>
          <mesh>
            <planeGeometry args={[2, 0.03]} />
            <meshStandardMaterial color="#4A4540" />
          </mesh>
        </group>
        <group position={[0, 0.2, 0.1]}>
          <mesh>
            <planeGeometry args={[1.5, 0.03]} />
            <meshStandardMaterial color="#4A4540" />
          </mesh>
        </group>
        <group position={[0, -0.1, 0.1]}>
          <mesh>
            <planeGeometry args={[2.2, 0.6]} />
            <meshStandardMaterial color="#EBE8E1" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scene({ scrollYProgress, mouseX }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffeedd" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#7D4E5B" />
      <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.5} penumbra={1} />
      <ProductMockup scrollYProgress={scrollYProgress} mouseX={mouseX} />
    </>
  );
}

export default function ProductShowcase({ className = '' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const mouseX = useRef(new MotionValue(0));

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    mouseX.current.set((e.clientX / window.innerWidth) * 2 - 1);
  };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollYProgress={scrollYProgress} mouseX={mouseX.current} />
      </Canvas>
    </motion.div>
  );
}