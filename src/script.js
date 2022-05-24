import './style.css'
import './cubes.js'
import './flowers.js'

var transitionEasingCubic = [0.645, 0.045, 0.355, 1];
var transitionEasingQuart = [0.77, 0, 0.175, 1];
var transitionEasingQuint = [0.86, 0, 0.07, 1];
var transitionEasingCustom0 = [0.85, 0, 0.1, 1];

var testIntroY = '-48px';

var isMobile = false;

// Are we mobile...

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

document.addEventListener("DOMContentLoaded", function(event){

	var main = document.getElementById("main-container");

	var resizeContainer = document.getElementById("resize-container");
	var resizeText = document.getElementById("resize-text");
	var resizeValue = document.getElementById("resize-value");
	//var resizeValueMobile = document.getElementById("resize-value-mobile");

	currentPage = main.dataset.page;

	var timeout = null;

	windowResizeFunction = function(){

		clearTimeout(timeout);
		timeout = setTimeout(windowResizeStopFunction, 600);

		var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		// resizeValue.innerHTML = screenWidth +' &mdash; '+screenHeight;
		resizeValue.innerHTML = Math.round((screenWidth / screenHeight) * 1000) / 1000;
	}

	window.addEventListener('load', function(event){
			windowResizeFunction();
	});

	window.addEventListener('resize', function(event){
			windowResizeFunction();
	});

	windowResizeStopFunction = function(){
		resizeContainer.classList.remove("show");
	}

	// var doc = window.document,
	// 	context = doc.querySelector('.js-loop'),
	// 	disableScroll = false,
	// 	scrollHeight = 0,
	// 	scrollPos = 0,
	// 	clonesHeight = 0,
	// 	i = 0;
});