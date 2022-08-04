import{EventDispatcher,MOUSE,Quaternion,Spherical,TOUCH,Vector2,Vector3}from"./three.min.js";var OrbitControls=function(e,t){var o,n,a,i,r,c;void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.enabled=!0,this.target=new Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:MOUSE.ROTATE,MIDDLE:MOUSE.DOLLY,RIGHT:MOUSE.PAN},this.touches={ONE:TOUCH.ROTATE,TWO:TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return b.phi},this.getAzimuthalAngle=function(){return b.theta},this.saveState=function(){s.target0.copy(s.target),s.position0.copy(s.object.position),s.zoom0=s.object.zoom},this.reset=function(){s.target.copy(s.target0),s.object.position.copy(s.position0),s.object.zoom=s.zoom0,s.object.updateProjectionMatrix(),s.dispatchEvent(u),s.update(),h=p.NONE},this.update=(o=new Vector3,n=(new Quaternion).setFromUnitVectors(e.up,new Vector3(0,1,0)),a=n.clone().invert(),i=new Vector3,r=new Quaternion,c=2*Math.PI,function(){var e=s.object.position;o.copy(e).sub(s.target),o.applyQuaternion(n),b.setFromVector3(o),s.autoRotate&&h===p.NONE&&C(2*Math.PI/60/60*s.autoRotateSpeed),s.enableDamping?(b.theta+=E.theta*s.dampingFactor,b.phi+=E.phi*s.dampingFactor):(b.theta+=E.theta,b.phi+=E.phi);var t=s.minAzimuthAngle,l=s.maxAzimuthAngle;return isFinite(t)&&isFinite(l)&&(t<-Math.PI?t+=c:t>Math.PI&&(t-=c),l<-Math.PI?l+=c:l>Math.PI&&(l-=c),b.theta=t<=l?Math.max(t,Math.min(l,b.theta)):b.theta>(t+l)/2?Math.max(t,b.theta):Math.min(l,b.theta)),b.phi=Math.max(s.minPolarAngle,Math.min(s.maxPolarAngle,b.phi)),b.makeSafe(),b.radius*=O,b.radius=Math.max(s.minDistance,Math.min(s.maxDistance,b.radius)),!0===s.enableDamping?s.target.addScaledVector(f,s.dampingFactor):s.target.add(f),o.setFromSpherical(b),o.applyQuaternion(a),e.copy(s.target).add(o),s.object.lookAt(s.target),!0===s.enableDamping?(E.theta*=1-s.dampingFactor,E.phi*=1-s.dampingFactor,f.multiplyScalar(1-s.dampingFactor)):(E.set(0,0,0),f.set(0,0,0)),O=1,!!(g||i.distanceToSquared(s.object.position)>d||8*(1-r.dot(s.object.quaternion))>d)&&(s.dispatchEvent(u),i.copy(s.object.position),r.copy(s.object.quaternion),g=!1,!0)}),this.dispose=function(){s.domElement.removeEventListener("contextmenu",ee,!1),s.domElement.removeEventListener("pointerdown",B,!1),s.domElement.removeEventListener("wheel",W,!1),s.domElement.removeEventListener("touchstart",Q,!1),s.domElement.removeEventListener("touchend",$,!1),s.domElement.removeEventListener("touchmove",J,!1),s.domElement.ownerDocument.removeEventListener("pointermove",G,!1),s.domElement.ownerDocument.removeEventListener("pointerup",K,!1),s.domElement.removeEventListener("keydown",q,!1)};var s=this,u={type:"change"},l={type:"start"},m={type:"end"},p={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},h=p.NONE,d=1e-6,b=new Spherical,E=new Spherical,O=1,f=new Vector3,g=!1,v=new Vector2,T=new Vector2,y=new Vector2,P=new Vector2,L=new Vector2,w=new Vector2,A=new Vector2,N=new Vector2,M=new Vector2;function j(){return Math.pow(.95,s.zoomSpeed)}function C(e){E.theta-=e}function D(e){E.phi-=e}var S,R=(S=new Vector3,function(e,t){S.setFromMatrixColumn(t,0),S.multiplyScalar(-e),f.add(S)}),k=function(){var e=new Vector3;return function(t,o){!0===s.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(s.object.up,e)),e.multiplyScalar(t),f.add(e)}}(),Y=function(){var e=new Vector3;return function(t,o){var n=s.domElement;if(s.object.isPerspectiveCamera){var a=s.object.position;e.copy(a).sub(s.target);var i=e.length();i*=Math.tan(s.object.fov/2*Math.PI/180),R(2*t*i/n.clientHeight,s.object.matrix),k(2*o*i/n.clientHeight,s.object.matrix)}else s.object.isOrthographicCamera?(R(t*(s.object.right-s.object.left)/s.object.zoom/n.clientWidth,s.object.matrix),k(o*(s.object.top-s.object.bottom)/s.object.zoom/n.clientHeight,s.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),s.enablePan=!1)}}();function H(e){s.object.isPerspectiveCamera?O/=e:s.object.isOrthographicCamera?(s.object.zoom=Math.max(s.minZoom,Math.min(s.maxZoom,s.object.zoom*e)),s.object.updateProjectionMatrix(),g=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),s.enableZoom=!1)}function U(e){s.object.isPerspectiveCamera?O*=e:s.object.isOrthographicCamera?(s.object.zoom=Math.max(s.minZoom,Math.min(s.maxZoom,s.object.zoom/e)),s.object.updateProjectionMatrix(),g=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),s.enableZoom=!1)}function x(e){v.set(e.clientX,e.clientY)}function V(e){P.set(e.clientX,e.clientY)}function z(e){if(1==e.touches.length)v.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);v.set(t,o)}}function I(e){if(1==e.touches.length)P.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);P.set(t,o)}}function X(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,n=Math.sqrt(t*t+o*o);A.set(0,n)}function _(e){if(1==e.touches.length)T.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);T.set(t,o)}y.subVectors(T,v).multiplyScalar(s.rotateSpeed);var n=s.domElement;C(2*Math.PI*y.x/n.clientHeight),D(2*Math.PI*y.y/n.clientHeight),v.copy(T)}function F(e){if(1==e.touches.length)L.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);L.set(t,o)}w.subVectors(L,P).multiplyScalar(s.panSpeed),Y(w.x,w.y),P.copy(L)}function Z(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,n=Math.sqrt(t*t+o*o);N.set(0,n),M.set(0,Math.pow(N.y/A.y,s.zoomSpeed)),H(M.y),A.copy(N)}function B(e){if(!1!==s.enabled)switch(e.pointerType){case"mouse":case"pen":!function(e){var t;switch(e.preventDefault(),s.domElement.focus?s.domElement.focus():window.focus(),e.button){case 0:t=s.mouseButtons.LEFT;break;case 1:t=s.mouseButtons.MIDDLE;break;case 2:t=s.mouseButtons.RIGHT;break;default:t=-1}switch(t){case MOUSE.DOLLY:if(!1===s.enableZoom)return;(function(e){A.set(e.clientX,e.clientY)})(e),h=p.DOLLY;break;case MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===s.enablePan)return;V(e),h=p.PAN}else{if(!1===s.enableRotate)return;x(e),h=p.ROTATE}break;case MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===s.enableRotate)return;x(e),h=p.ROTATE}else{if(!1===s.enablePan)return;V(e),h=p.PAN}break;default:h=p.NONE}h!==p.NONE&&(s.domElement.ownerDocument.addEventListener("pointermove",G,!1),s.domElement.ownerDocument.addEventListener("pointerup",K,!1),s.dispatchEvent(l))}(e)}}function G(e){if(!1!==s.enabled)switch(e.pointerType){case"mouse":case"pen":!function(e){if(!1!==s.enabled)switch(e.preventDefault(),h){case p.ROTATE:if(!1===s.enableRotate)return;!function(e){T.set(e.clientX,e.clientY),y.subVectors(T,v).multiplyScalar(s.rotateSpeed);var t=s.domElement;C(2*Math.PI*y.x/t.clientHeight),D(2*Math.PI*y.y/t.clientHeight),v.copy(T),s.update()}(e);break;case p.DOLLY:if(!1===s.enableZoom)return;!function(e){N.set(e.clientX,e.clientY),M.subVectors(N,A),M.y>0?H(j()):M.y<0&&U(j()),A.copy(N),s.update()}(e);break;case p.PAN:if(!1===s.enablePan)return;!function(e){L.set(e.clientX,e.clientY),w.subVectors(L,P).multiplyScalar(s.panSpeed),Y(w.x,w.y),P.copy(L),s.update()}(e)}}(e)}}function K(e){switch(e.pointerType){case"mouse":case"pen":s.domElement.ownerDocument.removeEventListener("pointermove",G,!1),s.domElement.ownerDocument.removeEventListener("pointerup",K,!1),!1!==s.enabled&&(s.dispatchEvent(m),h=p.NONE)}}function W(e){!1===s.enabled||!1===s.enableZoom||h!==p.NONE&&h!==p.ROTATE||(e.preventDefault(),e.stopPropagation(),s.dispatchEvent(l),function(e){e.deltaY<0?U(j()):e.deltaY>0&&H(j()),s.update()}(e),s.dispatchEvent(m))}function q(e){!1!==s.enabled&&!1!==s.enableKeys&&!1!==s.enablePan&&function(e){var t=!1;switch(e.keyCode){case s.keys.UP:Y(0,s.keyPanSpeed),t=!0;break;case s.keys.BOTTOM:Y(0,-s.keyPanSpeed),t=!0;break;case s.keys.LEFT:Y(s.keyPanSpeed,0),t=!0;break;case s.keys.RIGHT:Y(-s.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),s.update())}(e)}function Q(e){if(!1!==s.enabled){switch(e.preventDefault(),e.touches.length){case 1:switch(s.touches.ONE){case TOUCH.ROTATE:if(!1===s.enableRotate)return;z(e),h=p.TOUCH_ROTATE;break;case TOUCH.PAN:if(!1===s.enablePan)return;I(e),h=p.TOUCH_PAN;break;default:h=p.NONE}break;case 2:switch(s.touches.TWO){case TOUCH.DOLLY_PAN:if(!1===s.enableZoom&&!1===s.enablePan)return;(function(e){s.enableZoom&&X(e),s.enablePan&&I(e)})(e),h=p.TOUCH_DOLLY_PAN;break;case TOUCH.DOLLY_ROTATE:if(!1===s.enableZoom&&!1===s.enableRotate)return;(function(e){s.enableZoom&&X(e),s.enableRotate&&z(e)})(e),h=p.TOUCH_DOLLY_ROTATE;break;default:h=p.NONE}break;default:h=p.NONE}h!==p.NONE&&s.dispatchEvent(l)}}function J(e){if(!1!==s.enabled)switch(e.preventDefault(),e.stopPropagation(),h){case p.TOUCH_ROTATE:if(!1===s.enableRotate)return;_(e),s.update();break;case p.TOUCH_PAN:if(!1===s.enablePan)return;F(e),s.update();break;case p.TOUCH_DOLLY_PAN:if(!1===s.enableZoom&&!1===s.enablePan)return;(function(e){s.enableZoom&&Z(e),s.enablePan&&F(e)})(e),s.update();break;case p.TOUCH_DOLLY_ROTATE:if(!1===s.enableZoom&&!1===s.enableRotate)return;(function(e){s.enableZoom&&Z(e),s.enableRotate&&_(e)})(e),s.update();break;default:h=p.NONE}}function $(e){!1!==s.enabled&&(s.dispatchEvent(m),h=p.NONE)}function ee(e){!1!==s.enabled&&e.preventDefault()}s.domElement.addEventListener("contextmenu",ee,!1),s.domElement.addEventListener("pointerdown",B,!1),s.domElement.addEventListener("wheel",W,!1),s.domElement.addEventListener("touchstart",Q,!1),s.domElement.addEventListener("touchend",$,!1),s.domElement.addEventListener("touchmove",J,!1),s.domElement.addEventListener("keydown",q,!1),this.update()};OrbitControls.prototype=Object.create(EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls;var MapControls=function(e,t){OrbitControls.call(this,e,t),this.screenSpacePanning=!1,this.mouseButtons.LEFT=MOUSE.PAN,this.mouseButtons.RIGHT=MOUSE.ROTATE,this.touches.ONE=TOUCH.PAN,this.touches.TWO=TOUCH.DOLLY_ROTATE};MapControls.prototype=Object.create(EventDispatcher.prototype),MapControls.prototype.constructor=MapControls;export{OrbitControls,MapControls};