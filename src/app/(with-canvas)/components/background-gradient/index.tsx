"use client"

import { Canvas } from "@react-three/fiber"
import { folder as levaFolder, useControls } from "leva"
import { useMemo, useRef } from "react"
import * as THREE from "three"

import BACKGROUND_GRADIENT_FRAGMENT from "./background-gradient.frag"
import BACKGROUND_GRADIENT_VERTEX from "./background-gradient.vert"

// Helper mesh component for the gradient background
function BackgroundGradientMesh({ uniforms: levaUniforms }: { uniforms: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create geometry once
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1, 1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0]),
        3
      )
    )
    geo.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]), 2)
    )
    geo.setIndex([0, 1, 2, 1, 3, 2])
    return geo
  }, [])

  // Memoize uniforms to avoid recreation
  const shaderUniforms = useMemo(
    () => ({
      uColor1: { value: new THREE.Color(levaUniforms.uColor1) },
      uColor2: { value: new THREE.Color(levaUniforms.uColor2) },
      uColor3: { value: new THREE.Color(levaUniforms.uColor3) },
      uColor4: { value: new THREE.Color(levaUniforms.uColor4) },
      uColorAccent: { value: new THREE.Color(levaUniforms.uColorAccent) },
      uLinesAmount: { value: levaUniforms.uLinesAmount },
      uMaskRadius: { value: levaUniforms.uMaskRadius },
      uMaskPositionX: { value: levaUniforms.uMaskPositionX },
      uMaskPositionY: { value: levaUniforms.uMaskPositionY },
      uColor1Size: { value: 0.16 },
      uColor2Size: { value: 0.62 },
      uColor3Size: { value: 0.68 },
      uColor4Size: { value: 1.0 },
      uMaskSmoothness: { value: 1.0 },
      uMaskInvert: { value: 0 },
      uLinesBlur: { value: 0.35 },
      uNoise: { value: 0.0435 },
      uOffsetX: { value: 0.34 },
      uOffsetY: { value: 0.0 },
      uPlaneRes: { value: [100, 100] },
      uMouse2D: { value: [0, 0] },
      uBackgroundScale: { value: 1.0 }
    }),
    [levaUniforms]
  )

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={BACKGROUND_GRADIENT_VERTEX}
        fragmentShader={BACKGROUND_GRADIENT_FRAGMENT}
        uniforms={shaderUniforms}
      />
    </mesh>
  )
}

export function BackgroundGradient() {
  const [uniforms] = useControls(() => ({
    "Background Gradient": levaFolder(
      {
        uColor1: "#601a80",
        uColor2: "#ff4d00",
        uColor3: "#000000",
        uColor4: "#ff4d00",
        uColorAccent: "#000000",
        uLinesAmount: { max: 55, min: 40, value: 50 },
        uMaskRadius: { max: 2, min: 0.2, value: 1.69 },
        uMaskPositionX: { min: -1, max: 1, value: 0.75 },
        uMaskPositionY: { min: -1, max: 1, value: -0.6 }
      },
      {
        collapsed: false
      }
    )
  }))

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <BackgroundGradientMesh uniforms={uniforms} />
    </Canvas>
  )
}
