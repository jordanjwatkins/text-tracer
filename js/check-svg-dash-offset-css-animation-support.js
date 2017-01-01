function checkSvgDashOffsetCSSAnimationSupport(callback) {
  var elSvgContainer = document.createElement('div');
  var elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var elSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var initialOffset;
  var svgDashOffsetCSSAnimationSupported;

  elSvgPath.setAttribute('stroke-dashoffset', 1);

  elSvg.appendChild(elSvgPath);
  elSvgContainer.appendChild(elSvg);
  document.body.appendChild(elSvgContainer);

  initialOffset = getComputedStyle(elSvgPath).strokeDashoffset;

  elSvgContainer.classList.add('is-tracing');

  setTimeout(function () {
    if (getComputedStyle(elSvgPath).strokeDashoffset !== initialOffset) {
      svgDashOffsetCSSAnimationSupported = true;
    } else {
      svgDashOffsetCSSAnimationSupported = false;
    }

    document.body.removeChild(elSvgContainer);

    setTimeout(function () {
      callback(svgDashOffsetCSSAnimationSupported);
    }, 0);
  }, 200);
}

export default checkSvgDashOffsetCSSAnimationSupport;
