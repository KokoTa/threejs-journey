/*
 * @Author: KokoTa
 * @Date: 2024-05-28 17:31:20
 * @LastEditTime: 2024-05-29 14:29:14
 * @LastEditors: KokoTa
 * @Description:
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

/**
 * 纹理类型说明
 */
// Color Texture (颜色纹理):
// 假设你有一个木制门的3D模型，颜色纹理将包含木纹的图案和门的棕色调。
// 在Three.js中，将颜色纹理应用于材质，使得整个门模型表面显示为木质外观。
// Alpha Texture (透明度纹理):
// 如果门上有彩色玻璃窗格，透明度纹理将用于这些区域。
// 纹理中的黑色区域将完全透明，白色区域完全不透明，灰色区域将显示不同程度的透明度，模拟彩色玻璃的效果。
// Height Texture (高度纹理):
// 高度纹理通常与法线贴图配合使用，用于模拟细小的表面细节，如木纹的凹凸不平。
// 即使3D模型的几何形状没有实际变化，高度纹理也能通过改变表面法线的方向，让门看起来有更真实的木纹凹凸感。
// Normal Texture (法线纹理):
// 法线纹理包含方向信息，告诉渲染器每个表面点的法线方向。
// 对于门模型，法线纹理可以用于强调木纹的细节，使得光线照射在门上时产生更加真实的阴影和高光效果。
// Ambient Occlusion Texture (环境光遮蔽纹理):
// 环境光遮蔽是一种技术，用于模拟光线在角落和缝隙中的减弱。
// 对于门模型，环境光遮蔽纹理可以在门的边缘和接缝处添加暗部，使得这些区域看起来更加自然和真实。
// Metalness Texture (金属度纹理):
// 如果门上有金属把手或装饰，金属度纹理将用于这些区域。
// 纹理中的白色区域将模拟金属的反射特性，黑色区域则模拟非金属部分，使得金属部件看起来更有光泽。
// Roughness Texture (粗糙度纹理):
// 粗糙度纹理控制表面的光泽度。
// 对于门模型，粗糙度纹理可以使得

// loadingManager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('start')
}
loadingManager.onProgress = () => {
  console.log('progress')
}
loadingManager.onLoad = () => {
  console.log('load')
}
loadingManager.onError = () => {
  console.log('error')
}

// Texture
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexure = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// 默认是重复最后一个像素，需要做纹理的平铺设置
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// colorTexture.wrapS = THREE.RepeatWrapping // THREE.MirroredRepeatWrapping 镜像重复
// colorTexture.wrapT = THREE.RepeatWrapping

// 纹理偏移
// colorTexture.offset.x = 0.5

// 纹理旋转，但是旋转的点默认在左下角，需要进行设置居中
colorTexture.rotation = Math.PI / 4 // 逆时针 45 度
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5

// 纹理缩小滤镜：简单来说就是缩小后会进行像素还是模糊的处理
// 默认是模糊效果，使用 NearestFilter 则是像素效果
// 举个实际例子，玩 cs 的时候不是可以设置渲染模式吗？
// OpenGL 下是模糊，硬件加速是像素，像素的情况下帧率会更高
// 可以用 checkerboard-1024x1024.png 做测试
colorTexture.minFilter = THREE.NearestFilter

// 纹理放大滤镜：简单来说就是放大后会进行像素还是模糊的处理
// 可以用 checkerboard-8x8.png 和 minecraft.png 做测试
colorTexture.magFilter = THREE.NearestFilter

// mipmaps：默认会根据当前纹理大小生成多种尺寸，然后根据缩放选择合适尺寸进行渲染
// 缩小滤镜 + 模糊模式 下用 mipmaps 是 OK 的，因为涉及到线性插值
// 缩小滤镜 + 像素模式 下就没必要了，因为每个像素在任何缩放级别下都保持不变，可以关掉提升性能
colorTexture.generateMipmaps = false

// Gamma校正：WebGL 默认使用线性空间进行颜色计算，而不是sRGB空间。
// 如果你的纹理是以sRGB格式存储的，它需要被Gamma校正以在WebGL中正确显示。
// 在Three.js中，可以通过设置纹理的encoding属性为THREE.sRGBEncoding来实现这一点。
colorTexture.colorSpace = THREE.SRGBColorSpace

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
  map: colorTexture
})
const mesh = new THREE.Mesh(box, material)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 1
camera.position.y = 1
camera.position.x = 1
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
