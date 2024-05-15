/*
 * @Author: KokoTa
 * @Date: 2024-05-15 10:08:40
 * @LastEditTime: 2024-05-15 17:36:10
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

// position
mesh.position.x = 1
mesh.position.y = -1
mesh.position.z = 1
// mesh.position.set(0.8, -0.8, 0.5)

// normalize
// 将向量值归一化，即自动调整让向量值为 1
// mesh.position.normalize()

// scale
mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// rotation
// 设置的值是弧度，比如弧度 Math.PI 表示 180 度
// 旋转默认为逆时针，视角是视线对着坐标轴起点来看的
// 旋转顺序默认根据 XYZ 的顺序，可以通过 reorder 改变顺序
// mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI / 6
mesh.rotation.y = Math.PI / 6

// quoternion
// 解决旋转顺序的问题，但是难以理解

scene.add(mesh)

// Group
const group = new THREE.Group()
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'red' })
)
cube1.position.x = -2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'green' })
)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' })
)
cube3.position.x = 2
group.position.y = 1
group.add(cube1, cube2, cube3)
scene.add(group)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height
)
camera.position.z = 5
// lookAt 让相机对着某个位置或物体
// camera.lookAt(mesh.position)
scene.add(camera)

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

// console.log(mesh.position.length()); // 获取向量值，物体中心到场景中心的距离
// console.log(mesh.position.distanceTo(camera.position)); //  获取向量值，即物体中心到相机的距离
