import * as THREE from "../node_modules/three/build/three.module.js";
import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight( 0x404040 , 0.2);
scene.add(light);

var dirLight = new THREE.DirectionalLight( 0xf0f0f0, .1 );
dirLight.position.set(0, 0, 1);
scene.add(dirLight);

var geometry = new THREE.PlaneGeometry(10,10, 100, 100);

var material = new THREE.MeshPhongMaterial({color: 0xFFFFFFF, vertexColors: THREE.FaceColors, side: THREE.DoubleSide, shininess: 100});

var flag = new THREE.Mesh(geometry, material);
scene.add(flag);

camera.position.z = 5;

const clock = new THREE.Clock();

for (var i = 0; i < geometry.faces.length; i++) {
    var f = geometry.faces[i];
    let e = Math.random() - .5;
    f.color.setRGB(e, e, e); // CHANGED

}

var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);


function animate(){

    const t = clock.getElapsedTime();

    

    flag.geometry.vertices.map(v => {
        const waveX1 = 0.5 * Math.sin(v.x * 2 + t);
        const waveX2 = 0.25 * Math.sin(v.x * 3 + t);
        const waveY1 = 0.1 * Math.sin(v.y + t);
        const multi = (v.x + 2.5) / 5;

        //v.z = (waveX1 + waveX2 + waveY1) * multi;
        v.z = (simplex.noise2D(v.x * 4 + t * .25 , v.y * 4 + t * .25) / 5);
    });

    geometry.colorsNeedUpdate = true
    flag.geometry.verticesNeedUpdate = true;

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
