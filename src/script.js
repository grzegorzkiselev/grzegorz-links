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

const mytime = document.querySelector(".mytime")

const calcTime = () => {
    const date = new Date();
    const UTC = date.getTime() + (date.getTimezoneOffset() * 60000);
    const newDate = new Date(UTC + (3600000 * "+6"));
    mytime.textContent = newDate.toLocaleTimeString()
}

setInterval(calcTime, 1000)