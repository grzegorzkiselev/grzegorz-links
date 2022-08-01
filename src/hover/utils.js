const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
const getMousePos = (ev) => {
    return { 
        x : ev.clientX, 
        y : ev.clientY 
    };
};
export { map, lerp, clamp, getMousePos };
