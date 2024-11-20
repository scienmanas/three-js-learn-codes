import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import getStarfield from './src/getStarfield';
import { getFresnelMat } from './src/getFresnelMat';

console.log("Three JS started..")

window.THREE = THREE;

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio)
// Add the canvas to the dom element
document.body.appendChild(renderer.domElement);
// Create a orbit control
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 100;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1.5, 12);
const material = new THREE.MeshPhongMaterial({
    map: loader.load('./earth.jpg'),
    specular: loader.load('./specular.jpg'),
    bumpMap: loader.load('./bump.jpg'),
    bumpScale: 0.04
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load('./lights.jpg'),
    blending: THREE.AdditiveBlending,
    opacity: 0.6
})
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh)

const cloudsMat = new THREE.MeshStandardMaterial({
    opacity: 0.6,
    map: loader.load('./clouds.jpg'),
    blending: THREE.AdditiveBlending
})
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
cloudsMesh.scale.setScalar(1.005)
earthGroup.add(cloudsMesh)

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.02);
earthGroup.add(glowMesh)

const stars = getStarfield({ numStars: 2500 });
scene.add(stars)

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

let clock = new THREE.Clock()
function animate() {
    requestAnimationFrame(animate);
    let elapsedTime = clock.getElapsedTime()
    earthMesh.rotation.y += 0.0002 * elapsedTime
    lightsMesh.rotation.y += 0.0002 * elapsedTime
    cloudsMesh.rotation.y += 0.0003 * elapsedTime
    renderer.render(scene, camera);
}

animate()
