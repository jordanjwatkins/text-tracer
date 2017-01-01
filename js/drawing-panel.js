/* global opentype */

import makeAnimationReadyTextSvg from './animated-text-svg';
import animateTracing from './animate-tracing';

function DrawingPanel(config, drawConfig) {
  Object.assign(this, config);

  this.drawConfig = drawConfig;

  this.attachEventHandlers();
}

DrawingPanel.prototype = {
  attachEventHandlers: attachEventHandlers,
  draw: draw,
  freshTrace: freshTrace,
  startTrace: startTrace,
  dispatchFontLoadingEvent: dispatchFontLoadingEvent,
  dispatchFontLoadedEvent: dispatchFontLoadedEvent,
  dispatchStartTraceEvent: dispatchStartTraceEvent,
  startLoadingFont: startLoadingFont,
  loadFont: loadFont,
  cssTrace: cssTrace,
  jsTrace: jsTrace,
  updateElSvg: updateElSvg,
};

function attachEventHandlers() {
  var _this = this;

  this.elSvgContainer.addEventListener('click', function () {
    _this.draw();
  });
}

function draw() {
  if (this.fontLoading) return;

  if (this.font && this.drawConfig.fontUrl === this.fontUrl) {
    this.freshTrace();
  } else {
    this.fontUrl = this.drawConfig.fontUrl;

    this.startLoadingFont();
  }
}

function freshTrace() {
  this.updateElSvg();

  this.startTrace();

  this.dispatchStartTraceEvent();
}

function onFontLoad(font) {
  this.fontLoading = false;
  this.font = font;

  this.dispatchFontLoadedEvent();

  this.freshTrace();
}

function updateElSvg() {
  this.elSvg = makeAnimationReadyTextSvg(this.font, this.drawConfig);

  this.elSvgContainer.innerHTML = '';
  this.elSvgContainer.appendChild(this.elSvg);
}

function startTrace() {
  if (this.svgDashOffsetCSSAnimationSupported) {
    this.cssTrace();
  } else {
    this.jsTrace();
  }
}

function cssTrace() {
  this.elSvgContainer.classList.remove('is-tracing');

  setTimeout(function () {
    this.elSvgContainer.classList.add('is-tracing');
  }.bind(this), 0);
}

function jsTrace() {
  animateTracing.sync(
    this.elSvg.childNodes,
    this.drawConfig.animationDuration * 1000 // seconds to milliseconds
  );
}

function dispatchStartTraceEvent() {
  this.elDrawingPanel.dispatchEvent(new CustomEvent('startTrace', { detail: this.elSvg }));
}

function startLoadingFont() {
  this.fontLoading = true;

  this.dispatchFontLoadingEvent();

  this.loadFont(this.fontUrl, onFontLoad.bind(this));
}

function loadFont(fontUrl, callback) {
  try {
    opentype.load(fontUrl, function (err, font) {
      if (err) {
        alert('Font could not be loaded: ' + err);
      } else {
        callback(font);
      }
    });
  } catch(err) {
    alert('Font could not be loaded: ' + err);
  }
}

function dispatchFontLoadingEvent() {
  this.elDrawingPanel.dispatchEvent(new CustomEvent('fontLoading'));
}

function dispatchFontLoadedEvent() {
  this.elDrawingPanel.dispatchEvent(new CustomEvent('fontLoaded'));
}

export default DrawingPanel;
