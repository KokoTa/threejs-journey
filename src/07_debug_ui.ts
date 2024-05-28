import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// GUI debug
const gui = new GUI({
  width: 300,
  title: 'GUI 测试',
  closeFolders: true
})
// 全部闭合
// gui.close()

// 显示/隐藏设置
window.addEventListener('keydown', (e) => {
  if (e.key === 'h') {
    gui.show(gui._hidden)
  }
})

const debugObj = {
  color: '#ee2b2b',
  spin: () => {},
  subdivision: 1
}

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Geometry
const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: debugObj.color,
  wireframe: true
})
const mesh = new THREE.Mesh(box, material)
scene.add(mesh)

// GUI-Range
// gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01)

// GUI-Checkbox
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// GUI-Color
// GUI 选择器和物料的颜色关联，会导致选择器的颜色和实际渲染颜色不一致，这可能和 Threejs 的渲染器有关系
// 如果想得到实际渲染颜色，则需要进行 Hex 转换
// gui.addColor(material, 'color')
//   .onChange((value) => {
//     console.log(value.getHexString());
//   })
// 如果想让二者保持一致，可以使用颜色外置的方式
// 这样颜色就和渲染器没关系了，可以得到正确的值
gui.addColor(debugObj, 'color').onChange(() => {
  material.color.set(debugObj.color)
})

// GUI-Button
debugObj.spin = () => {
  gsap.to(mesh.rotation, {
    duration: 3,
    y: mesh.rotation.y + 2 * Math.PI
  })
}
gui.add(debugObj, 'spin')

// GUI-Folder
const folder = gui.addFolder('Other')
// 无法动态设置物体的 widthSegments/heightSegments 等属性，它们只有在物体初始化的时候才能被设置
// 使用外置的方法去设置 subdivision，然后重新生成物体
debugObj.subdivision = 1
// onFinishChange 减少触发次数，提升性能
folder.add(debugObj, 'subdivision', 1, 10, 1).onFinishChange((v) => {
  mesh.geometry.dispose() // 释放内存
  mesh.geometry = new THREE.BoxGeometry(1, 1, 1, v, v, v)
})

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
camera.position.y = 2
camera.position.x = 2
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
