// import * as THREE from '../../static/utilities/three.min.js'
import { Scene, LoadingManager, TextureLoader, CubeTextureLoader, ShaderMaterial, Mesh, PlaneBufferGeometry, MeshStandardMaterial, sRGBEncoding, MeshDepthMaterial, RGBADepthPacking, AmbientLight, DirectionalLight, PerspectiveCamera, WebGLRenderer, ACESFilmicToneMapping, PCFShadowMap, Clock } from "../../static/utilities/three.min.js";
import { OrbitControls } from '../../static/utilities/OrbitControls.js'
import { GLTFLoader } from '../../static/utilities/GLTFLoader.js'
import { DRACOLoader } from '../../static/utilities/DRACOLoader.js'
import { gsap } from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.me')

// Scene
const scene = new Scene()

const blurred = document.querySelector(".blurred")
// const blurred = document.querySelectorAll(".blurred")

// Loaders

const loadingManager = new LoadingManager(() => {
        gsap.delayedCall(1.5, () => {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 1.5, value: 0 });
            blurred.style.webkitFilter = "blur(0px)"
            blurred.classList.remove("blurred");
            const event = new CustomEvent("moduleLoaded", {
                detail: {}
            })
            document.dispatchEvent(event);
        })
    }
)

const textureLoader = new TextureLoader()
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new CubeTextureLoader()
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath("./utilities/")
gltfLoader.setDRACOLoader(dracoLoader)

// Preloader
const overlayMaterial = new ShaderMaterial({
    precision: "lowp",
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
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
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
environmentMap.encoding = sRGBEncoding
scene.environment = environmentMap

// Textures
const mapTexture = textureLoader.load('./models/Draco/textures/color.jpg')
mapTexture.encoding = sRGBEncoding;
mapTexture.flipY = false;

const normalTexture = textureLoader.load('./models/Draco/textures/normal.jpg')

// Material
const material = new MeshStandardMaterial({
    map: mapTexture,
    normalMap: normalTexture
})

const depthMaterial = new MeshDepthMaterial({
    depthPacking: RGBADepthPacking
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
directionalLight.shadow.mapSize.set(512, 512)
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
renderer.outputEncoding = sRGBEncoding
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap
renderer.physicallyCorrectLights = true

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
