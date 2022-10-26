import * as THREE from '../../static/utilities/three.min.js'
import {
  OrbitControls
} from '../../static/utilities/OrbitControls.js'

const frame = document.querySelector(".display__project");

const sizes = {
  width: frame.clientWidth * 2,
  height: frame.clientHeight * 2
}

class Base {
  constructor(canvas) {
    this.scene = new THREE.Scene()
    this.sceneScale = 1;

    this.camera = new THREE.OrthographicCamera();
    this.camera.position.set(0, 0, -4);
    this.camera.lookAt(new THREE.Vector3());
    this.camera.near = -15
    this.camera.far = 15
    this.scene.add(this.camera)

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    })

    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.setClearColor("hsl(0, 0%, 95%)", 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.toneMappingExposure = 3

    this.controls = new OrbitControls(this.camera, canvas)
    this.enableDamping = true

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = frame.clientWidth
      sizes.height = frame.clientHeight

      // Update camera
      this.camera.aspect = sizes.width / sizes.height

      // Ortho zoom
      const zoom = 1.0;

      // Bounds
      this.camera.left = -zoom * this.camera.aspect;
      this.camera.right = zoom * this.camera.aspect;
      this.camera.top = zoom;
      this.camera.bottom = -zoom;

      // Near/Far
      this.camera.near = -50;
      this.camera.far = 50;

      // Set position & look at world center
      this.camera.position.set(zoom, zoom, zoom);
      // camera.position.set(0, 0, 1);
      this.camera.lookAt(new THREE.Vector3());

      // Update the camera
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(sizes.width, sizes.height)
      this.renderer.setPixelRatio(2)
    })
  }
}

export {
  Base
};
