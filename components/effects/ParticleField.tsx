"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function Particles() {
  const mesh = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const count = 2000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Cyan and gold color palette
      const colorChoice = Math.random()
      if (colorChoice > 0.7) {
        // Gold
        colors[i3] = 0.83
        colors[i3 + 1] = 0.69
        colors[i3 + 2] = 0.22
      } else if (colorChoice > 0.3) {
        // Cyan
        colors[i3] = 0.0
        colors[i3 + 1] = 0.83
        colors[i3 + 2] = 1.0
      } else {
        // White/blue tint
        colors[i3] = 0.4
        colors[i3 + 1] = 0.6
        colors[i3 + 2] = 0.8
      }
    }

    return [positions, colors]
  }, [])

  const sizes = useMemo(() => {
    const arr = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.05 + 0.02
    }
    return arr
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!mesh.current) return

    const time = state.clock.getElapsedTime()
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = posArray[i3]
      const y = posArray[i3 + 1]
      const z = posArray[i3 + 2]

      // Gentle floating motion
      posArray[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002

      // Mouse repulsion
      const dx = x - mouseRef.current.x * 8
      const dy = y - mouseRef.current.y * 8
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3) {
        const force = (3 - dist) * 0.01
        posArray[i3] += dx * force
        posArray[i3 + 1] += dy * force
      }

      // Boundary wrap
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10
      if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = time * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.05
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Large cyan orb */}
      <mesh position={[3, 2, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
        />
      </mesh>
      {/* Gold orb */}
      <mesh position={[-4, -2, -3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Small cyan orb */}
      <mesh position={[0, 4, -7]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 8)
  }, [camera])

  return null
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <CameraController />
        <ambientLight intensity={0.5} />
        <Particles />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
