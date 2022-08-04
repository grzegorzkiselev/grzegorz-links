"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[798],{798:(e,n,t)=>{t.r(n);var a=t(212),r=t(886),o=t(47),i=t(338),l=t(358);const s=document.querySelector("canvas.me"),d=new a.xsS,c=document.querySelector(".blurred"),m=new a.lLk((()=>{l.p8.delayedCall(1.5,(()=>{l.p8.to(x.uniforms.uAlpha,{duration:1.5,value:0}),c.style.webkitFilter="blur(0px)",c.classList.remove("blurred")}))})),u=new a.dpR(m),p=new o.E(m),h=new a.cBK,g=new i._(m);g.setDecoderPath("./draco/"),p.setDRACOLoader(g);const x=new a.jyz({transparent:!0,uniforms:{uAlpha:{value:1}},vertexShader:"\n        void main() {\n            gl_Position = vec4(position, 1.0);\n        }",fragmentShader:"\n        uniform float uAlpha;\n        void main() {\n            gl_FragColor = vec4(0.95, 0.95, 0.95, uAlpha);\n        }"}),v=new a.Kj0(new a.BKK(2,2,1,1),x);d.add(v);const w=h.load(["./textures/environmentMaps/0/px.jpg","./textures/environmentMaps/0/nx.jpg","./textures/environmentMaps/0/py.jpg","./textures/environmentMaps/0/ny.jpg","./textures/environmentMaps/0/pz.jpg","./textures/environmentMaps/0/nz.jpg"]);w.encoding=a.knz,d.environment=w;const f=u.load("./models/Draco/textures/color.jpg");f.encoding=a.knz,f.flipY=!1;const M=u.load("./models/Draco/textures/normal.jpg"),S=new a.Wid({map:f,normalMap:M}),y=new a.lRF({depthPacking:a.mSO}),_={uTime:{value:1}};S.onBeforeCompile=e=>{e.uniforms.uTime=_.uTime,e.vertexShader=e.vertexShader.replace("#include <common>","\n            #include <common>\n\n            uniform float uTime;\n\n            mat2 rotate2dRotateMatrix(float _angle){\n                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));\n            }\n        "),e.vertexShader=e.vertexShader.replace("#include <beginnormal_vertex>","\n            #include <beginnormal_vertex>\n            \n            float angle = sin(position.y + uTime) * 1.3;\n\n            mat2 rotateMatrix = rotate2dRotateMatrix(angle);\n            objectNormal.xy = rotateMatrix * objectNormal.xy;\n        "),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","\n            #include <begin_vertex>\n\n            transformed.xy = rotateMatrix * transformed.xy;\n        ")},y.onBeforeCompile=e=>{e.uniforms.uTime=_.uTime,e.vertexShader=e.vertexShader.replace("#include <common>","\n            #include <common>\n\n            uniform float uTime;\n\n            mat2 rotate2dRotateMatrix(float _angle){\n                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));\n            }\n        "),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","\n            #include <begin_vertex>\n            float angle = sin(position.y + uTime) * 1.3;\n\n            mat2 rotateMatrix = rotate2dRotateMatrix(angle);\n            transformed.xy = rotateMatrix * transformed.xy;\n        ")},p.load("./models/Draco/me.glb",(e=>{const n=e.scene.children[0];n.rotation.y=1*Math.PI,n.scale.set(3,3,3),n.material=S,n.customDepthMaterial=y,d.add(n),d.traverse((e=>{e instanceof a.Kj0&&e.material instanceof a.Wid&&(e.material.envMapIntensity=5,e.material.needsUpdate=!0,e.castShadow=!0,e.receiveShadow=!0)}))}));const b=new a.Mig(16777215,2);d.add(b);const j=new a.Ox3("#ffffff",3);j.castShadow=!0,j.shadow.mapSize.set(512,512),j.shadow.camera.far=4,j.shadow.normalBias=.05,j.position.set(.25,2,-2.25),d.add(j);const z=document.querySelector(".display__project"),C={width:2*z.clientWidth,height:2*z.clientHeight};window.addEventListener("resize",(()=>{C.width=z.clientWidth,C.height=z.clientHeight,R.setSize(C.width,C.height),R.setPixelRatio(2)}));const T=new a.cPb(75,C.width/C.height,.1,100);T.position.set(4,1,-4),d.add(T);const k=new r.z(T,s);k.enableDamping=!0;const R=new a.CP7({canvas:s,antialias:!0});R.setSize(C.width,C.height),R.setClearColor("hsl(0, 0%, 95%)",1),R.outputEncoding=a.knz,R.toneMapping=a.LY2,R.toneMappingExposure=1,R.shadowMap.enabled=!0,R.shadowMap.type=a._iA,R.physicallyCorrectLights=!0;const A=new a.SUY,D=()=>{const e=A.getElapsedTime();_.uTime.value=4*e,k.update(),R.render(d,T),window.requestAnimationFrame(D)};D()}}]);
//# sourceMappingURL=bundle.6bfe66d61d6c692d0a5d.js.map