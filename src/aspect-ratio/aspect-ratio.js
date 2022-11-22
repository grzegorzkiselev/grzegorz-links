const resizeContainer = document.getElementById("resize-container");
const resizeValue = document.getElementById("resize-value");

let timeout = null;
const windowResizeFunction = function () {
clearTimeout(timeout);
timeout = setTimeout(windowResizeStopFunction, 600);
const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
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
