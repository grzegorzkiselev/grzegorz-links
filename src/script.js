import "./../static/fonts/NewSpirit.woff2"
import "./../static/fonts/arialnarrow-subset.woff2"
import "./style.css"

const htmlClock = document.querySelector(".mytime")

const getCurrentTime = () => {
  const date = new Date();
  const UTC = date.getTime() + (date.getTimezoneOffset() * 60000);
  let newDate = new Date(UTC + (3600000 * "+3"));
  newDate = newDate.toLocaleTimeString()
  return newDate
}

const calcTime = () => {
  const newDate = getCurrentTime()
  htmlClock.textContent = newDate
}

const initialTimeAnimation = () => {
  const newDate = getCurrentTime()
  const timeByUnits = newDate.split(":")
  let myTimeWault = [0, 0, 0]

  for (let i = 0; i < 3; i++) {
      let intervalId = setInterval(() => {
      if (parseInt(timeByUnits[i]) - 1 === myTimeWault[i]) {
        setInterval(calcTime, 1000)
        clearInterval(intervalId)
      }
        myTimeWault[i]++
        if (myTimeWault[i] < 10) {
          myTimeWault[i] = `0${myTimeWault[i]}`
        }
        htmlClock.textContent = myTimeWault.join(":")
    }, 25)
  }
}

initialTimeAnimation()

let isMobile = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
  document.querySelector(".preloader").remove()
} else {
  import("./preloader/preloader.js")
}

import("./aspect-ratio/aspect-ratio.js")
import("./three/cubes.js")
import("./three/flowers.js")
import("./three/me.js")
