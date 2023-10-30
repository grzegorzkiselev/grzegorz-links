var htmlClock = document.querySelector(".mytime");

var getCurrentTime = () => {
  var date = new Date();
  var UTC = date.getTime() + date.getTimezoneOffset() * 60000;
  var newDate = new Date(UTC + 3600000 * "+3");
  newDate = newDate.toLocaleTimeString();
  return newDate;
};

var calcTime = () => {
  var newDate = getCurrentTime();
  htmlClock.textContent = newDate;
};

var initialTimeAnimation = () => {
  var animatedTime = [0, 0, 0];

  animatedClockInterval = setInterval(() => {
    var currentTime = getCurrentTime();
    var currentTimeArray = currentTime.split(":");
    var [hours, minutes, seconds] = [
      parseInt(currentTimeArray[0]),
      parseInt(currentTimeArray[1]),
      parseInt(currentTimeArray[2]),
    ];

    if (
      animatedTime[0] >= hours &&
      animatedTime[1] >= minutes &&
      animatedTime[2] >= seconds
    ) {
      clearInterval(animatedClockInterval);
      setInterval(calcTime, 1000);
      return;
    }

    if (animatedTime[0] != hours) {
      animatedTime[0]++;
      if (animatedTime[0] < 10) animatedTime[0] = `0${animatedTime[0]}`;
    }
    if (animatedTime[1] != minutes) {
      animatedTime[1]++;
      if (animatedTime[1] < 10) animatedTime[1] = `0${animatedTime[1]}`;
    }
    if (animatedTime[2] != seconds) {
      animatedTime[2]++;
      if (animatedTime[2] < 10) animatedTime[2] = `0${animatedTime[2]}`;
    }
    htmlClock.textContent = animatedTime.join(":");
  }, 100);

  // setInterval(calcTime, 1000)
};

initialTimeAnimation();
