
import "./styles/style.css"

import "./three/me.js"
import "./three/cubes.js"
import "./three/flowers.js"

import LocomotiveScroll from 'locomotive-scroll';

import Menu from './hover/menu.js';

let isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

// menu (<nav> element)
const menuEl = document.querySelector('.menu');
if(!isMobile) {
	new Menu(menuEl);
}

var transitionEasingCubic = [0.645, 0.045, 0.355, 1];
var transitionEasingQuart = [0.77, 0, 0.175, 1];
var transitionEasingQuint = [0.86, 0, 0.07, 1];
var transitionEasingCustom0 = [0.85, 0, 0.1, 1];

var testIntroY = '-48px';

// Are we mobile...

var main = document.getElementById("main-container");

	var resizeContainer = document.getElementById("resize-container");
	var resizeText = document.getElementById("resize-text");
	var resizeValue = document.getElementById("resize-value");
	var resizeValueMobile = document.getElementById("resize-value-mobile");
	
document.addEventListener("DOMContentLoaded", function (event) {

	// currentPage = main.dataset.page;

	var timeout = null;

	const windowResizeFunction = function () {
		
	clearTimeout(timeout);
	timeout = setTimeout(windowResizeStopFunction, 600);

	var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	resizeValue.innerHTML = screenWidth + ' &mdash; ' + screenHeight;
	resizeValue.innerHTML = Math.round((screenWidth / screenHeight) * 1000) / 1000;
	};
	
	window.addEventListener('load', function (event) {
			windowResizeFunction();
	});

	window.addEventListener('resize', function(event){
			windowResizeFunction();
	});

	const windowResizeStopFunction = function(){
		resizeContainer.classList.remove("show");
	}

	var doc = window.document,
		context = doc.querySelector('.js-loop'),
		disableScroll = false,
		scrollHeight = 0,
		scrollPos = 0,
		clonesHeight = 0,
		i = 0;

}, false);
