// import Menu from "./hover/menu.js";
import "./styles/style.css"

import("./three/me.js")

let isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
    document.querySelector(".preloader").remove()
}

import("./three/cubes.js")
import("./three/flowers.js")


var resizeContainer = document.getElementById("resize-container");
var resizeValue = document.getElementById("resize-value");
    
document.addEventListener("DOMContentLoaded", function (event) {
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
});

if (!isMobile) {
    import("./hover/menu.js").then(({ default: Menu }) => { new Menu(menuEl) });
    import("./preloader/preloader.js")
}

const menuEl = document.querySelector('.links');