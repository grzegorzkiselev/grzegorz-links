var fontSize = "240";
var lineHeight = 1.2;
var unitsPerEm = 1000;
var ascent = 775;
var descent = -225;
var capHeight = 708;
var xHeight = 491;

var lineHeightRatio = lineHeight;
var capHeightRatio = capHeight / unitsPerEm;
var xHeightRatio = xHeight / unitsPerEm;
var ascenderRatio = ascent / unitsPerEm;
var descenderRatio = descent / unitsPerEm;
var baselineRatio = descenderRatio * -1;
var boundingBoxRatio = Math.round((ascent + Math.abs(descent)) / unitsPerEm);
var lineGapRatio = lineHeightRatio - boundingBoxRatio;

var originOffset = (lineGapRatio / 2) * fontSize;
var baselineOffset = baselineRatio * fontSize + originOffset;
var ascenderOffset = baselineOffset + ascenderRatio * fontSize;
var capHeightOffset = baselineOffset + capHeightRatio * fontSize;
var xHeightOffset = baselineOffset + xHeightRatio * fontSize;
var descenderOffset = baselineOffset + descenderRatio * fontSize;

var baselineOffsetFromTop = lineHeight * fontSize - baselineOffset;
var ascenderOffsetFromTop = lineHeight * fontSize - ascenderOffset;
var capHeightOffsetFromTop = lineHeight * fontSize - capHeightOffset;
var xHeightOffsetFromTop = lineHeight * fontSize - xHeightOffset;
var descenderOffsetFromTop = lineHeight * fontSize - descenderOffset;

console.table([
  // ["ascenderOffsetFromTop", ascenderOffsetFromTop],
  // ["capHeightOffsetFromTop", capHeightOffsetFromTop],
  ["xHeightOffsetFromTop", xHeightOffsetFromTop],
  ["baselineOffset", baselineOffset],
  // ["descenderOffsetFromTop", descenderOffsetFromTop],
]);

// console.table([
//   ["capHeightRatio", capHeightRatio],
//   ["xHeightRatio", xHeightRatio],
//   ["ascenderRatio", ascenderRatio],
//   ["descenderRatio", descenderRatio],
//   ["baselineRatio", baselineRatio],
//   ["boundingBoxRatio", boundingBoxRatio],
//   ["lineGapRatio", lineGapRatio],
//   ["originOffset", originOffset],
//   ["baselineOffset", baselineOffset],
//   ["ascenderOffset", ascenderOffset],
//   ["capHeightOffset", capHeightOffset],
//   ["xHeightOffset", xHeightOffset],
//   ["descenderOffset", descenderOffset],
// ]);

var xHeightFromTop = (unitsPerEm - Math.abs(descent) - xHeight) / unitsPerEm;
var baselineFromTop = Math.abs(descent) / unitsPerEm;
var lineHeightInPixels = lineHeight * fontSize;

var lineHeightExtra = (lineHeightInPixels - fontSize) / 2;
var topOffset = lineHeightExtra + fontSize * xHeightFromTop;
var bottomOffset = lineHeightExtra + fontSize * baselineFromTop;

console.table([
  // ["lineHeightExtra", lineHeightExtra],
  ["topOffset", topOffset],
  ["bottomOffset", bottomOffset],
]);
