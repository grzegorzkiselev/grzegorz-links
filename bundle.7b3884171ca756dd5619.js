(()=>{var e,t,i={184:(e,t,i)=>{"use strict";var r=i(358);const s=(e,t,i,r,s)=>(e-t)*(s-r)/(i-t)+r,n=(e,t,i)=>(1-i)*e+i*t;let a,o=[];for(let e=1;e<=document.querySelectorAll(".links__link").length;e++)a=Object.entries(i(903)(`./${e}.jpg`)),o.push(a[0]);let l={x:0,y:0},h=l,u={x:h.x-l.x,y:h.y-l.y};window.addEventListener("mousemove",(e=>l=(e=>({x:e.clientX,y:e.clientY}))(e)));class c{constructor(e,t,i){this.DOM={el:e},this.inMenuPosition=t,this.animatableProperties=i,this.DOM.textInner=this.DOM.el.querySelector(".links__link-textinner"),this.layout(),this.initEvents()}layout(){this.DOM.reveal=document.createElement("div"),this.DOM.reveal.className="hover-reveal",this.DOM.revealInner=document.createElement("div"),this.DOM.revealInner.className="hover-reveal__inner",this.DOM.revealImage=document.createElement("div"),this.DOM.revealImage.className="hover-reveal__img",this.DOM.revealImage.style.backgroundImage=`url(${o[this.inMenuPosition][1]})`,this.DOM.revealInner.appendChild(this.DOM.revealImage),this.DOM.reveal.appendChild(this.DOM.revealInner),this.DOM.el.appendChild(this.DOM.reveal)}calcBounds(){this.bounds={el:this.DOM.el.getBoundingClientRect(),reveal:this.DOM.reveal.getBoundingClientRect()}}initEvents(){this.mouseenterFn=e=>{this.showImage(),this.firstRAFCycle=!0,this.loopRender()},this.mouseleaveFn=()=>{this.stopRendering(),this.hideImage()},this.DOM.el.addEventListener("mouseenter",this.mouseenterFn),this.DOM.el.addEventListener("mouseleave",this.mouseleaveFn)}showImage(){r.p8.killTweensOf(this.DOM.revealInner),r.p8.killTweensOf(this.DOM.revealImage),this.tl=r.p8.timeline({onStart:()=>{this.DOM.reveal.style.opacity=1,r.p8.set(this.DOM.el,{zIndex:o.length})}}).to(this.DOM.revealInner,.2,{ease:"Sine.easeOut",startAt:{x:u.x<0?"100%":"-100%"},x:"0%"}).to(this.DOM.revealImage,.2,{ease:"Sine.easeOut",startAt:{x:u.x<0?"-100%":"100%"},x:"0%"},0)}hideImage(){r.p8.killTweensOf(this.DOM.revealInner),r.p8.killTweensOf(this.DOM.revealImage),this.tl=r.p8.timeline({onStart:()=>{r.p8.set(this.DOM.el,{zIndex:1})},onComplete:()=>{r.p8.set(this.DOM.reveal,{opacity:0})}}).to(this.DOM.revealInner,.2,{ease:"Sine.easeOut",x:u.x<0?"-100%":"100%"}).to(this.DOM.revealImage,.2,{ease:"Sine.easeOut",x:u.x<0?"100%":"-100%"},0)}loopRender(){this.requestId||(this.requestId=requestAnimationFrame((()=>this.render())))}stopRendering(){this.requestId&&(window.cancelAnimationFrame(this.requestId),this.requestId=void 0)}render(){this.requestId=void 0,this.firstRAFCycle&&this.calcBounds();const e=(100,(t=Math.abs(h.x-l.x))<=0?0:t>=100?100:t);var t;u={x:h.x-l.x,y:h.y-l.y},h={x:l.x,y:l.y},this.animatableProperties.tx.current=Math.abs(l.x)-this.bounds.reveal.width/2,this.animatableProperties.ty.current=Math.abs(l.y)-this.bounds.reveal.height,this.animatableProperties.rotation.current=this.firstRAFCycle?0:s(e,0,100,0,u.x<0?-60:60),this.animatableProperties.brightness.current=this.firstRAFCycle?1:s(e,0,100,1,4),this.animatableProperties.tx.previous=this.firstRAFCycle?this.animatableProperties.tx.current:n(this.animatableProperties.tx.previous,this.animatableProperties.tx.current,this.animatableProperties.tx.amt),this.animatableProperties.ty.previous=this.firstRAFCycle?this.animatableProperties.ty.current:n(this.animatableProperties.ty.previous,this.animatableProperties.ty.current,this.animatableProperties.ty.amt),this.animatableProperties.rotation.previous=this.firstRAFCycle?this.animatableProperties.rotation.current:n(this.animatableProperties.rotation.previous,this.animatableProperties.rotation.current,this.animatableProperties.rotation.amt),this.animatableProperties.brightness.previous=this.firstRAFCycle?this.animatableProperties.brightness.current:n(this.animatableProperties.brightness.previous,this.animatableProperties.brightness.current,this.animatableProperties.brightness.amt),r.p8.set(this.DOM.reveal,{x:this.animatableProperties.tx.previous,y:this.animatableProperties.ty.previous,rotation:this.animatableProperties.rotation.previous,filter:`blur(${10*(this.animatableProperties.brightness.previous-1)}px`}),this.firstRAFCycle=!1,this.loopRender()}}Promise.all([i.e(216),i.e(798)]).then(i.bind(i,798)),Promise.all([i.e(216),i.e(553)]).then(i.bind(i,553)),Promise.all([i.e(216),i.e(511)]).then(i.bind(i,511));let d=!1;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(d=!0);const m=document.querySelector(".links");d||new class{constructor(e){this.DOM={el:e},this.DOM.menuItems=this.DOM.el.querySelectorAll(".links__link"),this.animatableProperties={tx:{previous:0,current:0,amt:.08},ty:{previous:0,current:0,amt:.08},rotation:{previous:0,current:0,amt:.08},brightness:{previous:1,current:1,amt:.08}},this.menuItems=[],[...this.DOM.menuItems].forEach(((e,t)=>this.menuItems.push(new c(e,t,this.animatableProperties))))}}(m),document.getElementById("main-container");var p=document.getElementById("resize-container"),v=document.getElementById("resize-value");document.addEventListener("DOMContentLoaded",(function(e){var t=null;const i=function(){clearTimeout(t),t=setTimeout(r,600);var e=Math.max(document.documentElement.clientHeight,window.innerHeight||0),i=Math.max(document.documentElement.clientWidth,window.innerWidth||0);v.innerHTML=i+" &mdash; "+e,v.innerHTML=Math.round(i/e*1e3)/1e3};window.addEventListener("load",(function(e){i()})),window.addEventListener("resize",(function(e){i()}));const r=function(){p.classList.remove("show")}}))},802:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/f932c3f8fa95b682274f7ddf6333789d.jpg"},381:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/ffcff60ffeae66d0b485f6be37185ae1.jpg"},27:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/e2f974cc88b6ed2387375d0219e4e6f3.jpg"},796:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/c44e1cf7178fb8eabaeb363572ed69b1.jpg"},765:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/0e85c25e62146e38a57eab12c67f78be.jpg"},964:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=i.p+"assets/images/ada9b321061f01fcb61d73f919ad1e59.jpg"},903:(e,t,i)=>{var r={"./1.jpg":802,"./2.jpg":381,"./3.jpg":27,"./4.jpg":796,"./5.jpg":765,"./6.jpg":964};function s(e){var t=n(e);return i(t)}function n(e){if(!i.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}s.keys=function(){return Object.keys(r)},s.resolve=n,e.exports=s,s.id=903}},r={};function s(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return i[e](n,n.exports,s),n.exports}s.m=i,e=[],s.O=(t,i,r,n)=>{if(!i){var a=1/0;for(u=0;u<e.length;u++){for(var[i,r,n]=e[u],o=!0,l=0;l<i.length;l++)(!1&n||a>=n)&&Object.keys(s.O).every((e=>s.O[e](i[l])))?i.splice(l--,1):(o=!1,n<a&&(a=n));if(o){e.splice(u--,1);var h=r();void 0!==h&&(t=h)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[i,r,n]},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,i)=>(s.f[i](e,t),t)),[])),s.u=e=>"bundle."+{511:"620806e17ba7b8fbc4f6",553:"3030b9ced19816e56a26",798:"7edbb0b494df7cd65cd8"}[e]+".js",s.miniCssF=e=>"main.css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},s.l=(e,i,r,n)=>{if(t[e])t[e].push(i);else{var a,o;if(void 0!==r)for(var l=document.getElementsByTagName("script"),h=0;h<l.length;h++){var u=l[h];if(u.getAttribute("src")==e){a=u;break}}a||(o=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.src=e),t[e]=[i];var c=(i,r)=>{a.onerror=a.onload=null,clearTimeout(d);var s=t[e];if(delete t[e],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((e=>e(r))),i)return i(r)},d=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),o&&document.head.appendChild(a)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),(()=>{var e={179:0};s.f.j=(t,i)=>{var r=s.o(e,t)?e[t]:void 0;if(0!==r)if(r)i.push(r[2]);else{var n=new Promise(((i,s)=>r=e[t]=[i,s]));i.push(r[2]=n);var a=s.p+s.u(t),o=new Error;s.l(a,(i=>{if(s.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var n=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.src;o.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",o.name="ChunkLoadError",o.type=n,o.request=a,r[1](o)}}),"chunk-"+t,t)}},s.O.j=t=>0===e[t];var t=(t,i)=>{var r,n,[a,o,l]=i,h=0;if(a.some((t=>0!==e[t]))){for(r in o)s.o(o,r)&&(s.m[r]=o[r]);if(l)var u=l(s)}for(t&&t(i);h<a.length;h++)n=a[h],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(u)},i=self.webpackChunk=self.webpackChunk||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var n=s.O(void 0,[216],(()=>s(184)));n=s.O(n)})();
//# sourceMappingURL=bundle.7b3884171ca756dd5619.js.map