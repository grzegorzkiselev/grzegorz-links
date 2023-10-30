var map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
var lerp = (a, b, n) => (1 - n) * a + n * b;
var clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);
var getMousePos = (ev) => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};
export { map, lerp, clamp, getMousePos };
