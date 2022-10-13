import * as THREE from '../../static/utilities/three.min.js'
import fragmentShader from "./fragmentShader.glsl"
import vertexShader from "./vertexShader.glsl"
import { OrbitControls } from '../../static/utilities/OrbitControls.js'
import { gsap } from 'gsap';

// Canvas
const canvas = document.querySelector('.preloader')

// Scene
const scene = new THREE.Scene()

// Loaders
let stopModule = false
document.addEventListener("moduleLoaded", (e) => {
    gsap.delayedCall(1.5, () => {
        gsap.to(overlayMaterial.uniforms.uRadius, { duration: 6, ease: "power1.out", value: 10.00 });
        gsap.to(overlayMaterial.uniforms.uBlur, { duration: 2, value: 0.4 });
        setTimeout(() => {
            canvas.remove()
            renderer.dispose()
            controls.dispose()
            camera.remove()
            scene.remove(overlay)
            overlay.geometry.dispose()
            overlay.material.dispose()
            overlayMaterial.dispose()
            scene.remove()
            stopModule = true
            return stopModule
        }, "1200")
    })
})

// Sizes
const frame = document.querySelector(".preloader");

const sizes = {
    width: window.innerWidth * 2,
    height: window.innerHeight * 2
}

const mouse = new THREE.Vector2(sizes.width / 2, sizes.height / 2);
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / window.innerWidth - 0.5;
    mouse.y = -(event.clientY / window.innerHeight - 0.5);
})

// Preloader
const overlayMaterial = new THREE.ShaderMaterial({
    precision: "lowp",
    // transparent: true,
    side: THREE.DoubleSide, 
    uniforms: {
        uAlpha: { value: 0.5 },
        uMouse: { value: mouse }, 
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uRadius: { value: 0.01 },
        uBlur: { value: 4.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }

})

const overlay = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 1, 1),
    overlayMaterial
)
canvas.style.backgroundColor = "unset"
scene.add(overlay)

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = frame.clientWidth
    sizes.height = frame.clientHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(2)
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, -4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)

// Animation
// const clock = new THREE.Clock()

const tick = () => {
    if(!stopModule) {

    overlay.material.uniforms.uTime.value += 0.01

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick);
    }
}

tick()