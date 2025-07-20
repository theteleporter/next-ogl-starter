import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

// import { GLOBAL_GL } from "~/gl"
import { COLOR_FRAGMENT, COLOR_VERTEX } from "~/gl/programs/color-program"

/* Utility function to compare arrays */
const arrayEquals = (a: number[], b: number[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

/* Frustum Geometry */
const getFrustumBoxGeometry = (
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
) => {
  const { near, far } = camera
  let left, right, top, bottom

  if ("left" in camera) {
    // Orthographic camera
    left = camera.left
    right = camera.right
    top = camera.top
    bottom = camera.bottom
  } else {
    // Perspective camera
    const fov = (camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * near
    const width = height * camera.aspect
    left = -width / 2
    right = width / 2
    top = height / 2
    bottom = -height / 2
  }

  // Use the same frustum geometry logic as your original code
  const positions = [
    0,
    0,
    0,
    left,
    bottom,
    -near,
    left,
    bottom,
    -near,
    right,
    bottom,
    -near,
    right,
    bottom,
    -near,
    0,
    0,
    0,
    0,
    0,
    0,
    right,
    top,
    -near,
    right,
    top,
    -near,
    left,
    top,
    -near,
    left,
    top,
    -near,
    right,
    bottom,
    -near,
    right,
    bottom,
    -near,
    right,
    top,
    -near,
    right,
    top,
    -near,
    left,
    bottom,
    -near,
    left,
    bottom,
    -near,
    left,
    top,
    -near,
    left,
    top,
    -near,
    0,
    0,
    0,
    left,
    bottom,
    -near,
    left,
    bottom,
    -far,
    left,
    bottom,
    -far,
    right,
    bottom,
    -far,
    right,
    bottom,
    -far,
    right,
    bottom,
    -near,
    right,
    bottom,
    -near,
    left,
    bottom,
    -far,
    left,
    bottom,
    -far,
    left,
    top,
    -far,
    left,
    top,
    -far,
    left,
    top,
    -near,
    left,
    top,
    -near,
    left,
    bottom,
    -far,
    left,
    bottom,
    -far,
    right,
    top,
    -far,
    right,
    top,
    -far,
    left,
    top,
    -far,
    left,
    top,
    -far,
    right,
    bottom,
    -far,
    right,
    bottom,
    -far,
    right,
    top,
    -far,
    right,
    top,
    -far,
    right,
    bottom,
    -near,
    right,
    bottom,
    -near,
    right,
    top,
    -near,
    right,
    top,
    -near,
    right,
    top,
    -far,
    right,
    top,
    -far,
    left,
    top,
    -near
  ]

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  )
  return geometry
}

export interface CameraHelperProps {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
}

export const CameraHelper = ({ camera }: CameraHelperProps) => {
  const rootRef = useRef<THREE.Group>(null)
  const geoRef = useRef<THREE.Mesh>(null)

  const refs = useRef({
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    near: 0,
    far: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  useFrame(() => {
    // avoid creating the geometry if the camera has not changed
    if (
      camera.position.distanceTo(refs.current.position) > 0 ||
      !arrayEquals(
        [camera.rotation.x, camera.rotation.y, camera.rotation.z],
        [
          refs.current.rotation.x,
          refs.current.rotation.y,
          refs.current.rotation.z
        ]
      ) ||
      camera.near !== refs.current.near ||
      camera.far !== refs.current.far ||
      ("top" in camera && camera.top !== refs.current.top) ||
      ("bottom" in camera && camera.bottom !== refs.current.bottom) ||
      ("left" in camera && camera.left !== refs.current.left) ||
      ("right" in camera && camera.right !== refs.current.right)
    ) {
      refs.current.position.copy(camera.position)
      refs.current.rotation.copy(camera.rotation)
      refs.current.near = camera.near
      refs.current.far = camera.far
      if ("top" in camera) refs.current.top = camera.top
      if ("bottom" in camera) refs.current.bottom = camera.bottom
      if ("left" in camera) refs.current.left = camera.left
      if ("right" in camera) refs.current.right = camera.right

      // Update mesh geometry and transform
      if (geoRef.current) {
        geoRef.current.geometry.dispose()
        geoRef.current.geometry = getFrustumBoxGeometry(camera)
      }
      if (rootRef.current) {
        rootRef.current.position.copy(camera.position)
        rootRef.current.rotation.copy(camera.rotation)
      }
    }
  })

  const frustumGeo = useMemo(() => getFrustumBoxGeometry(camera), [camera])

  return (
    <group ref={rootRef}>
      <mesh ref={geoRef} geometry={frustumGeo}>
        <shaderMaterial
          vertexShader={COLOR_VERTEX}
          fragmentShader={COLOR_FRAGMENT}
          uniforms={{
            uColor: { value: new THREE.Color(0xff0000) }
          }}
          wireframe
        />
      </mesh>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}
