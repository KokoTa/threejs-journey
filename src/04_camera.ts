/*
 * @Author: KokoTa
 * @Date: 2024-05-15 10:08:40
 * @LastEditTime: 2024-05-24 14:27:03
 * @LastEditors: KokoTa
 * @Description:
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()
const size = { width: 800, height: 600 }

// Object
const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'gray', wireframe: true })
const mesh = new THREE.Mesh(box, material)
// mesh.position.y = -2
scene.add(mesh)

// Camera
// 透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 景深(推荐 45/75)
  size.width / size.height, // 画幅比例
  1, // 可视最小距离，值不能太小，否则会出现图层错误
  1000 // 可视最大距离，即相机距离超出 1000 的地方的物体就看不到了
)

// 正交相机
// 可以理解为镜头可视中心距离上下左右距离
// 不过这些值需要根据画幅比例来调整
// 否则会出现画面比例不协调的情况
// 这种效果类似打游戏分辨率的改变
// const aspectRatio = size.width / size.height
// const left = -1 * aspectRatio
// const right = 1 * aspectRatio
// const top = 1
// const bottom = -1
// const camera = new THREE.OrthographicCamera(
//   left, // 左
//   right, // 右
//   top, // 上
//   bottom, // 下
//   1, // 可视最小距离，值不能太小，否则会出现图层错误
//   1000 // 可视最大距离，即相机距离超出 1000 的地方的物体就看不到了
// )

camera.position.z = 3
// camera.lookAt(mesh.position)

// Cursor
// 监听到的是像素，大屏幕和小屏幕明显数值范围会有区别，这里我们要做统一
// 这里取值范围设为 -0.5 ~ 0.5
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5
  cursor.y = -(e.clientY / size.height - 0.5) // y轴向上是正的，但是 cursor 取值是负的，这里取反矫正
  // console.log(cursor.x, cursor.y);
})


scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)

// Control
const control = new OrbitControls(
  camera, // 相机
  canvas // 监听操作的元素
)
// 设置阻尼，但同时要设置每一帧都刷新 control，否则不会生效
// 也就是说操作结束后 control 还有动作，需要继续刷新
control.enableDamping = true
// 更新位置后需要刷新一下
// control.target.y = 1
// control.update()


const tick = () => {
  // 更新相机位置
  // camera.position.x = cursor.x
  // camera.position.y = cursor.y

  // 上面的坐标只是更新相机的 xy 值，无法完成对物体的环绕观察
  // 环绕需要用到数学知识处理，即 “一个轴使用 sin 另一个轴使用 cos，可以实现圆的路径”
  // 想要实现水平旋转，我们参考轴就为 xz
  // sin/cos 中的值是度数，乘的值是圆的半径
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // y 轴正常上下移动即可
  // camera.position.y = cursor.y * 3
  // 看向中心
  // camera.lookAt(new THREE.Vector3())

  // 自己控制相机相对繁琐，库内置了多种相机控制器供我们选择
  // 这里我们使用轨道相机，代码见上面 Control
  control.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
