function TextPaths(font, userText, strokeWidth, fontSize) {
  var fontY = measureFontY(font, fontSize);

  var glyphPaths = font.getPaths(
    userText,
    0,
    fontY.ascent,
    fontSize
  );

  var parentBox = getParentBox(
    glyphPaths,
    fontY.height,
    strokeWidth,
    fontSize
  );

  return {
    glyphPaths: glyphPaths,
    splitPaths: splitPaths(glyphPaths),
    fontY: fontY,
    parentBox: parentBox,
    fontSize: fontSize,
    strokeWidth: strokeWidth,
  };
}

function splitPaths(paths) {
  var splitPaths = [];

  paths.forEach(function (path) {
    path.toPathData().split('M').forEach(function (subPath) {
      if (!subPath) return;

      splitPaths.push('M'+ subPath);
    });
  });

  return splitPaths;
}

function measureFontY(font, fontSize) {
  var scale = 1 / font.unitsPerEm * fontSize;

  var fontBoundingBoxAscent = font.ascender * scale;
  var fontBoundingBoxDescent = font.descender * scale;

  return {
    height: fontBoundingBoxAscent - fontBoundingBoxDescent,
    ascent: fontBoundingBoxAscent,
    descent: fontBoundingBoxDescent,
  };
}

function getParentBox(glyphPaths, height, strokeWidth, fontSize) {
  var offsetX, offsetY, width;

  var xMinMax = getXMinMax(glyphPaths);

  offsetX = xMinMax.min - (strokeWidth / 2) - 5;
  width = xMinMax.max + (strokeWidth / 2) - offsetX + 5;

  offsetY = -strokeWidth - fontSize / 15;
  height = height - offsetY + strokeWidth * 2;

  return {
    offsetX: offsetX,
    offsetY: offsetY,
    width: width,
    height: height,
    viewBox: [
      offsetX,
      offsetY,
      width,
      height,
    ].join(' '),
  };
}

function getXMinMax(glyphPaths) {
  var svgMaxX, svgMinX, box;

  Array.prototype.forEach.call(glyphPaths, function (path) {
    box = path.getBoundingBox();

    // ignore space characters
    if (box.x2 === 0 && box.y2 === 0) return;

    if (!svgMaxX || box.x2 > svgMaxX) svgMaxX = box.x2;
    if (!svgMinX || box.x1 < svgMinX) svgMinX = box.x1;
  });

  return {
    min: svgMinX,
    max: svgMaxX,
  };
}

export default TextPaths;
