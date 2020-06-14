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

	var html = document.documentElement;
	var body = document.body;
	var main = document.getElementById("main-container");
	var menuContainer = document.getElementById("menu-container");
	var menuRightContainer = document.getElementById("menu-right-container");
	var scrollbarHider = document.getElementById("scrollbar-hider");
	var menuTextContainer = document.getElementById("menu-text-container");
	var footerLink = document.getElementById("footer-link");
	var menuIcon = document.getElementById("menu-icon-container");
	var menuIconRight = document.getElementById("menu-icon-container-right");
	var downArrow = document.getElementById("intro-down-arrow");
	var upArrow = document.getElementById("footer-up-arrow");
	var menuIconDot = document.getElementById("menu-icon");
	var footer = document.getElementById("footer");
	var content = document.getElementById("content");
	var loadingContainer = document.getElementById("loading-container");
	var loadingText = document.getElementById("loading-text");
	var introText = document.getElementById("intro-text");
	var menuBlock0 = document.getElementById("menu-block-0");
	var menuBlock1 = document.getElementById("menu-block-1");
	var menuBlock2 = document.getElementById("menu-block-2");
	var menuBlock3 = document.getElementById("menu-block-3");
	var menuItem = document.getElementsByClassName("menu-text-line");

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
		resizeValue.innerHTML = Math.round((screenWidth / screenHeight)*1000)/1000	;

	}

	windowResizeStopFunction = function(){

		
		resizeContainer.classList.remove("show");


	}

	window.addEventListener('resize', function(event){
  		
  		if(!isMobile){
  			windowResizeFunction();
  		}

  	});

	menuBuildFunction();

	var doc = window.document,
		context = doc.querySelector('.js-loop'),
		clones = context.querySelectorAll('.is-clone'),
		disableScroll = false,
		scrollHeight = 0,
		scrollPos = 0,
		clonesHeight = 0,
		i = 0;

});