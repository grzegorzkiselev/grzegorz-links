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
  let animatedTime = [0, 0, 0]

  animatedClockInterval = setInterval(() => {
    let currentTime = getCurrentTime()
    let currentTimeArray = currentTime.split(":")
    const [hours, minutes, seconds] = [parseInt(currentTimeArray[0]), parseInt(currentTimeArray[1]), parseInt(currentTimeArray[2])]

    if (animatedTime[0] >= hours
      && animatedTime[1] >= minutes
      && animatedTime[2] >= seconds
    ) {
      clearInterval(animatedClockInterval)
      setInterval(calcTime, 1000)
      return
    }

    if (animatedTime[0] != hours) {
      animatedTime[0]++
      if (animatedTime[0] < 10) animatedTime[0] = `0${animatedTime[0]}`
    }
    if (animatedTime[1] != minutes) {
      animatedTime[1]++
      if (animatedTime[1] < 10) animatedTime[1] = `0${animatedTime[1]}`
    }
    if (animatedTime[2] != seconds) {
      animatedTime[2]++
      if (animatedTime[2] < 10) animatedTime[2] = `0${animatedTime[2]}`
    }
    htmlClock.textContent = animatedTime.join(":")
  }, 100)


  // setInterval(calcTime, 1000)
}

initialTimeAnimation()
