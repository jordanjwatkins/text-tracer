import TextPaths from './text-paths';

function makeAnimationReadyTextSvg(font, config) {
  var elSvg = makeElSvg('svg');
  var textPaths = new TextPaths(font, config.userText, config.strokeWidth, config.fontSize);

  addSplitPaths(elSvg, textPaths, config.strokeColor);
  adjustSvgBoxes(elSvg, textPaths);

  return elSvg;
}

function makeElSvg(id) {
  var elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  elSvg.setAttribute('id', id);
  elSvg.setAttribute('class', 'is-tracing');

  return elSvg;
}

function adjustSvgBoxes(elSvg, textPaths) {
  setAttributes(elSvg, textPaths.parentBox, ['viewBox', 'width', 'height']);
}

function addSplitPaths(elSvg, textPaths, stroke) {
  var elSvgPaths = textPaths.splitPaths.map(function (path) {
    return addPathToSvg(path, elSvg);
  });

  applySharedPathStyles(elSvg, textPaths);

  setupStrokeDashAnimation(elSvg, elSvgPaths, stroke);

  return elSvg;
}

function setupStrokeDashAnimation(elSvg, elSvgPaths, stroke) {
  setTimeout(function () {
    elSvgPaths.forEach(function (elSvgPath) {
      // avoid clipping in IE / Edge
      elSvg.setAttribute('stroke', stroke);

      applyPathStrokeDashStyles(elSvgPath);
    });
  }, 0);
}

function applySharedPathStyles(elSvg, textPaths) {
  elSvg.setAttribute('stroke-width', textPaths.strokeWidth);
  elSvg.setAttribute('stroke-linecap', 'round');

  elSvg.setAttribute('fill', 'transparent');

  // avoid clipping in IE / Edge
  elSvg.setAttribute('stroke', 'transparent');
}

function applyPathStrokeDashStyles(elSvgPath) {
  var length = elSvgPath.getTotalLength();

  elSvgPath.setAttribute('stroke-dashoffset', length);
  elSvgPath.setAttribute('stroke-dasharray', [length, length]);
}

function addPathToSvg(path, elSvg) {
  var elSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  elSvgPath.setAttribute('d', path);

  elSvg.appendChild(elSvgPath);

  return elSvgPath;
}

function setAttributes(el, attributes, keys) {
  keys = keys || Object.keys(attributes);

  keys.forEach(function (key) {
    el.setAttribute(key, attributes[key]);
  });
}

export default makeAnimationReadyTextSvg;
