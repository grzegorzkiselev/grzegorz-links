"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[746],{746:(e,n,o)=>{o.r(n);var i=o(607),t=o(670),s=o(358);const r=document.querySelector(".preloader"),c=new i.Scene;let v=!1;document.addEventListener("moduleLoaded",(e=>{s.p8.delayedCall(1.5,(()=>{s.p8.to(u.uniforms.uRadius,{duration:10,value:10}),setTimeout((()=>(r.remove(),p.dispose(),y.dispose(),m.remove(),c.remove(l),l.geometry.dispose(),l.material.dispose(),u.dispose(),c.remove(),v=!0,v)),"1000")}))}));const a=document.querySelector(".preloader"),d={width:2*window.innerWidth,height:2*window.innerHeight},x=new i.Vector2(d.width/2,d.height/2);window.addEventListener("mousemove",(e=>{x.x=e.clientX/window.innerWidth-.5,x.y=-(e.clientY/window.innerHeight-.5)}));const u=new i.ShaderMaterial({precision:"lowp",side:i.DoubleSide,uniforms:{uAlpha:{value:.5},uMouse:{value:x},uTime:{value:0},uRes:{value:new i.Vector2(window.innerWidth,window.innerHeight)},uRadius:{value:.01}},vertexShader:"#define GLSLIFY 1\nvarying vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = vec4(position, 1.0);\n}",fragmentShader:"#define GLSLIFY 1\nuniform vec2 uMouse;\nuniform vec2 uRes;\n\nuniform float uTime;\n\nuniform float uRadius;\n\nvarying vec2 v_uv;\n\nfloat circle(in vec2 _st, in float _radius, in float blurriness){\n    vec2 dist = _st;\n    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);\n}\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main() {\n\n  // We manage the device ratio by passing PR constant\n\tvec2 res = uRes * PR;\n\tvec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);\n\t// tip: use the following formula to keep the good ratio of your coordinates\n\tst.y *= uRes.y / uRes.x;\n\n\t// We readjust the mouse coordinates\n\tvec2 mouse = -1. * uMouse;\n\t\n\tvec2 circlePos = st + mouse;\n\tfloat c = circle(circlePos, uRadius, 1.1) * 2.0;\n\n\tfloat offx = v_uv.x + sin(v_uv.y + uTime * .1) + .5;\n\tfloat offy = v_uv.y - uTime * 0.1 - cos(uTime * .01) * .01;\n\n\tfloat n = snoise3(vec3(offx, offy, uTime * 0.1) * 10.) - .5;\n\n\tfloat finalMask = smoothstep(0.01, 0.02, n + c);\n\n\tvec3 colors = vec3(1., 1., 1.);\n\n\tvec3 finalColor = vec3(finalMask + 0.02, finalMask + 0.29, finalMask + 0.73);\n\n\tif (float(finalColor) > 0.75) discard;\n\n\tgl_FragColor = vec4(vec3(finalColor), 1.0);\n\n}",defines:{PR:window.devicePixelRatio.toFixed(1)}}),l=new i.Mesh(new i.PlaneBufferGeometry(2,2,1,1),u);r.style.backgroundColor="unset",c.add(l),window.addEventListener("resize",(()=>{d.width=a.clientWidth,d.height=a.clientHeight,p.setSize(d.width,d.height),p.setPixelRatio(2)}));const m=new i.PerspectiveCamera(75,d.width/d.height,.1,100);m.position.set(4,1,-4),c.add(m);const y=new t.z(m,r),p=new i.WebGLRenderer({canvas:r,antialias:!0,alpha:!0});p.setSize(d.width,d.height);const f=()=>{v||(l.material.uniforms.uTime.value+=.01,y.update(),p.render(c,m),window.requestAnimationFrame(f))};f()}}]);
//# sourceMappingURL=bundle.dff672bfda29c6d992fc.js.map