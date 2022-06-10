import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Canvas
const canvas = document.querySelector('canvas.me')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("./draco/")
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    './textures/environmentMaps/0/px.jpg',
    './textures/environmentMaps/0/nx.jpg',
    './textures/environmentMaps/0/py.jpg',
    './textures/environmentMaps/0/ny.jpg',
    './textures/environmentMaps/0/pz.jpg',
    './textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
scene.environment = environmentMap

/**
 * Material
 */

// Textures
const mapTexture = textureLoader.load('./models/Draco/textures/color.jpg')
mapTexture.encoding = THREE.sRGBEncoding;
mapTexture.flipY = false;

const normalTexture = textureLoader.load('./models/Draco/textures/normal.jpg')

// Material
const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
})

const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
})

const customUniforms = {
    uTime: { value: 0 }
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

/**
 * Models
 */
gltfLoader.load(
    './models/Draco/me.glb',
    (gltf) =>
    {
        // Model
        const mesh = gltf.scene.children[0]
        mesh.rotation.y = Math.PI * 0.5
        mesh.material = material
        mesh.customDepthMaterial = depthMaterial
        // console.log(gltf.scene);
        scene.add(mesh)

        // Update materials
        updateAllMaterials()
    }
)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, - 2.25)
scene.add(directionalLight)

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
    sizes.height = frame.clientWidth

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
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
renderer.setClearColor("hsl(0, 0%, 95%)", 1);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    customUniforms.uTime.value = elapsedTime * 4;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()