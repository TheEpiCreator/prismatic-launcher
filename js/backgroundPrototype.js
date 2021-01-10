// Import 3D lib
import * as THREE from "../node_modules/three/build/three.module.js"
import * as HTMLKit from "./lib/HTMLKit.js"
const SimplexNoise = require('simplex-noise')

// setup scene
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
camera.position.y = -4
camera.rotation.x = 0.2
// setup render pipeline
var renderer = new THREE.WebGLRenderer({ antialias: true })
// setup canvas
// Create HTMLTag instance
var rendererElement = new HTMLKit.Tag("p")
rendererElement.reference(renderer.domElement)
rendererElement.parent = document.body
rendererElement.toPosition("first")
rendererElement.tag.classList.add("bg")


const resize = () => {
    const width = window.innerWidth - 10
    const height = window.innerHeight - 10
    renderer.setSize(width, height)
    camera.fov = 30
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}
resize()

// setup lighting
var light = new THREE.AmbientLight(0x404040, 0.2)
scene.add(light)

var dirLight = new THREE.DirectionalLight(0xffffff, .1)
dirLight.position.set(0, 0, 1)
scene.add(dirLight)

// setup object to animate
var geometry = new THREE.PlaneGeometry(10, 10, 100, 100)

var material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: THREE.FaceColors, side: THREE.DoubleSide, shininess: 100 })

var BgObj = new THREE.Mesh(geometry, material)
scene.add(BgObj)

// Animate mesh
const clock = new THREE.Clock()

for (var i = 0; i < geometry.faces.length; i++) {
    var f = geometry.faces[i]
    let e = Math.random() - .5
    f.color.setRGB(e, e, e); // CHANGED

}

var simplex = new SimplexNoise(Math.random)

function animate() {

    const t = clock.getElapsedTime()

    BgObj.geometry.vertices.map(v => {
        v.z = (simplex.noise2D(v.x * 3 + t * .25, v.y * 3 + t * .25) / 5)
    })

    geometry.colorsNeedUpdate = false
    BgObj.geometry.verticesNeedUpdate = true

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

// Dynamically resize canvas
window.addEventListener("resize", resize)