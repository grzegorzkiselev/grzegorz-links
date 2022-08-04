import * as THREE from '../../static/draco/three.min.js'

import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/scene';
import { Mesh } from 'three/src/objects/Mesh';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { LoadingManager } from 'three/src/loaders/LoadingManager.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader.js';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import { MeshDepthMaterial } from 'three/src/materials/MeshDepthMaterial.js';
import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry.js';
import { AmbientLight } from 'three/src/lights/AmbientLight.js';
import { DirectionalLight } from 'three/src/lights/DirectionalLight.js';
import { Clock } from 'three/src/core/Clock.js';
import { OrbitControls } from '../../static/draco/OrbitControls.js'
import { GLTFLoader } from '../../static/draco/GLTFLoader.js'
import { DRACOLoader } from '../../static/draco/DRACOLoader.js'
import {gsap} from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.me')

// Scene
const scene = new Scene()

const blurred = document.querySelector(".blurred")
// const blurred = document.querySelectorAll(".blurred")

// Loaders
const loadingManager = new LoadingManager(
    () => {
        gsap.delayedCall(1.5, () => {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 1.5, value: 0 });
            blurred.style.webkitFilter = "blur(0px)"
            blurred.classList.remove("blurred")
        })
        // gsap.delayedCall(1.5, () => {
        //     gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 });
        //     blurred.forEach((b) => b.style.webkitFilter = "blur(0px)")
        // })
    }
)
const textureLoader = new TextureLoader(loadingManager)
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new CubeTextureLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("./draco/")
gltfLoader.setDRACOLoader(dracoLoader)

// Preloader
const overlayMaterial = new ShaderMaterial({
    transparent: true,
    uniforms: {
        uAlpha: {
            value: 1
        }
    },
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }`,
    fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.95, 0.95, 0.95, uAlpha);
        }`
})

const overlay = new Mesh(
    new PlaneBufferGeometry(2, 2, 1, 1),
    overlayMaterial
)
scene.add(overlay)

// Update all materials
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child.isMesh = true && child.material instanceof MeshStandardMaterial) {
            child.material.envMapIntensity = 5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}


// Environment map
const environmentMap = cubeTextureLoader.load([
    './textures/environmentMaps/0/px.jpg',
    './textures/environmentMaps/0/nx.jpg',
    './textures/environmentMaps/0/py.jpg',
    './textures/environmentMaps/0/ny.jpg',
    './textures/environmentMaps/0/pz.jpg',
    './textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding
scene.environment = environmentMap

// Textures
const mapTexture = textureLoader.load('./models/Draco/textures/color.jpg')
mapTexture.encoding = THREE.sRGBEncoding;
mapTexture.flipY = false;

const normalTexture = textureLoader.load('./models/Draco/textures/normal.jpg')

// Material
const material = new MeshStandardMaterial({
    map: mapTexture,
    normalMap: normalTexture
})

const depthMaterial = new MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
})

const customUniforms = {
    uTime: {
        value: 1
    }
}

material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime;

    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 rotate2dRotateMatrix(float _angle){
                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
            }
        `
    );

    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
            #include <beginnormal_vertex>
            
            float angle = sin(position.y + uTime) * 1.3;

            mat2 rotateMatrix = rotate2dRotateMatrix(angle);
            objectNormal.xy = rotateMatrix * objectNormal.xy;
        `
    )

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            transformed.xy = rotateMatrix * transformed.xy;
        `
    );
}

depthMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime;
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 rotate2dRotateMatrix(float _angle){
                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
            }
        `
    );
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>
            float angle = sin(position.y + uTime) * 1.3;

            mat2 rotateMatrix = rotate2dRotateMatrix(angle);
            transformed.xy = rotateMatrix * transformed.xy;
        `
    );
}

// Model
gltfLoader.load(
    './models/Draco/me.glb',
    (gltf) => {
        const mesh = gltf.scene.children[0]
        mesh.rotation.y = Math.PI * 1
        mesh.scale.set(3, 3, 3)
        mesh.material = material
        mesh.customDepthMaterial = depthMaterial
        scene.add(mesh)
        updateAllMaterials()
    }
)


// Light
const ambientLight = new AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 4
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, -2.25)
scene.add(directionalLight)

// Sizes
const frame = document.querySelector(".display__project");

const sizes = {
    width: frame.clientWidth * 2,
    height: frame.clientHeight * 2
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = frame.clientWidth
    sizes.height = frame.clientHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(2)
})

// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, -4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor("hsl(0, 0%, 95%)", 1);
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true

console.log(scene.children)

// Animation
const clock = new Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    customUniforms.uTime.value = elapsedTime * 4;

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick);

}

tick()