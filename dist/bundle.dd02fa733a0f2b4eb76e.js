"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[553],{553:(t,e,n)=>{n.r(e);var a=n(607),i=n(670);const o=n(130),s=n(580),r=document.querySelector("canvas.cubes"),c=new a.Scene,h=new a.BoxBufferGeometry(1,1,1),l=o.shuffle(o.pick(s)).slice(0,5),d=new a.Group;for(let t=0;t<20;t++){const t=new a.Mesh(h,new a.ShaderMaterial({precision:"lowp",fragmentShader:"\n\t\tvarying vec2 vUv;\n\t\tuniform vec3 color;\n\n\t\tvoid main () {\n\t\t\tgl_FragColor = vec4(vec3(color * vUv.x), 1.0);\n\t\t}\n\t",vertexShader:"\n\t\tvarying vec2 vUv;\n\n\t\tvoid main () {\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);\n\t\t}\n\t",uniforms:{color:{value:new a.Color(o.pick(l))}}}));t.position.set(1*Math.random(),Math.random(),1*Math.random()),t.scale.multiplyScalar(.2),t.scale.y=t.scale.y*Math.random(),d.add(t)}c.add(d),c.translateX(-.5),c.translateZ(-.5),c.translateY(-.5);const p=document.querySelector(".display__project"),v={width:2*p.clientWidth,height:2*p.clientHeight};window.addEventListener("resize",(()=>{v.width=p.clientWidth,v.height=p.clientHeight,w.aspect=v.width/v.height,w.left=-1*w.aspect,w.right=1*w.aspect,w.top=1,w.bottom=-1,w.near=-100,w.far=100,w.position.set(1,1,1),w.lookAt(new a.Vector3),w.updateProjectionMatrix(),g.setSize(v.width,v.height),g.setPixelRatio(2)}));const w=new a.OrthographicCamera;w.position.set(0,0,-4),w.lookAt(new a.Vector3),c.add(w);const M=new i.z(w,r);M.enableDamping=!0;const g=new a.WebGLRenderer({canvas:r,antialias:!0});g.setSize(v.width,v.height),g.setClearColor("hsl(0, 0%, 95%)",1),g.outputEncoding=a.sRGBEncoding,g.toneMapping=a.ReinhardToneMapping,g.toneMappingExposure=3;const u=new a.Clock,m=()=>{const t=u.getElapsedTime();w.position.x=Math.cos(Math.sin(.5*t))*Math.PI,w.position.z=Math.sin(Math.sin(.5*t))*Math.PI;for(let e=0;e<d.children.length;e++){let n=d.children[e];n.scale.x=Math.abs(.2*Math.cos(.01*t*(e+1)))+.01,n.scale.y=Math.abs(.3*Math.sin(.03*t*(e+1)))+.01,n.scale.z=Math.abs(.1*Math.sin(.02*t*(e+1)))+.01}M.update(),g.render(c,w),window.requestAnimationFrame(m)};m()}}]);
//# sourceMappingURL=bundle.dd02fa733a0f2b4eb76e.js.map