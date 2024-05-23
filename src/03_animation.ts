/*
 * @Author: KokoTa
 * @Date: 2024-05-15 10:08:40
 * @LastEditTime: 2024-05-23 16:59:48
 * @LastEditors: KokoTa
 * @Description:
 */
import * as THREE from 'three'
import gsap from 'gsap'

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

// Animation
// let time = Date.now()
const clock = new THREE.Clock()

const tick = () => {
  // Time
  // 1. 通过时间增量的方式确保动画在不同帧率下的一致性
  // const curTime = Date.now()
  // const deltaTime = curTime - time
  // time = curTime
  // 让物体按 x 轴旋转
  // mesh.rotation.x += 0.001 * deltaTime

  // 2. 通过 Clock 实现一致性
  // 让物体一秒钟旋转一圈，无论帧率是多少
  // mesh.rotation.x = Math.PI * 2 * clock.getElapsedTime()
  // 让物体转圈圈
  // mesh.position.y = Math.cos(clock.getElapsedTime())
  // mesh.position.x = Math.sin(clock.getElapsedTime())
  // 让镜头绕着转物体转
  // camera.position.x = Math.sin(clock.getElapsedTime())
  // camera.position.y = Math.cos(clock.getElapsedTime())
  // camera.lookAt(mesh.position)

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

// 除了在函数中实现动画，还可以借助 gsap 来实现
gsap.fromTo(mesh.position, {
  x: -1
}, {
  x: 1,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'linear'
})