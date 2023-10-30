var resizeContainer = document.getElementById("resize-container");
var resizeValue = document.getElementById("resize-value");

var timeout = null;

var windowResizeFunction = () => {
  clearTimeout(timeout);
  timeout = setTimeout(windowResizeStopFunction, 600);
  var screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  var screenWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  resizeValue.innerHTML = screenWidth + " &mdash; " + screenHeight;
  resizeValue.innerHTML =
    Math.round((screenWidth / screenHeight) * 1000) / 1000;
};

var windowResizeStopFunction = () => {
  resizeContainer.classList.remove("show");
};

window.addEventListener("load", windowResizeFunction);
window.addEventListener("resize", windowResizeFunction);
