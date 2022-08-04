<<<<<<< HEAD
import { Scene } from 'three/src/scenes/scene';
import { BoxBufferGeometry } from "three/src/geometries/BoxBufferGeometry.js"
import { Group } from "three/src/objects/Group.js"
import { Mesh } from "three/src/objects/Mesh.js"
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
import { Color } from "three/src/math/Color.js"
import { Vector3 } from "three/src/math/Vector3.js"
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera.js"
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Clock } from 'three/src/core/Clock.js';
import { OrbitControls } from '../../static/draco/OrbitControls.js'

const sRGBEncoding = 3001;
const ReinhardToneMapping = 2;

=======
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
>>>>>>> parent of 84d9f4d (Еще одна оптимизация)
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const canvas = document.querySelector('canvas.cubes')

// Scene
const scene = new Scene()
const sceneScale = 1;

/**
 * Models
 */
// Setup a geometry
	const geometry = new BoxBufferGeometry(1, 1, 1);

	// Setup a material
	const colorCount = 5;
	const palette = random.shuffle(random.pick(palettes))
	.slice(0, colorCount);

	// Setup a mesh with geometry + material

	const meshes = new Group();

	const fragmentShader = `
		varying vec2 vUv;
		uniform vec3 color;

		void main () {
			gl_FragColor = vec4(vec3(color * vUv.x), 1.0);
		}
	`;

	const vertexShader = `
		varying vec2 vUv;

		void main () {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
		}
	`;

	for (let i = 0; i < 20; i++) {
	const mesh = new Mesh(
		geometry,
		new ShaderMaterial({
			fragmentShader,
			vertexShader,
			uniforms: {
				color: { value: new Color(random.pick(palette)) }
			},
		// color: random.pick(palette),
		// roughness: 0,
		})
	);

	// mesh.castShadow = true;
	// mesh.receiveShadow = true;

	mesh.position.set(
		Math.random() * sceneScale,
		Math.random(),
		Math.random() * sceneScale
	);
	mesh.scale.multiplyScalar(0.2);
	mesh.scale.y = mesh.scale.y * Math.random();
	meshes.add(mesh)
	};

	scene.add(meshes);

	scene.translateX(sceneScale / -2);
	scene.translateZ(sceneScale / -2);
	scene.translateY(sceneScale / -2);


/**
 * Sizes
 */
const frame = document.querySelector(".display__project");

const sizes = {
	width: frame.clientWidth * 2,
    height: frame.clientHeight * 2
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = frame.clientWidth
    sizes.height = frame.clientHeight

    // Update camera
	camera.aspect = sizes.width / sizes.height
	
	// Ortho zoom
	const zoom = 1.0;

	// Bounds
	camera.left = -zoom * camera.aspect;
	camera.right = zoom * camera.aspect;
	camera.top = zoom;
	camera.bottom = -zoom;

	// Near/Far
	camera.near = -100;
	camera.far = 100;

	// Set position & look at world center
	camera.position.set(zoom, zoom, zoom);
	// camera.position.set(0, 0, 1);
	camera.lookAt(new Vector3());

	// Update the camera
	camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(2)
})

/**
 * Camera
 */
// Base camera
const camera = new OrthographicCamera();
camera.position.set(0, 0, -4);
camera.lookAt(new Vector3());
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor("hsl(0, 0%, 95%)", 1);
renderer.outputEncoding = sRGBEncoding
renderer.toneMapping = ReinhardToneMapping
renderer.toneMappingExposure = 3

/**
 * Animate
 */
const clock = new Clock()

const tick = () => {
	
	const elapsedTime = clock.getElapsedTime()
	
	camera.position.x = Math.cos(Math.sin(elapsedTime * 0.5)) * Math.PI;
	camera.position.z = Math.sin(Math.sin(elapsedTime * 0.5)) * Math.PI;

for (let x = 0; x < meshes.children.length; x++) {
	let currentMesh = meshes.children[x];
	currentMesh.scale.x = Math.abs((Math.cos((elapsedTime * 0.01) * (x + 1)) * 0.2)) + 0.01;
	currentMesh.scale.y = Math.abs((Math.sin((elapsedTime * 0.03) * (x + 1)) * 0.3)) + 0.01;
	currentMesh.scale.z = Math.abs((Math.sin((elapsedTime * 0.02) * (x + 1)) * 0.1)) + 0.01;
}

	// Update controls
	controls.update()
	
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()