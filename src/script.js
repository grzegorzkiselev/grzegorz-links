let isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
    document.querySelector(".preloader").remove()
}

import "./styles/style.css"

import("./aspect-ratio/aspect-ratio.js")
import("./three/me.js")
import("./three/cubes.js")
import("./three/flowers.js")

if (!isMobile) {
    import("./hover/menu.js").then(({ default: Menu }) => { new Menu(menuEl) });
    const menuEl = document.querySelector('.links');
    import("./preloader/preloader.js")
}