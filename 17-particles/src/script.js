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
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')
/**
 * Particles
 */
//Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
//Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true
})

particlesMaterial.color = new THREE.Color('pink')
particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
//ways to cope with alpha blocking one another, depthtest and depthwrite may introduce bugs
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.vertexColors = true

//blending
particlesMaterial.blending = THREE.AdditiveBlending
//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)

const buffGeometry = new THREE.BufferGeometry()
const count = 100000

const positions = new Float32Array(count*3)
const colors = new Float32Array(count*3)
for (let i = 0; i < count*3; i++){
    positions[i] = 10*(Math.random()-0.5)
    colors[i] = Math.random()
}
const positionsAttribute = new THREE.BufferAttribute(positions, 3)
const colorsAttribute = new THREE.BufferAttribute(colors, 3)
buffGeometry.setAttribute('position', positionsAttribute)
buffGeometry.setAttribute('color', colorsAttribute)
const particles2 = new THREE.Points(buffGeometry, particlesMaterial)
scene.add(particles2)

// const boxGeometry = new THREE.BoxGeometry(1,1,1);
// const boxMaterial = new THREE.MeshBasicMaterial();
// const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(mesh)

// const buffgeometry = new THREE.BufferGeometry()
// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// buffgeometry.setAttribute('position', positionsAttribute)
// const pp2 = new THREE.Points(buffgeometry, particlesMaterial)
// scene.add(pp2)



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
camera.position.z = 3
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
    // Update Particles
    for(let i = 0; i < count; i++){
        const i3 = i*3
        const x = buffGeometry.attributes.position.array[i3]
         buffGeometry.attributes.position.array[i3+1] = Math.sin(x + elapsedTime)
    }
    buffGeometry.attributes.position.needsUpdate = true //need to tell threejs to update this
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()