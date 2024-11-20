import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Make Lil gui instance
const gui = new GUI();

// THREE JS starts here
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Add studio lighting
// Create a directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);
// Create a ambient light to provide basic elev of illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
//Create a point light to simmulate a light bulb
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(0, 5, 0);
scene.add(pointLight)

// Light helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(directionalLightHelper)
scene.add(pointLightHelper)

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.enableZoom = true

// Text loader
const loader = new THREE.TextureLoader()

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5; // Door le jao camera ko



window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

// GUI controls
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.add(cube.position, 'x', -10, 10);
cubeFolder.add(cube.position, 'y', -10, 10);
cubeFolder.add(cube.position, 'z', -10, 10);
cubeFolder.close()

const materialFolder = gui.addFolder('Material');
materialFolder.addColor(material, 'color');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'roughness');
materialFolder.add(material, 'metalness');
materialFolder.close()

const lightFolder = gui.addFolder('Lights');
lightFolder.add(directionalLight.position, 'x', -10, 10);
lightFolder.add(directionalLight.position, 'y', -10, 10);
lightFolder.add(directionalLight.position, 'z', -10, 10);
lightFolder.add(directionalLight, 'intensity', 0, 10);
lightFolder.add(pointLight.position, 'x', -10, 10);
lightFolder.add(pointLight.position, 'y', -10, 10);
lightFolder.add(pointLight.position, 'z', -10, 10);
lightFolder.add(pointLight, 'intensity', 0, 10);
lightFolder.close()

const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 10);
ambientLightFolder.close();

const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight.position, 'x', -10, 10);
pointLightFolder.add(pointLight.position, 'y', -10, 10);
pointLightFolder.add(pointLight.position, 'z', -10, 10);
pointLightFolder.add(pointLight, 'intensity', 0, 10);
pointLightFolder.close();


function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate()