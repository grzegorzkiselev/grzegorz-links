import {
  Scene,
  PerspectiveCamera,
  Vector2,
  ShaderMaterial,
  DoubleSide,
  Mesh,
  PlaneBufferGeometry,
  WebGLRenderer,
} from "../../static/utilities/three.min.js";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { gsap } from "gsap";

const canvas = document.querySelector(".preloader");

const scene = new Scene();

let stopModule = false;
document.addEventListener("moduleLoaded", (e) => {
  gsap.delayedCall(3, () => {
    gsap.to(overlayMaterial.uniforms.uRadius, {
      duration: 2,
      value: 4.0,
    });
    gsap.to(overlayMaterial.uniforms.uBlur, {
      duration: 1.5,
      value: 0.0,
    });
    setTimeout(() => {
      canvas.remove();
      stopModule = true;
    }, "2000");
  });
});

const frame = document.querySelector(".preloader");

const sizes = {
  width: window.innerWidth * 2,
  height: window.innerHeight * 2,
};

const mouse = new Vector2(sizes.width / 2, sizes.height / 2);
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = -(event.clientY / window.innerHeight - 0.5);
});

const overlayMaterial = new ShaderMaterial({
  precision: "lowp",
  side: DoubleSide,
  uniforms: {
    uAlpha: {
      value: 0.5,
    },
    uMouse: {
      value: mouse,
    },
    uTime: {
      value: 0,
    },
    uRes: {
      value: new Vector2(window.innerWidth, window.innerHeight),
    },
    uRadius: {
      value: 0.01,
      // value: Math.sqrt((sizes.width / 2) ** 2 + (sizes.height / 2) ** 2),
    },
    uBlur: {
      value: 4.0,
    },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  defines: {
    PR: window.devicePixelRatio.toFixed(2),
  },
});

const overlay = new Mesh(new PlaneBufferGeometry(2, 2, 1, 1), overlayMaterial);
canvas.style.backgroundColor = "unset";
scene.add(overlay);

window.addEventListener("resize", () => {
  sizes.width = frame.clientWidth;
  sizes.height = frame.clientHeight;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
});

const camera = new PerspectiveCamera(0, sizes.width / sizes.height, 0, 0);
scene.add(camera);

const renderer = new WebGLRenderer({
  canvas: canvas,
  antialias: false,
  alpha: true,
  powerPreference: "high-performance",
});

renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  if (!stopModule) {
    overlay.material.uniforms.uTime.value += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }
};

tick();
