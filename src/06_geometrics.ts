/*
 * @Author: KokoTa
 * @Date: 2024-05-25 12:57:13
 * @LastEditTime: 2024-05-25 15:16:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: \threejs-journey\src\06_geometrics.ts
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()
const size = { width: 800, height: 600 }

// Object
/**
 * Treejs 默认提供了多种几何类型
 * http://www.yanhuangxueyuan.com/threejs/docs/index.html?q=Geome#api/zh/geometries/BoxGeometry
 */
// const box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2) // 后三个参数就是切分度，切分度越高，三角细节越多

/**
 * 如果想自己创建几何，需要提供顶点信息
 */
// const positions = new Float32Array([
//   0,
//   0,
//   0,
//   0,
//   1,
//   0,
//   1,
//   0,
//   0
// ])
// 3 表示 3 个为一组，即每组表示了顶点的 xyz 信息
// const positionAttr = new THREE.BufferAttribute(positions, 3)
// const geometry = new THREE.BufferGeometry()
// 这里 position 是着色器对应的属性，不能随便命名
// geometry.setAttribute('position', positionAttr)

/**
 * 设置五十个三角形
 */
const count = 50
// 每个三角形有 3 个顶点，每个顶点有 3 个坐标值
const positions = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 3
}
const positionAttr = new THREE.BufferAttribute(positions, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttr)

const material = new THREE.MeshBasicMaterial({ color: 'gray', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)

// Control
const control = new OrbitControls(camera, canvas)

const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
