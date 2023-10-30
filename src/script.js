import "./../static/fonts/NewSpirit.woff2";
import "./../static/fonts/arialnarrow-subset.woff2";
import "./style.css";
import "./header/header.js";

var isMobile = false;

if (navigator.maxTouchPoints >= 1) {
  isMobile = true;
  document.querySelector(".preloader").remove();
} else {
  import("./preloader/preloader.js");
  import("./hover/menu.js").then(({ default: Menu }) => {
    new Menu(menuEl);
  });
  var menuEl = document.querySelector(".links");
}

// if (
//   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   )
// ) {

// } else {

// }

import("./aspect-ratio/aspect-ratio.js");
import("./three/cubes.js");
import("./three/flowers.js");
import("./three/me.js");
