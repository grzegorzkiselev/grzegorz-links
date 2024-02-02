import{EventDispatcher as me,MOUSE as l,Quaternion as de,Spherical as be,TOUCH as h,Vector2 as u,Vector3 as p}from"./three.min.js";var D=function(N,M){var m,C,V,v,H,L;M===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),M===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=N,this.domElement=M,this.enabled=!0,this.target=new p,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:l.ROTATE,MIDDLE:l.DOLLY,RIGHT:l.PAN},this.touches={ONE:h.ROTATE,TWO:h.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(K),e.update(),i=n.NONE},this.update=(m=new p,C=new de().setFromUnitVectors(N.up,new p(0,1,0)),V=C.clone().invert(),v=new p,H=new de,L=2*Math.PI,function(){var o=e.object.position;m.copy(o).sub(e.target),m.applyQuaternion(C),c.setFromVector3(m),e.autoRotate&&i===n.NONE&&z(Ee()),e.enableDamping?(c.theta+=r.theta*e.dampingFactor,c.phi+=r.phi*e.dampingFactor):(c.theta+=r.theta,c.phi+=r.phi);var a=e.minAzimuthAngle,s=e.maxAzimuthAngle;return isFinite(a)&&isFinite(s)&&(a<-Math.PI?a+=L:a>Math.PI&&(a-=L),s<-Math.PI?s+=L:s>Math.PI&&(s-=L),c.theta=a<=s?Math.max(a,Math.min(s,c.theta)):c.theta>(a+s)/2?Math.max(a,c.theta):Math.min(s,c.theta)),c.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,c.phi)),c.makeSafe(),c.radius*=R,c.radius=Math.max(e.minDistance,Math.min(e.maxDistance,c.radius)),e.enableDamping===!0?e.target.addScaledVector(g,e.dampingFactor):e.target.add(g),m.setFromSpherical(c),m.applyQuaternion(V),o.copy(e.target).add(m),e.object.lookAt(e.target),e.enableDamping===!0?(r.theta*=1-e.dampingFactor,r.phi*=1-e.dampingFactor,g.multiplyScalar(1-e.dampingFactor)):(r.set(0,0,0),g.set(0,0,0)),R=1,!!(j||v.distanceToSquared(e.object.position)>W||8*(1-H.dot(e.object.quaternion))>W)&&(e.dispatchEvent(K),v.copy(e.object.position),H.copy(e.object.quaternion),j=!1,!0)}),this.dispose=function(){e.domElement.removeEventListener("contextmenu",pe,!1),e.domElement.removeEventListener("pointerdown",se,!1),e.domElement.removeEventListener("wheel",ce,!1),e.domElement.removeEventListener("touchstart",ue,!1),e.domElement.removeEventListener("touchend",he,!1),e.domElement.removeEventListener("touchmove",le,!1),e.domElement.ownerDocument.removeEventListener("pointermove",X,!1),e.domElement.ownerDocument.removeEventListener("pointerup",Z,!1),e.domElement.removeEventListener("keydown",re,!1)};var e=this,K={type:"change"},I={type:"start"},U={type:"end"},n={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},i=n.NONE,W=1e-6,c=new be,r=new be,R=1,g=new p,j=!1,d=new u,b=new u,T=new u,E=new u,f=new u,y=new u,O=new u,P=new u,A=new u;function Ee(){return 2*Math.PI/60/60*e.autoRotateSpeed}function S(){return Math.pow(.95,e.zoomSpeed)}function z(t){r.theta-=t}function B(t){r.phi-=t}var G=(k=new p,function(o,a){k.setFromMatrixColumn(a,0),k.multiplyScalar(-o),g.add(k)}),k,q=function(){var t=new p;return function(a,s){e.screenSpacePanning===!0?t.setFromMatrixColumn(s,1):(t.setFromMatrixColumn(s,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),g.add(t)}}(),w=function(){var t=new p;return function(a,s){var Y=e.domElement;if(e.object.isPerspectiveCamera){var je=e.object.position;t.copy(je).sub(e.target);var F=t.length();F*=Math.tan(e.object.fov/2*Math.PI/180),G(2*a*F/Y.clientHeight,e.object.matrix),q(2*s*F/Y.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(G(a*(e.object.right-e.object.left)/e.object.zoom/Y.clientWidth,e.object.matrix),q(s*(e.object.top-e.object.bottom)/e.object.zoom/Y.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function _(t){e.object.isPerspectiveCamera?R/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),j=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(t){e.object.isPerspectiveCamera?R*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),j=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function J(t){d.set(t.clientX,t.clientY)}function fe(t){O.set(t.clientX,t.clientY)}function $(t){E.set(t.clientX,t.clientY)}function ge(t){b.set(t.clientX,t.clientY),T.subVectors(b,d).multiplyScalar(e.rotateSpeed);var o=e.domElement;z(2*Math.PI*T.x/o.clientHeight),B(2*Math.PI*T.y/o.clientHeight),d.copy(b),e.update()}function Te(t){P.set(t.clientX,t.clientY),A.subVectors(P,O),A.y>0?_(S()):A.y<0&&Q(S()),O.copy(P),e.update()}function ye(t){f.set(t.clientX,t.clientY),y.subVectors(f,E).multiplyScalar(e.panSpeed),w(y.x,y.y),E.copy(f),e.update()}function Se(){}function Oe(t){t.deltaY<0?Q(S()):t.deltaY>0&&_(S()),e.update()}function Pe(t){var o=!1;switch(t.keyCode){case e.keys.UP:w(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:w(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:w(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:w(-e.keyPanSpeed,0),o=!0}o&&(t.preventDefault(),e.update())}function ee(t){if(t.touches.length==1)d.set(t.touches[0].pageX,t.touches[0].pageY);else{var o=.5*(t.touches[0].pageX+t.touches[1].pageX),a=.5*(t.touches[0].pageY+t.touches[1].pageY);d.set(o,a)}}function te(t){if(t.touches.length==1)E.set(t.touches[0].pageX,t.touches[0].pageY);else{var o=.5*(t.touches[0].pageX+t.touches[1].pageX),a=.5*(t.touches[0].pageY+t.touches[1].pageY);E.set(o,a)}}function oe(t){var o=t.touches[0].pageX-t.touches[1].pageX,a=t.touches[0].pageY-t.touches[1].pageY,s=Math.sqrt(o*o+a*a);O.set(0,s)}function we(t){e.enableZoom&&oe(t),e.enablePan&&te(t)}function Me(t){e.enableZoom&&oe(t),e.enableRotate&&ee(t)}function ne(t){if(t.touches.length==1)b.set(t.touches[0].pageX,t.touches[0].pageY);else{var o=.5*(t.touches[0].pageX+t.touches[1].pageX),a=.5*(t.touches[0].pageY+t.touches[1].pageY);b.set(o,a)}T.subVectors(b,d).multiplyScalar(e.rotateSpeed);var s=e.domElement;z(2*Math.PI*T.x/s.clientHeight),B(2*Math.PI*T.y/s.clientHeight),d.copy(b)}function ae(t){if(t.touches.length==1)f.set(t.touches[0].pageX,t.touches[0].pageY);else{var o=.5*(t.touches[0].pageX+t.touches[1].pageX),a=.5*(t.touches[0].pageY+t.touches[1].pageY);f.set(o,a)}y.subVectors(f,E).multiplyScalar(e.panSpeed),w(y.x,y.y),E.copy(f)}function ie(t){var o=t.touches[0].pageX-t.touches[1].pageX,a=t.touches[0].pageY-t.touches[1].pageY,s=Math.sqrt(o*o+a*a);P.set(0,s),A.set(0,Math.pow(P.y/O.y,e.zoomSpeed)),_(A.y),O.copy(P)}function Le(t){e.enableZoom&&ie(t),e.enablePan&&ae(t)}function Ae(t){e.enableZoom&&ie(t),e.enableRotate&&ne(t)}function ke(){}function se(t){if(e.enabled!==!1)switch(t.pointerType){case"mouse":case"pen":De(t)}}function X(t){if(e.enabled!==!1)switch(t.pointerType){case"mouse":case"pen":Ne(t)}}function Z(t){switch(t.pointerType){case"mouse":case"pen":Re(t)}}function De(t){var o;switch(t.preventDefault(),e.domElement.focus?e.domElement.focus():window.focus(),t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case l.DOLLY:if(e.enableZoom===!1)return;fe(t),i=n.DOLLY;break;case l.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;$(t),i=n.PAN}else{if(e.enableRotate===!1)return;J(t),i=n.ROTATE}break;case l.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;J(t),i=n.ROTATE}else{if(e.enablePan===!1)return;$(t),i=n.PAN}break;default:i=n.NONE}i!==n.NONE&&(e.domElement.ownerDocument.addEventListener("pointermove",X,!1),e.domElement.ownerDocument.addEventListener("pointerup",Z,!1),e.dispatchEvent(I))}function Ne(t){if(e.enabled!==!1)switch(t.preventDefault(),i){case n.ROTATE:if(e.enableRotate===!1)return;ge(t);break;case n.DOLLY:if(e.enableZoom===!1)return;Te(t);break;case n.PAN:if(e.enablePan===!1)return;ye(t)}}function Re(t){e.domElement.ownerDocument.removeEventListener("pointermove",X,!1),e.domElement.ownerDocument.removeEventListener("pointerup",Z,!1),e.enabled!==!1&&(e.dispatchEvent(U),i=n.NONE)}function ce(t){e.enabled===!1||e.enableZoom===!1||i!==n.NONE&&i!==n.ROTATE||(t.preventDefault(),t.stopPropagation(),e.dispatchEvent(I),Oe(t),e.dispatchEvent(U))}function re(t){e.enabled!==!1&&e.enableKeys!==!1&&e.enablePan!==!1&&Pe(t)}function ue(t){if(e.enabled!==!1){switch(t.preventDefault(),t.touches.length){case 1:switch(e.touches.ONE){case h.ROTATE:if(e.enableRotate===!1)return;ee(t),i=n.TOUCH_ROTATE;break;case h.PAN:if(e.enablePan===!1)return;te(t),i=n.TOUCH_PAN;break;default:i=n.NONE}break;case 2:switch(e.touches.TWO){case h.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;we(t),i=n.TOUCH_DOLLY_PAN;break;case h.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Me(t),i=n.TOUCH_DOLLY_ROTATE;break;default:i=n.NONE}break;default:i=n.NONE}i!==n.NONE&&e.dispatchEvent(I)}}function le(t){if(e.enabled!==!1)switch(t.preventDefault(),t.stopPropagation(),i){case n.TOUCH_ROTATE:if(e.enableRotate===!1)return;ne(t),e.update();break;case n.TOUCH_PAN:if(e.enablePan===!1)return;ae(t),e.update();break;case n.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Le(t),e.update();break;case n.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ae(t),e.update();break;default:i=n.NONE}}function he(t){e.enabled!==!1&&(e.dispatchEvent(U),i=n.NONE)}function pe(t){e.enabled!==!1&&t.preventDefault()}e.domElement.addEventListener("contextmenu",pe,!1),e.domElement.addEventListener("pointerdown",se,!1),e.domElement.addEventListener("wheel",ce,!1),e.domElement.addEventListener("touchstart",ue,!1),e.domElement.addEventListener("touchend",he,!1),e.domElement.addEventListener("touchmove",le,!1),e.domElement.addEventListener("keydown",re,!1),this.update()};D.prototype=Object.create(me.prototype),D.prototype.constructor=D;var x=function(N,M){D.call(this,N,M),this.screenSpacePanning=!1,this.mouseButtons.LEFT=l.PAN,this.mouseButtons.RIGHT=l.ROTATE,this.touches.ONE=h.PAN,this.touches.TWO=h.DOLLY_ROTATE};x.prototype=Object.create(me.prototype),x.prototype.constructor=x;export{D as OrbitControls,x as MapControls};