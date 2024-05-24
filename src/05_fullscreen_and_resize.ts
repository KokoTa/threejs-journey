/*
 * @Author: KokoTa
 * @Date: 2024-05-15 10:08:40
 * @LastEditTime: 2024-05-24 17:50:43
 * @LastEditors: KokoTa
 * @Description:
 */
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import './05_fullscreen_and_resize.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()
const size = { width: window.innerWidth, height: window.innerHeight }

window.addEventListener('resize', () => {
  // update size
  size.width = window.innerWidth
  size.height = window.innerHeight
  // update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  // update renderer
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  // safari 需要加 webkit 前缀
  // @ts-ignore
  const isFull = document.fullscreenElement || document.webkitFullscreenElement
  if (!isFull) {
    if (canvas.requestFullscreen) canvas.requestFullscreen()
    // @ts-ignore
    else canvas.webkitRequestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
    // @ts-ignore
    else document.webkitExitFullscreen()
  }
})

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
// 知识科普：
// 1 px 渲染的实际物理像素得看物理像素比
// 比如正常显示器的像素比是 1，苹果显示器是 2
// 也就是说 1px 在正常显示器下渲染 1 物理像素，在苹果显示器下渲染 2x2=4 物理像素
// 这也就导致 1px 的斜线在低像素比会有锯齿，在高像素比会有模糊(可以通过mac屏幕+外接屏幕做测试)
// 具体理论可以看视频 17 分钟处
// https://www.bilibili.com/video/BV1Ki4y1a72S/?p=7&vd_source=48d13dac2ad376daa40427dba427cfb1
// 渲染的像素比默认为 1，设置好对应的像素比后，高像素比会更加清晰而不是模糊
// 设置的像素比太高也不行，会影响性能，2 就够用了
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Control
const control = new OrbitControls(camera, canvas)

const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()

