import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
/**
 * Debug
 */

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/4.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')
//optimization for color need to do this to make it look good
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Objects
 */

const gplane = new THREE.PlaneGeometry(1,1,  50, 50);
const gsphere = new THREE.SphereGeometry(.5,64, 64);
const gtorus = new THREE.TorusGeometry(.3,.2, 64, 128)
// const material = new THREE.MeshBasicMaterial({ map: gradientTexture })
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000)
// material.wireframe = true

//when changing alpha of matrial also define transparent
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

//MeshNormal Material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture

//Depth used for threejs and shadows etc.
// const material = new THREE.MeshDepthMaterial();

//Lambert First material requiring lights.
// const material = new THREE.MeshLambertMaterial();
// material.color = new THREE.Color(0xff0000)


//MeshPhong Material
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

//MeshStandardMaterial PBR similar result despite tech
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// // material.wireframe = true

// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);

//MeshMaterial PBR similar result despite tech
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.wireframe = true

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

// //Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// //SHeen used for fluffy type materials
// material.sheen = 1
// material.sheenRoughness = .25
// material.sheenColor.set(1,0,1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor')

//Iridenscence
// material.iridescence = 1
// material. iridescenceIOR = 1
// material.iridescenceThicknessRange = [100,800]
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').min(1).max(2.33).step(0.0001);
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(0.0001);
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(0.0001);


//Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5
gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').min(0).max(2.4).step(0.0001);
gui.add(material, 'thickness').min(1).max(10).step(0.0001);
/**
 * Lights
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// scene.add(pointLight)


const Plane = new THREE.Mesh(gplane, material)
const Sphere = new THREE.Mesh(gsphere, material)
const Torus = new THREE.Mesh(gtorus, material)

scene.add(Plane, Sphere, Torus)
Torus.position.setX(2)
Sphere.position.setX(-2)

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => 
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping

        scene.background = environmentMap
        scene.environment = environmentMap
    })

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Update objects
    Sphere.rotation.y = 0.1 * elapsedTime
    Plane.rotation.y = 0.1 * elapsedTime
    Torus.rotation.y = 0.1 * elapsedTime

    Sphere.rotation.x = -0.15 * elapsedTime
    Plane.rotation.x=  -0.15* elapsedTime
    Torus.rotation.x=  -0.15* elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()