import "./../static/fonts/NewSpirit.woff2"
import "./../static/fonts/arialnarrow-subset.woff2"
import "./style.css"
import "./../static/utilities/clock.js"

let isMobile = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
  // document.querySelector(".preloader").remove()
} else {
  // import("./preloader/preloader.js")
}

import("./aspect-ratio/aspect-ratio.js")
import("./three/cubes.js")
import("./three/flowers.js")
import("./three/me.js")
