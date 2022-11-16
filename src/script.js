import "./styles/style.css"

let isMobile = false;
let isApple = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
  document.querySelector(".preloader").remove()
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isApple = true
  }
}

let userAgentString = navigator.userAgent;
let chrome = userAgentString.indexOf("Chrome") > -1;
let safari = userAgentString.indexOf("Safari") > -1;

if (((chrome || safari) && !isMobile) || isApple) {
  document.querySelector('[href="./theme/dumb_font-metrics.css"]').remove()
} else {
  document.querySelector('[href="./theme/font-based-metrics.css"]').remove()
}

if (!isMobile) {
  // import("./hover/menu.js").then(({
  //   default: Menu
  // }) => {
  //   new Menu(menuEl)
  // });
  // const menuEl = document.querySelector('.links');
  import("./preloader/preloader.js")
}

import("./aspect-ratio/aspect-ratio.js")
import("./three/me.js")
import("./three/cubes.js")
import("./three/flowers.js")

const mytime = document.querySelector(".mytime")

const calcTime = () => {
  const date = new Date();
  const UTC = date.getTime() + (date.getTimezoneOffset() * 60000);
  const newDate = new Date(UTC + (3600000 * "+6"));
  mytime.textContent = newDate.toLocaleTimeString()
}

setInterval(calcTime, 1000)
