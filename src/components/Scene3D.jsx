import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const GachaMachineReal = ({ isRolling, theme }) => {
    const groupRef = useRef();
    const ringRef = useRef();
    const insideRef = useRef();

    // Theme Colors
    const isDragon = theme === 'dragon';
    const mainColor = isDragon ? '#7f1d1d' : '#1e1b4b'; // Red vs Dark Blue
    const accentColor = isDragon ? '#fbbf24' : '#38bdf8'; // Gold vs Cyan
    const glowColor = isDragon ? '#ef4444' : '#818cf8'; // Red Neon vs Indigo Neon

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Floating Animation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;

        // Ring Rotation
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * (isRolling ? 5 : 0.5);
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
        }

        // Inside Shake
        if (insideRef.current && isRolling) {
            insideRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 20) * 0.2;
            insideRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 25) * 0.2;
        }
    });

    return (
        <group ref={groupRef} scale={1.2}>
            {/* --- NEON AURA RINGS --- */}
            <group ref={ringRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.2, 0.02, 16, 100]} />
                    <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={isRolling ? 5 : 2} toneMapped={false} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[2.0, 0.02, 16, 100]} />
                    <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={isRolling ? 5 : 1.5} toneMapped={false} />
                </mesh>
            </group>

            {/* --- LIQUID GLASS GLOBE --- */}
            <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[1.2, 64, 64]} />
                {/* Advanced Glass Material */}
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={0.1} // Rainbow edges
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    color="#ffffff"
                    background={new THREE.Color(mainColor)}
                />
            </mesh>

            {/* --- INTERNAL BALLS (Visible inside glass) --- */}
            <group position={[0, 1.0, 0]} ref={insideRef}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh key={i} position={[(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5]} scale={0.15}>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color={isDragon ? ['#fca5a5', '#fcd34d', '#f87171'][i % 3] : ['#93c5fd', '#c4b5fd', '#67e8f9'][i % 3]}
                            emissive={isDragon ? '#ef4444' : '#60a5fa'}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                ))}
            </group>

            {/* --- BASE --- */}
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[1.0, 1.2, 1.5, 32]} />
                <meshStandardMaterial color={mainColor} roughness={0.2} metalness={0.8} />
            </mesh>

            {/* --- GOLD/CHROME ACCENTS --- */}
            <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[1.22, 1.22, 0.1, 32]} />
                <meshStandardMaterial color={accentColor} metalness={1} roughness={0.1} />
            </mesh>

            {/* Dispenser Slot */}
            <mesh position={[0, -1.0, 0.9]} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[0.8, 0.5, 0.2]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
        </group>
    );
};

export default function Scene3D({ isRolling, theme }) {
    const isDragon = theme === 'dragon';

    return (
        <div className="relative w-full md:w-1/2 h-[45vh] md:h-auto md:min-h-[600px] bg-gradient-to-br from-slate-950 to-black rounded-t-3xl md:rounded-none md:rounded-r-3xl border-b md:border-b-0 md:border-l border-white/5 overflow-hidden">
            <Canvas camera={{ position: [0, 1, 6], fov: 35 }} gl={{ alpha: true }}>
                {/* Lighting Setup */}
                <ambientLight intensity={0.2} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow color={isDragon ? "#ffedd5" : "#e0f2fe"} />
                <pointLight position={[-5, 2, -5]} intensity={2} color={isDragon ? "#b91c1c" : "#1d4ed8"} />

                {/* Neon Backlight */}
                <pointLight position={[0, 0, -3]} intensity={5} color={isDragon ? "#ff0000" : "#00ffff"} distance={10} />

                {/* Environment for Reflections */}
                <Environment preset="city" />

                <GachaMachineReal isRolling={isRolling} theme={theme} />

                {/* Particles */}
                <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                <Sparkles
                    count={isRolling ? 100 : 30}
                    scale={6}
                    size={isRolling ? 5 : 2}
                    speed={isRolling ? 2 : 0.5}
                    opacity={0.6}
                    color={isDragon ? "#fbbf24" : "#a5b4fc"}
                />

                <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} minDistance={3} maxDistance={10} />
            </Canvas>
        </div>
    );
}