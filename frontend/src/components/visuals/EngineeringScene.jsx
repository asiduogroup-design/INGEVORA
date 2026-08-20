import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, Sphere } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import './EngineeringScene.css'

// Maps node index -> tagline word, so "Software • Engineering • Automation"
// rides along the three most spread-out connection points.
const NODE_LABELS = {
  0: 'Software',
  1: 'Engineering',
  2: 'Automation',
}

function Core() {
  const group = useRef()
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.22
  })

  const nodes = [
    [-1.5, 0.2, 0],
    [0, 1.1, -0.4],
    [1.45, 0.1, 0.2],
    [0.45, -1, -0.2],
    [-0.9, -0.8, 0.35],
  ]

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial color="#087fe5" wireframe emissive="#07345f" roughness={0.28} />
        </mesh>
      </Float>
      {nodes.map((point, index) => (
        <Sphere key={point.join('-')} args={[0.075, 16, 16]} position={point}>
          <meshStandardMaterial color={index % 2 ? '#16845b' : '#1597f5'} emissive="#06365f" />
          {NODE_LABELS[index] && (
            <Html center wrapperClass="scene-label-wrapper">
              <span className="scene-label" style={{ animationDelay: `${index * 0.25}s` }}>
                {NODE_LABELS[index]}
              </span>
            </Html>
          )}
        </Sphere>
      ))}
      <Line points={nodes} color="#1597f5" lineWidth={1.4} transparent opacity={0.8} />
      <Line points={[nodes[2], nodes[4], nodes[1]]} color="#16845b" lineWidth={1} transparent opacity={0.55} />
    </group>
  )
}

export function EngineeringScene() {
  return (
    <div className="scene-shell">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.2, 4.2], fov: 42 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 3, 4]} intensity={1.5} />
        <Suspense fallback={null}>
          <Core />
        </Suspense>
      </Canvas>
    </div>
  )
}
