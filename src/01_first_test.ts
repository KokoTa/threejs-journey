/*
 * @Author: KokoTa
 * @Date: 2024-05-15 10:08:40
 * @LastEditTime: 2024-05-15 10:52:34
 * @LastEditors: KokoTa
 * @Description:
 */
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()
const size = { width: 800, height: 600 }

// Object
const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'gray', wireframe: true })
const mesh = new THREE.Mesh(box, material)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height
)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)