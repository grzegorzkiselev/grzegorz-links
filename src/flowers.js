import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const glslify = require("glslify");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.flowers')

// Scene
const scene = new THREE.Scene()
const sceneScale = 1;

/**
 * Models
 */
// Setup a geometry
	const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

	// Setup a material
	const colorCount = 5;
	const palette = random.shuffle(random.pick(palettes))
	.slice(0, colorCount);

	// Setup a mesh with geometry + material

	const meshes = new THREE.Group();

	const vertexShader = glslify(`
		varying vec2 vUv;


		uniform float elapsedTime;
		#pragma glslify: noise = require("glsl-noise/simplex/4d");

		void main () {
			vUv = uv;
			vec3 pos = position.xyz;
			pos += normal * noise(vec4(position.xyz, elapsedTime * 0.2)) * 4.0;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
		}
	`);

	const fragmentShader = glslify(`
		varying vec2 vUv;

		#pragma glslify: noise = require("glsl-noise/simplex/3d");

		uniform vec3 color;
		uniform float elapsedTime;

		void main () {
			float offset = 0.3 * noise(vec3(vUv.xy, elapsedTime * 0.1));
			gl_FragColor = vec4(vec3(color * vUv.x + offset), 1.0);
		}
	`);

	for (let i = 0; i < 11; i++) {
	const mesh = new THREE.Mesh(
		geometry,
		new THREE.ShaderMaterial({
			fragmentShader,
			vertexShader,
			uniforms: {
				elapsedTime: { value: 0 },
				color: { value: new THREE.Color(random.pick(palette)) }
			},
		})
	);

	mesh.position.set(
		Math.random() * sceneScale,
		Math.random() * sceneScale,
		Math.random() * sceneScale
	);
		
	mesh.rotation.set(
		Math.random() * sceneScale * Math.PI,
		Math.random() * sceneScale * Math.PI,
		Math.random() * sceneScale * Math.PI
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
const frame = document.querySelector(".project");

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
	camera.lookAt(new THREE.Vector3());

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
const camera = new THREE.OrthographicCamera();
camera.position.set(0, 0, -4);
camera.lookAt(new THREE.Vector3());
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor("hsl(0, 0%, 95%)", 1);
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
	
	const elapsedTime = clock.getElapsedTime()
	
	camera.position.x = Math.cos(Math.sin(elapsedTime)) * Math.PI;
	camera.position.z = Math.sin(Math.sin(elapsedTime)) * Math.PI;


	// Update time for shaders
	meshes.children.forEach(mesh => { 
			mesh.material.uniforms.elapsedTime.value = elapsedTime;
	})
	
	// Update controls
	controls.update()
	
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
