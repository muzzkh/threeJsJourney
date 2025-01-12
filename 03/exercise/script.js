import * as THREE from 'three'
// console.log(THREE);

//Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object/Geometry  (width, height, depth) of the cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
//Sizes
const sizes = {
    width: 800,
    height: 600
}
//the perspective camera (fov, aspect ratio)
//75 is a lot but good for now
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//Renderer using WebGLRenderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)