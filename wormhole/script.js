import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const width = window.innerWidth;
const height = window.innerHeight;
 
// ****************** Basic Setup *******************************

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/height, 0.1, 1000)
camera.position.z = 5

// Create renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio)

// Insert in the dom
document.body.appendChild(renderer.domElement)

// Add controls
const controls = OrbitControls(camera, renderer.domElement)

