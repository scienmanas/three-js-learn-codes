import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const w = window.innerWidth;
const h = window.innerHeight;
const render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(w, h);
document.body.appendChild(render.domElement); // Its basically a canvas

const fov = 75;
const aspect = w / h;
const near = 0.1;  // The camera will not render anything closer than 0.1 units
const far = 10;  // The camera will not render anything further than 10 units

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; // Move the camera 2 units away from the center

const scene = new THREE.Scene();

// Define controller
const controler = new OrbitControls(camera, render.domElement);
controler.enableDamping = true;
controler.dampingFactor = 0.02;

// const geometry = new THREE.IcosahedronGeometry(1.0, 2);
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
// })
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// function animate(t = 0) {
//     console.log(t);
//     requestAnimationFrame(animate);
//     mesh.scale.setScalar(Math.cos(t * 0.001) + 1);
//     render.render(scene, camera);
// }
// animate();
// render.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry(1.0, 4);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,  // Add a nice dept sahding effect
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const wireframe = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
})
const wireframeMesh = new THREE.Mesh(geometry, wireframe);
wireframeMesh.scale.setScalar(1.1);
// scene.add(wireframeMesh);
mesh.add(wireframeMesh);

const hemiLight = new THREE.HemisphereLight(0x0ffff, 0xd75000, 1);
scene.add(hemiLight);

function animate(t = 0) {
    console.log(t);
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0005;
    render.render(scene, camera);
    controler.update();
}
animate();
