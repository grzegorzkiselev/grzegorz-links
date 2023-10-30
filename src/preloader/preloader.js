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

var canvas = document.querySelector(".preloader");

var scene = new Scene();
var pixelRatio = window.devicePixelRatio;

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
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  overlayMaterial.uRes = new Vector2(window.innerWidth, window.innerHeight);
  overlayMaterial.uMouse = mouse;
  renderer.setSize(sizes.width * pixelRatio, sizes.height * pixelRatio);
  renderer.setPixelRatio(pixelRatio);
});
canvas.addEventListener("scroll", (event) => {
  event.preventDefault();
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
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

var tickBeforeStop = () => {
  overlay.material.uniforms.uTime.value += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

var getStepValue = (duration, toValue) => toValue / ((duration * 60) / toValue);

var radiusStep = getStepValue(4, 4);
var blurStep = getStepValue(8, 2);
var timerId = 0;

var tickAfterStop = () => {
  overlay.material.uniforms.uBlur.value -= blurStep;
  overlay.material.uniforms.uRadius.value += radiusStep;

  overlay.material.uniforms.uTime.value += 0.01;
  renderer.render(scene, camera);
  timerId = window.requestAnimationFrame(tick);
};

var tick = tickBeforeStop;

tick();

document.addEventListener("moduleLoaded", (e) => {
  tick = tickAfterStop;
  setTimeout(() => {
    tick = () => {};
    canvas.remove();
    window.cancelAnimationFrame(timerId);
  }, 6000);
});
