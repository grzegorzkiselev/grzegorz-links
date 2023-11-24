var fontSize = 60;
var lineHeight = 0.86;
var unitsPerEm = 1000;

var ascent = 1006;
var descent = -258;
var capHeight = 700;
var xHeight = 504;

var lineHeightRatio = lineHeight;
var capHeightRatio = capHeight / unitsPerEm;
var xHeightRatio = xHeight / unitsPerEm;
var ascenderRatio = ascent / unitsPerEm;
var descenderRatio = descent / unitsPerEm;
var baselineRatio = descenderRatio * -1;
var boundingBoxRatio = (ascent + Math.abs(descent)) / unitsPerEm;
var lineGapRatio = lineHeightRatio - boundingBoxRatio;

var originOffset = (lineGapRatio / 2) * fontSize;
var baselineOffset = originOffset + baselineRatio * fontSize;
var ascenderOffset = baselineOffset + ascenderRatio * fontSize;
var capHeightOffset = baselineOffset + capHeightRatio * fontSize;
var xHeightOffset = baselineOffset + xHeightRatio * fontSize;
var descenderOffset = baselineOffset + descenderRatio * fontSize;

var baselineOffsetFromTop = lineHeightRatio * fontSize - baselineOffset;
var ascenderOffsetFromTop = lineHeightRatio * fontSize - ascenderOffset;
var capHeightOffsetFromTop = lineHeightRatio * fontSize - capHeightOffset;
var xHeightOffsetFromTop = lineHeightRatio * fontSize - xHeightOffset;
var descenderOffsetFromTop = lineHeightRatio * fontSize - descenderOffset;

console.table([
  ["boundingBoxRatio", boundingBoxRatio],
  ["originOffset", originOffset],
  ["baselineOffset", baselineOffset],
  ["ascenderOffset", ascenderOffset],
  ["capHeightOffset", capHeightOffset],
  ["xHeightOffset", xHeightOffset],
  ["descenderOffset", descenderOffset],
]);
console.table([
  ["baselineOffsetFromTop", baselineOffsetFromTop],
  ["ascenderOffsetFromTop", ascenderOffsetFromTop],
  ["capHeightOffsetFromTop", capHeightOffsetFromTop],
  ["xHeightOffsetFromTop", xHeightOffsetFromTop],
  ["descenderOffsetFromTop", descenderOffsetFromTop],
]);

console.table([
  ["capHeightOffsetFromTop", capHeightOffsetFromTop],
  ["xHeightOffsetFromTop", xHeightOffsetFromTop],
  ["descenderOffset", descenderOffset],
]);

var xHeightFromTop = (unitsPerEm - Math.abs(descent) - xHeight) / unitsPerEm;
var baselineFromTop = Math.abs(descent) / unitsPerEm;
var lineHeightInPixels = lineHeight * fontSize;
var lineHeightExtra = (lineHeightInPixels - fontSize) / 2;
var topOffset = lineHeightExtra + fontSize * xHeightFromTop;
var bottomOffset = lineHeightExtra + fontSize * baselineFromTop;

console.table([
  ["topOffset", topOffset],
  ["bottomOffset", bottomOffset],
]);
