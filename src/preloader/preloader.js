import {
  Scene,
  PerspectiveCamera,
  Vector2,
  ShaderMaterial,
  DoubleSide,
  Mesh,
  PlaneBufferGeometry,
  WebGLRenderer,
} from "../utilities/three.min.js";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { gsap } from "gsap";

var canvas = document.querySelector(".preloader");

var scene = new Scene();
var pixelRatio = window.devicePixelRatio;

var stopModule = false;
document.addEventListener("moduleLoaded", (e) => {
  gsap.delayedCall(3, () => {
    gsap.to(overlayMaterial.uniforms.uRadius, {
      duration: 2,
      value: 8.0,
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

var frame = document.querySelector(".preloader");

var sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

var mouse = new Vector2(sizes.width, sizes.height);
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = -(event.clientY / window.innerHeight - 0.5);
});

var overlayMaterial = new ShaderMaterial({
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
    PR: pixelRatio.toFixed(2),
  },
});

var overlay = new Mesh(new PlaneBufferGeometry(2, 2, 1, 1), overlayMaterial);
canvas.style.backgroundColor = "unset";
scene.add(overlay);

window.addEventListener("resize", () => {
  sizes.width = frame.clientWidth;
  sizes.height = frame.clientHeight;
  renderer.setSize(sizes.width * pixelRatio, sizes.height * pixelRatio);
  renderer.setPixelRatio(pixelRatio);
});

var camera = new PerspectiveCamera(0, sizes.width / sizes.height, 0, 0);
scene.add(camera);

var renderer = new WebGLRenderer({
  canvas: canvas,
  antialias: false,
  alpha: true,
  powerPreference: "high-performance",
});

renderer.setSize(sizes.width * pixelRatio, sizes.height * pixelRatio);

var tick = () => {
  if (!stopModule) {
    overlay.material.uniforms.uTime.value += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }
};

tick();
