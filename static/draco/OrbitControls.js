import{EventDispatcher,MOUSE,Quaternion,Spherical,TOUCH,Vector2,Vector3}from"./three.min.js";var OrbitControls=function(object,domElement){var offset,quat,quatInverse,lastPosition,lastQuaternion,twoPI;void 0===domElement&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),domElement===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=object,this.domElement=domElement,this.enabled=!0,this.target=new Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:MOUSE.ROTATE,MIDDLE:MOUSE.DOLLY,RIGHT:MOUSE.PAN},this.touches={ONE:TOUCH.ROTATE,TWO:TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return spherical.phi},this.getAzimuthalAngle=function(){return spherical.theta},this.saveState=function(){scope.target0.copy(scope.target),scope.position0.copy(scope.object.position),scope.zoom0=scope.object.zoom},this.reset=function(){scope.target.copy(scope.target0),scope.object.position.copy(scope.position0),scope.object.zoom=scope.zoom0,scope.object.updateProjectionMatrix(),scope.dispatchEvent(changeEvent),scope.update(),state=STATE.NONE},this.update=(offset=new Vector3,quat=(new Quaternion).setFromUnitVectors(object.up,new Vector3(0,1,0)),quatInverse=quat.clone().invert(),lastPosition=new Vector3,lastQuaternion=new Quaternion,twoPI=2*Math.PI,function update(){var position=scope.object.position;offset.copy(position).sub(scope.target),offset.applyQuaternion(quat),spherical.setFromVector3(offset),scope.autoRotate&&state===STATE.NONE&&rotateLeft(getAutoRotationAngle()),scope.enableDamping?(spherical.theta+=sphericalDelta.theta*scope.dampingFactor,spherical.phi+=sphericalDelta.phi*scope.dampingFactor):(spherical.theta+=sphericalDelta.theta,spherical.phi+=sphericalDelta.phi);var min=scope.minAzimuthAngle,max=scope.maxAzimuthAngle;return isFinite(min)&&isFinite(max)&&(min<-Math.PI?min+=twoPI:min>Math.PI&&(min-=twoPI),max<-Math.PI?max+=twoPI:max>Math.PI&&(max-=twoPI),spherical.theta=min<=max?Math.max(min,Math.min(max,spherical.theta)):spherical.theta>(min+max)/2?Math.max(min,spherical.theta):Math.min(max,spherical.theta)),spherical.phi=Math.max(scope.minPolarAngle,Math.min(scope.maxPolarAngle,spherical.phi)),spherical.makeSafe(),spherical.radius*=scale,spherical.radius=Math.max(scope.minDistance,Math.min(scope.maxDistance,spherical.radius)),!0===scope.enableDamping?scope.target.addScaledVector(panOffset,scope.dampingFactor):scope.target.add(panOffset),offset.setFromSpherical(spherical),offset.applyQuaternion(quatInverse),position.copy(scope.target).add(offset),scope.object.lookAt(scope.target),!0===scope.enableDamping?(sphericalDelta.theta*=1-scope.dampingFactor,sphericalDelta.phi*=1-scope.dampingFactor,panOffset.multiplyScalar(1-scope.dampingFactor)):(sphericalDelta.set(0,0,0),panOffset.set(0,0,0)),scale=1,!!(zoomChanged||lastPosition.distanceToSquared(scope.object.position)>EPS||8*(1-lastQuaternion.dot(scope.object.quaternion))>EPS)&&(scope.dispatchEvent(changeEvent),lastPosition.copy(scope.object.position),lastQuaternion.copy(scope.object.quaternion),zoomChanged=!1,!0)}),this.dispose=function(){scope.domElement.removeEventListener("contextmenu",onContextMenu,!1),scope.domElement.removeEventListener("pointerdown",onPointerDown,!1),scope.domElement.removeEventListener("wheel",onMouseWheel,!1),scope.domElement.removeEventListener("touchstart",onTouchStart,!1),scope.domElement.removeEventListener("touchend",onTouchEnd,!1),scope.domElement.removeEventListener("touchmove",onTouchMove,!1),scope.domElement.ownerDocument.removeEventListener("pointermove",onPointerMove,!1),scope.domElement.ownerDocument.removeEventListener("pointerup",onPointerUp,!1),scope.domElement.removeEventListener("keydown",onKeyDown,!1)};var scope=this,changeEvent={type:"change"},startEvent={type:"start"},endEvent={type:"end"},STATE={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},state=STATE.NONE,EPS=1e-6,spherical=new Spherical,sphericalDelta=new Spherical,scale=1,panOffset=new Vector3,zoomChanged=!1,rotateStart=new Vector2,rotateEnd=new Vector2,rotateDelta=new Vector2,panStart=new Vector2,panEnd=new Vector2,panDelta=new Vector2,dollyStart=new Vector2,dollyEnd=new Vector2,dollyDelta=new Vector2;function getAutoRotationAngle(){return 2*Math.PI/60/60*scope.autoRotateSpeed}function getZoomScale(){return Math.pow(.95,scope.zoomSpeed)}function rotateLeft(angle){sphericalDelta.theta-=angle}function rotateUp(angle){sphericalDelta.phi-=angle}var panLeft=(v=new Vector3,function panLeft(distance,objectMatrix){v.setFromMatrixColumn(objectMatrix,0),v.multiplyScalar(-distance),panOffset.add(v)}),v,panUp=function(){var v=new Vector3;return function panUp(distance,objectMatrix){!0===scope.screenSpacePanning?v.setFromMatrixColumn(objectMatrix,1):(v.setFromMatrixColumn(objectMatrix,0),v.crossVectors(scope.object.up,v)),v.multiplyScalar(distance),panOffset.add(v)}}(),pan=function(){var offset=new Vector3;return function pan(deltaX,deltaY){var element=scope.domElement;if(scope.object.isPerspectiveCamera){var position=scope.object.position;offset.copy(position).sub(scope.target);var targetDistance=offset.length();targetDistance*=Math.tan(scope.object.fov/2*Math.PI/180),panLeft(2*deltaX*targetDistance/element.clientHeight,scope.object.matrix),panUp(2*deltaY*targetDistance/element.clientHeight,scope.object.matrix)}else scope.object.isOrthographicCamera?(panLeft(deltaX*(scope.object.right-scope.object.left)/scope.object.zoom/element.clientWidth,scope.object.matrix),panUp(deltaY*(scope.object.top-scope.object.bottom)/scope.object.zoom/element.clientHeight,scope.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),scope.enablePan=!1)}}();function dollyOut(dollyScale){scope.object.isPerspectiveCamera?scale/=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom*dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function dollyIn(dollyScale){scope.object.isPerspectiveCamera?scale*=dollyScale:scope.object.isOrthographicCamera?(scope.object.zoom=Math.max(scope.minZoom,Math.min(scope.maxZoom,scope.object.zoom/dollyScale)),scope.object.updateProjectionMatrix(),zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),scope.enableZoom=!1)}function handleMouseDownRotate(event){rotateStart.set(event.clientX,event.clientY)}function handleMouseDownDolly(event){dollyStart.set(event.clientX,event.clientY)}function handleMouseDownPan(event){panStart.set(event.clientX,event.clientY)}function handleMouseMoveRotate(event){rotateEnd.set(event.clientX,event.clientY),rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd),scope.update()}function handleMouseMoveDolly(event){dollyEnd.set(event.clientX,event.clientY),dollyDelta.subVectors(dollyEnd,dollyStart),dollyDelta.y>0?dollyOut(getZoomScale()):dollyDelta.y<0&&dollyIn(getZoomScale()),dollyStart.copy(dollyEnd),scope.update()}function handleMouseMovePan(event){panEnd.set(event.clientX,event.clientY),panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd),scope.update()}function handleMouseUp(){}function handleMouseWheel(event){event.deltaY<0?dollyIn(getZoomScale()):event.deltaY>0&&dollyOut(getZoomScale()),scope.update()}function handleKeyDown(event){var needsUpdate=!1;switch(event.keyCode){case scope.keys.UP:pan(0,scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.BOTTOM:pan(0,-scope.keyPanSpeed),needsUpdate=!0;break;case scope.keys.LEFT:pan(scope.keyPanSpeed,0),needsUpdate=!0;break;case scope.keys.RIGHT:pan(-scope.keyPanSpeed,0),needsUpdate=!0}needsUpdate&&(event.preventDefault(),scope.update())}function handleTouchStartRotate(event){if(1==event.touches.length)rotateStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateStart.set(x,y)}}function handleTouchStartPan(event){if(1==event.touches.length)panStart.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panStart.set(x,y)}}function handleTouchStartDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyStart.set(0,distance)}function handleTouchStartDollyPan(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enablePan&&handleTouchStartPan(event)}function handleTouchStartDollyRotate(event){scope.enableZoom&&handleTouchStartDolly(event),scope.enableRotate&&handleTouchStartRotate(event)}function handleTouchMoveRotate(event){if(1==event.touches.length)rotateEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);rotateEnd.set(x,y)}rotateDelta.subVectors(rotateEnd,rotateStart).multiplyScalar(scope.rotateSpeed);var element=scope.domElement;rotateLeft(2*Math.PI*rotateDelta.x/element.clientHeight),rotateUp(2*Math.PI*rotateDelta.y/element.clientHeight),rotateStart.copy(rotateEnd)}function handleTouchMovePan(event){if(1==event.touches.length)panEnd.set(event.touches[0].pageX,event.touches[0].pageY);else{var x=.5*(event.touches[0].pageX+event.touches[1].pageX),y=.5*(event.touches[0].pageY+event.touches[1].pageY);panEnd.set(x,y)}panDelta.subVectors(panEnd,panStart).multiplyScalar(scope.panSpeed),pan(panDelta.x,panDelta.y),panStart.copy(panEnd)}function handleTouchMoveDolly(event){var dx=event.touches[0].pageX-event.touches[1].pageX,dy=event.touches[0].pageY-event.touches[1].pageY,distance=Math.sqrt(dx*dx+dy*dy);dollyEnd.set(0,distance),dollyDelta.set(0,Math.pow(dollyEnd.y/dollyStart.y,scope.zoomSpeed)),dollyOut(dollyDelta.y),dollyStart.copy(dollyEnd)}function handleTouchMoveDollyPan(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enablePan&&handleTouchMovePan(event)}function handleTouchMoveDollyRotate(event){scope.enableZoom&&handleTouchMoveDolly(event),scope.enableRotate&&handleTouchMoveRotate(event)}function handleTouchEnd(){}function onPointerDown(event){if(!1!==scope.enabled)switch(event.pointerType){case"mouse":case"pen":onMouseDown(event)}}function onPointerMove(event){if(!1!==scope.enabled)switch(event.pointerType){case"mouse":case"pen":onMouseMove(event)}}function onPointerUp(event){switch(event.pointerType){case"mouse":case"pen":onMouseUp(event)}}function onMouseDown(event){var mouseAction;switch(event.preventDefault(),scope.domElement.focus?scope.domElement.focus():window.focus(),event.button){case 0:mouseAction=scope.mouseButtons.LEFT;break;case 1:mouseAction=scope.mouseButtons.MIDDLE;break;case 2:mouseAction=scope.mouseButtons.RIGHT;break;default:mouseAction=-1}switch(mouseAction){case MOUSE.DOLLY:if(!1===scope.enableZoom)return;handleMouseDownDolly(event),state=STATE.DOLLY;break;case MOUSE.ROTATE:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}else{if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}break;case MOUSE.PAN:if(event.ctrlKey||event.metaKey||event.shiftKey){if(!1===scope.enableRotate)return;handleMouseDownRotate(event),state=STATE.ROTATE}else{if(!1===scope.enablePan)return;handleMouseDownPan(event),state=STATE.PAN}break;default:state=STATE.NONE}state!==STATE.NONE&&(scope.domElement.ownerDocument.addEventListener("pointermove",onPointerMove,!1),scope.domElement.ownerDocument.addEventListener("pointerup",onPointerUp,!1),scope.dispatchEvent(startEvent))}function onMouseMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),state){case STATE.ROTATE:if(!1===scope.enableRotate)return;handleMouseMoveRotate(event);break;case STATE.DOLLY:if(!1===scope.enableZoom)return;handleMouseMoveDolly(event);break;case STATE.PAN:if(!1===scope.enablePan)return;handleMouseMovePan(event)}}function onMouseUp(event){scope.domElement.ownerDocument.removeEventListener("pointermove",onPointerMove,!1),scope.domElement.ownerDocument.removeEventListener("pointerup",onPointerUp,!1),!1!==scope.enabled&&(scope.dispatchEvent(endEvent),state=STATE.NONE)}function onMouseWheel(event){!1===scope.enabled||!1===scope.enableZoom||state!==STATE.NONE&&state!==STATE.ROTATE||(event.preventDefault(),event.stopPropagation(),scope.dispatchEvent(startEvent),handleMouseWheel(event),scope.dispatchEvent(endEvent))}function onKeyDown(event){!1!==scope.enabled&&!1!==scope.enableKeys&&!1!==scope.enablePan&&handleKeyDown(event)}function onTouchStart(event){if(!1!==scope.enabled){switch(event.preventDefault(),event.touches.length){case 1:switch(scope.touches.ONE){case TOUCH.ROTATE:if(!1===scope.enableRotate)return;handleTouchStartRotate(event),state=STATE.TOUCH_ROTATE;break;case TOUCH.PAN:if(!1===scope.enablePan)return;handleTouchStartPan(event),state=STATE.TOUCH_PAN;break;default:state=STATE.NONE}break;case 2:switch(scope.touches.TWO){case TOUCH.DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;handleTouchStartDollyPan(event),state=STATE.TOUCH_DOLLY_PAN;break;case TOUCH.DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;handleTouchStartDollyRotate(event),state=STATE.TOUCH_DOLLY_ROTATE;break;default:state=STATE.NONE}break;default:state=STATE.NONE}state!==STATE.NONE&&scope.dispatchEvent(startEvent)}}function onTouchMove(event){if(!1!==scope.enabled)switch(event.preventDefault(),event.stopPropagation(),state){case STATE.TOUCH_ROTATE:if(!1===scope.enableRotate)return;handleTouchMoveRotate(event),scope.update();break;case STATE.TOUCH_PAN:if(!1===scope.enablePan)return;handleTouchMovePan(event),scope.update();break;case STATE.TOUCH_DOLLY_PAN:if(!1===scope.enableZoom&&!1===scope.enablePan)return;handleTouchMoveDollyPan(event),scope.update();break;case STATE.TOUCH_DOLLY_ROTATE:if(!1===scope.enableZoom&&!1===scope.enableRotate)return;handleTouchMoveDollyRotate(event),scope.update();break;default:state=STATE.NONE}}function onTouchEnd(event){!1!==scope.enabled&&(scope.dispatchEvent(endEvent),state=STATE.NONE)}function onContextMenu(event){!1!==scope.enabled&&event.preventDefault()}scope.domElement.addEventListener("contextmenu",onContextMenu,!1),scope.domElement.addEventListener("pointerdown",onPointerDown,!1),scope.domElement.addEventListener("wheel",onMouseWheel,!1),scope.domElement.addEventListener("touchstart",onTouchStart,!1),scope.domElement.addEventListener("touchend",onTouchEnd,!1),scope.domElement.addEventListener("touchmove",onTouchMove,!1),scope.domElement.addEventListener("keydown",onKeyDown,!1),this.update()};OrbitControls.prototype=Object.create(EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls;var MapControls=function(object,domElement){OrbitControls.call(this,object,domElement),this.screenSpacePanning=!1,this.mouseButtons.LEFT=MOUSE.PAN,this.mouseButtons.RIGHT=MOUSE.ROTATE,this.touches.ONE=TOUCH.PAN,this.touches.TWO=TOUCH.DOLLY_ROTATE};MapControls.prototype=Object.create(EventDispatcher.prototype),MapControls.prototype.constructor=MapControls;export{OrbitControls,MapControls};