import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')
bakedShadow.colorSpace = THREE.SRGBColorSpace
console.log(bakedShadow)



  


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, .7)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
directionalLight.position.set(2, 2, - 1)
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

// directionalLight.shadow.radius = 10

//spot light
const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3)
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

spotLight.position.set(0,2,2)
scene.add(spotLight)
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightCameraHelper.visible = false
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
scene.add(spotLightCameraHelper)
scene.add(spotLight.target)


console.log(directionalLight.shadow)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

console.log(directionalLight.shadow.camera)
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)


//PointLight
const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
pointLight.position.set(-1,1,0)
scene.add(pointLight)
const pointLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true;
// sphere.receiveShadow = true;


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.receiveShadow = true;

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)


const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5,1.5),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        alphaMap: simpleShadow
    })
)

sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = false;
renderer.shadowMap.tyre = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update the sphere
    sphere.position.set(Math.cos(elapsedTime)*1.5, Math.abs(Math.sin(elapsedTime*3)), Math.sin(elapsedTime)*1.5)
    sphereShadow.position.set(sphere.position.x, plane.position.y + 0.01, sphere.position.z)
    sphereShadow.material.opacity = (1 -sphere.position.y) * .3
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()