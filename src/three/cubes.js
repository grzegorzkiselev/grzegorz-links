// import * as THREE from '../../static/utilities/three.min.js'
import { BoxBufferGeometry, Group, Mesh, ShaderMaterial, Color, Clock } from "../../static/utilities/three.min.js";
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
import { Base }  from "./base.js"

const canvas = document.querySelector('canvas.cubes')
const base = new Base(canvas)

const geometry = new BoxBufferGeometry(1, 1, 1);

const colorCount = 5;
const palette = random.shuffle(random.pick(palettes))
  .slice(0, colorCount);

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
      precision: "lowp",
      fragmentShader,
      vertexShader,
      uniforms: {
        color: {
          value: new Color(random.pick(palette))
        }
      },
      // color: random.pick(palette),
      // roughness: 0,
    })
  );

  // mesh.castShadow = true;
  // mesh.receiveShadow = true;

  mesh.position.set(
    Math.random() * base.sceneScale,
    Math.random(),
    Math.random() * base.sceneScale
  );
  mesh.scale.multiplyScalar(0.2);
  mesh.scale.y = mesh.scale.y * Math.random();
  meshes.add(mesh)
};

base.scene.add(meshes);

base.scene.translateX(base.sceneScale / -2);
base.scene.translateZ(base.sceneScale / -2);
base.scene.translateY(base.sceneScale / -2);

const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  base.camera.position.x = Math.cos(Math.sin(elapsedTime * 0.5)) * Math.PI;
  base.camera.position.z = Math.sin(Math.sin(elapsedTime * 0.5)) * Math.PI;

  for (let x = 0; x < meshes.children.length; x++) {
    let currentMesh = meshes.children[x];
    currentMesh.scale.x = Math.abs((Math.cos((elapsedTime * 0.01) * (x + 1)) * 0.2)) + 0.01;
    currentMesh.scale.y = Math.abs((Math.sin((elapsedTime * 0.03) * (x + 1)) * 0.3)) + 0.01;
    currentMesh.scale.z = Math.abs((Math.sin((elapsedTime * 0.02) * (x + 1)) * 0.1)) + 0.01;
  }

  base.controls.update()
  base.renderer.render(base.scene, base.camera)
  window.requestAnimationFrame(tick)
}

tick()
