/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function syncPathDashOffsetAnimate(paths, duration) {
  var delta = 0;
  var lastTimestamp;
  var pathLength;
  var updateHandle;

  duration = duration || 2000;

  initializePaths(paths);
  start();

  return {
    stop: stop,
    start: start,
    restart: restart
  };

  function initializePaths() {
    Array.prototype.forEach.call(paths, function (elPath) {
      pathLength = elPath.getTotalLength();

      elPath.style.strokeDashoffset = pathLength;
      elPath.style.strokeDasharray = pathLength + ', ' + pathLength;

      elPath.dashSpeed = pathLength / duration;
    });
  }

  function update(timestamp) {
    if (!shouldUpdate()) return;

    if (lastTimestamp) {
      delta = timestamp - lastTimestamp;
    }

    lastTimestamp = timestamp;

    updatePaths();

    updateHandle = requestAnimationFrame(update);
  }

  function shouldUpdate() {
    return !(!paths[0] || paths[0].style.strokeDashoffset <= 0);
  }

  function updatePaths() {
    Array.prototype.forEach.call(paths, function (elPath) {
      elPath.style.strokeDashoffset -= delta * elPath.dashSpeed;

      if (elPath.style.strokeDashoffset <= 0) {
        elPath.style.strokeDashoffset = 0;
      }
    });
  }

  function stop() {
    cancelAnimationFrame(updateHandle);
  }

  function start() {
    lastTimestamp = 0;
    updateHandle = requestAnimationFrame(update);
  }

  function restart() {
    initializePaths(paths);
    start();
  }
}

/* harmony default export */ __webpack_exports__["a"] = {
  sync: syncPathDashOffsetAnimate
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawing_panel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__options_panel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__export_panel__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_block__ = __webpack_require__(12);





function TextTracerApp(configs) {
  this.initComponents(configs);
  this.attachEventHandlers(configs.drawConfig);

  this.drawConfig = configs.drawConfig;

  this.drawingPanel.draw();
}

TextTracerApp.prototype = {
  initComponents: initComponents,
  attachEventHandlers: attachEventHandlers
};

function initComponents(configs) {
  this.optionsPanel = new __WEBPACK_IMPORTED_MODULE_1__options_panel__["a" /* default */](configs.optionsPanel, configs.drawConfig);
  this.drawingPanel = new __WEBPACK_IMPORTED_MODULE_0__drawing_panel__["a" /* default */](configs.drawingPanel, configs.drawConfig);

  this.exportPanel = new __WEBPACK_IMPORTED_MODULE_2__export_panel__["a" /* default */](configs.exportPanel, configs.drawConfig);
  this.styleBlock = new __WEBPACK_IMPORTED_MODULE_3__style_block__["a" /* default */](configs.drawConfig);
}

function attachEventHandlers(drawConfig) {
  var _this = this;

  // options panel events
  this.optionsPanel.fontChangePanel.elFontUpload.addEventListener('uploadStart', function (event) {
    _this.optionsPanel.fontChangePanel.elFont.innerHTML = event.detail.fontName;
  });

  this.optionsPanel.fontChangePanel.elFontUpload.addEventListener('uploadSuccess', function (event) {
    drawConfig.fontName = event.detail.fontName;
    drawConfig.fontUrl = event.detail.fontUrl;

    _this.drawingPanel.draw();

    _this.styleBlock.update();
  });

  this.optionsPanel.elOptionsPanel.addEventListener('submit', function () {
    _this.drawingPanel.draw();

    _this.styleBlock.update();
  });

  // drawing panel events
  this.drawingPanel.elDrawingPanel.addEventListener('startTrace', function (event) {
    _this.exportPanel.update(event.detail, false);

    setTimeout(function () {
      _this.exportPanel.update(event.detail, true);
    }, 0); // wait for path attributes to be added/updated
  });

  this.drawingPanel.elDrawingPanel.addEventListener('fontLoading', function () {
    if (_this.drawConfig.fontUrl.indexOf('.ttf') > -1 && _this.drawConfig.fontName === 'Lobster') return;

    _this.optionsPanel.elForm.classList.add('font-loading');
  });

  this.drawingPanel.elDrawingPanel.addEventListener('fontLoaded', function () {
    _this.optionsPanel.elForm.classList.remove('font-loading');
  });
}

/* harmony default export */ __webpack_exports__["a"] = TextTracerApp;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__check_svg_dash_offset_css_animation_support__ = __webpack_require__(4);


function maybePolyfill(callback) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__check_svg_dash_offset_css_animation_support__["a" /* default */])(function (svgDashOffsetCSSAnimationSupported) {
    if (shouldPolyfill()) {
      loadScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,fetch,Object.assign,CustomEvent', function () {
        callback(svgDashOffsetCSSAnimationSupported);
      });
    } else {
      callback(svgDashOffsetCSSAnimationSupported);
    }
  });
}

function shouldPolyfill() {
  return !(window.Promise && window.fetch);
}

function loadScript(src, done) {
  var js = document.createElement('script');

  js.src = src;

  js.onload = function () {
    done();
  };

  js.onerror = function () {
    done(new Error('Failed to load script ' + src));
  };

  document.head.appendChild(js);
}

/* harmony default export */ __webpack_exports__["a"] = maybePolyfill;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_paths__ = __webpack_require__(13);


function makeAnimationReadyTextSvg(font, config) {
  var elSvg = makeElSvg('svg');
  var textPaths = new __WEBPACK_IMPORTED_MODULE_0__text_paths__["a" /* default */](font, config.userText, config.strokeWidth, config.fontSize);

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

/* harmony default export */ __webpack_exports__["a"] = makeAnimationReadyTextSvg;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = checkSvgDashOffsetCSSAnimationSupport;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animated_text_svg__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_tracing__ = __webpack_require__(0);
/* global opentype */




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
  updateElSvg: updateElSvg
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
  this.elSvg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__animated_text_svg__["a" /* default */])(this.font, this.drawConfig);

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
  __WEBPACK_IMPORTED_MODULE_1__animate_tracing__["a" /* default */].sync(this.elSvg.childNodes, this.drawConfig.animationDuration * 1000 // seconds to milliseconds
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
  } catch (err) {
    alert('Font could not be loaded: ' + err);
  }
}

function dispatchFontLoadingEvent() {
  this.elDrawingPanel.dispatchEvent(new CustomEvent('fontLoading'));
}

function dispatchFontLoadedEvent() {
  this.elDrawingPanel.dispatchEvent(new CustomEvent('fontLoaded'));
}

/* harmony default export */ __webpack_exports__["a"] = DrawingPanel;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animate_tracing__ = __webpack_require__(0);


function ExportPanel(config, drawConfig) {
  Object.assign(this, config);

  this.drawConfig = drawConfig;
  this.cssAnimate = false;
  this.isShowing = false;

  this.attachEventHandlers();
}

ExportPanel.prototype = {
  attachEventHandlers: attachEventHandlers,
  update: update,
  updateFileSizes: updateFileSizes,
  updateDownloadLink: updateDownloadLink,
  maybeClosePanelOnBodyClick: maybeClosePanelOnBodyClick,
  showPanel: showPanel,
  hidePanel: hidePanel,
  elIsPartOfPanel: elIsPartOfPanel,
  jsAnimationCode: jsAnimationCode,
  jsTraceInitCode: jsTraceInitCode,
  jsClickToRestartCode: jsClickToRestartCode,
  cssClickToRestartCode: cssClickToRestartCode,
  htmlStart: htmlStart
};

function attachEventHandlers() {
  var _this = this;

  document.body.addEventListener('click', this.maybeClosePanelOnBodyClick.bind(this));

  this.elExportOpen.addEventListener('click', function () {
    _this.showPanel();
  });

  this.elExportClose.addEventListener('click', function () {
    _this.hidePanel();
  });

  this.elPopupPreview.addEventListener('click', function () {
    var preview = window.open('', '_blank');

    if (preview) preview.document.write(_this.elSvgCopy.value);
  });

  this.elSvgCopy.addEventListener('focus', function (event) {
    _this.elSvgCopy.parentNode.classList.add('focus');

    setTimeout(function () {
      event.target.select();
    }, 50);
  });

  this.elSvgCopy.addEventListener('blur', function () {
    _this.elSvgCopy.parentNode.classList.remove('focus');
  });

  this.elSvgCopy.addEventListener('click', function (event) {
    event.preventDefault();

    _this.elSvgCopy.focus();
  });

  this.elAnimationTypeToggle.addEventListener('click', function () {
    _this.cssAnimate = !_this.cssAnimate;

    _this.update();
  });
}

function update(elSvg, withDash) {
  var html;
  var svg;

  if (elSvg) {
    svg = new XMLSerializer().serializeToString(elSvg);

    if (withDash) {
      this.dashedSvg = svg;
    } else {
      this.svg = svg;
    }
  }

  if (this.cssAnimate && !this.dashedSvg) return;

  html = [this.htmlStart()];

  if (this.cssAnimate) {
    html.push(this.dashedSvg);
    html.push(this.cssClickToRestartCode());
  } else {
    html.push(this.svg);
    html.push(this.jsAnimationCode());
  }

  this.elSvgCopy.value = html.join('\n\n');

  this.updateFileSizes();
  this.updateDownloadLink();
}

function updateDownloadLink() {
  this.elDownloadLink.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(this.elSvgCopy.value));
}

function updateFileSizes() {
  var svgLength;

  svgLength = this.cssAnimate ? this.dashedSvg.length : this.svg.length;

  this.elSvgSize.innerHTML = (svgLength / 1000).toPrecision(3);
  this.elTotalSize.innerHTML = (this.elSvgCopy.value.length / 1000).toPrecision(3);
}

function showPanel() {
  this.isShowing = true;
  this.elExportPanel.classList.add('is-active');
  this.elExportPanel.classList.remove('is-hidden');
}

function hidePanel() {
  this.isShowing = false;
  this.elExportPanel.classList.remove('is-active');

  setTimeout(function () {
    if (!this.isShowing) {
      this.elExportPanel.classList.add('is-hidden');
    }
  }.bind(this), 600);
}

function maybeClosePanelOnBodyClick(event) {
  if (!this.elIsPartOfPanel(event.target)) {
    this.hidePanel();
  }
}

function elIsPartOfPanel(el) {
  if (el === document.body) return true;

  while (el.parentNode) {
    if (typeof el.className === 'string' && el.className.indexOf('export-panel') > -1) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

function jsAnimationCode() {
  return ['<script>', __WEBPACK_IMPORTED_MODULE_0__animate_tracing__["a" /* default */].sync, this.jsTraceInitCode(), this.jsClickToRestartCode(), '</script>'].join('\n');
}

/* eslint-disable indent */
function jsTraceInitCode() {
  var animationDurationMs = this.drawConfig.animationDuration * 1000;

  return ['\nvar elSvg = document.getElementById("svg");', 'var elSvgPaths = elSvg.childNodes;', 'var animator = syncPathDashOffsetAnimate(elSvgPaths, ' + animationDurationMs + ');'].join('\n');
}

function jsClickToRestartCode() {
  return ['\nelSvg.addEventListener("click", function (event) {', '\tanimator.restart();', '});'].join('\n');
}

function cssClickToRestartCode() {
  return ['<script>', 'var elSvg = document.getElementById("svg");\n', 'elSvg.addEventListener("click", function (event) {', '\telSvg.classList.remove("is-tracing");\n', '\tsetTimeout(function () {', '\t\telSvg.classList.add("is-tracing");', '\t}, 0);', '});', '</script>'].join('\n');
}

function htmlStart() {
  var html = ['<!DOCTYPE html>\n', '<title>Text Tracer Export</title>\n', '<style>', '\tbody { background-color: ' + this.drawConfig.backgroundColor + '; }', '\tsvg { stroke: ' + this.drawConfig.strokeColor + '; overflow: visible; }'];

  if (this.cssAnimate) {
    html.push('\t.is-tracing path { animation: trace ' + this.drawConfig.animationDuration + 's linear forwards; }');
    html.push('\t@keyframes trace { to { stroke-dashoffset: 0; } }');
  }

  html.push('</style>');

  return html.join('\n');
}
/* eslint-enable indent */

/* harmony default export */ __webpack_exports__["a"] = ExportPanel;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function FontChangePanel(config, elChildFocus, elNextFocus) {
  Object.assign(this, config);

  this.elChildFocus = elChildFocus;
  this.elNextFocus = elNextFocus;

  this.fontSelectionShowing = false;
  this.fontMousedown = false;

  this.attachEventHandlers();
}

FontChangePanel.prototype = {
  attachEventHandlers: attachEventHandlers,
  maybeClosePanelOnBodyClick: maybeClosePanelOnBodyClick,
  elIsPartOfPanel: elIsPartOfPanel,
  showPanel: showPanel,
  hidePanel: hidePanel
};

function attachEventHandlers() {
  var _this = this;

  this.elFontChangePanelClose.addEventListener('click', function () {
    _this.hidePanel();
  });

  this.elFont.addEventListener('mousedown', function () {
    _this.fontMousedown = true;
  });

  this.elFont.addEventListener('click', function () {
    _this.fontMousedown = false;

    if (_this.fontSelectionShowing) {
      _this.hidePanel();
    } else {
      _this.showPanel();

      setTimeout(function () {
        _this.elChildFocus.focus();
      }, 200);
    }
  });

  this.elFont.addEventListener('focus', function () {
    if (_this.fontMousedown) return false;

    _this.hidePanel();
  });

  this.elNextFocus.addEventListener('focus', function () {
    _this.hidePanel();
  });

  document.body.addEventListener('click', function (event) {
    _this.maybeClosePanelOnBodyClick(event);
  });
}

function maybeClosePanelOnBodyClick(event) {
  if (!this.elIsPartOfPanel(event.target)) {
    this.hidePanel();
  }
}

function elIsPartOfPanel(el) {
  if (el === document.body) return true;

  while (el.parentNode) {
    if (typeof el.className === 'string' && (el.className.indexOf('font-change-panel') > -1 || el.className.indexOf('autocomplete-suggestions') > -1 || el.className.indexOf('current-font') > -1)) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

function hidePanel() {
  this.fontSelectionShowing = false;
  this.elFontChangePanel.classList.remove('is-showing');
}

function showPanel() {
  this.fontSelectionShowing = true;
  this.elFontChangePanel.classList.add('is-showing');
}

/* harmony default export */ __webpack_exports__["a"] = FontChangePanel;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function FontUploadField(elFontUpload) {
  this.el = elFontUpload;

  this.attachEventHandlers();
}

FontUploadField.prototype = {
  attachEventHandlers: attachEventHandlers
};

function attachEventHandlers() {
  this.el.addEventListener('change', handleFontUpload.bind(this));

  this.el.addEventListener('focus', function (event) {
    event.target.parentNode.classList.add('focus');
  });

  this.el.addEventListener('blur', function (event) {
    event.target.parentNode.classList.remove('focus');
  });

  this.el.addEventListener('dragover', handleDragOver, false);
  this.el.addEventListener('dragleave', handleDragLeave, false);
  this.el.addEventListener('drop', handleDrop, false);
}

function handleDragOver(event) {
  event.target.parentNode.classList.add('focus');
}

function handleDragLeave(event) {
  event.target.parentNode.classList.remove('focus');
}

function handleDrop(event) {
  event.target.parentNode.classList.remove('focus');
}

function handleFontUpload(event) {
  var _this = this;

  var fontName = event.target.value.replace(/.*\\/, '').replace(/\..*/, '');

  var file = event.target.files[0];

  readFileUploadAsDataURL(file, function (fontUrl) {
    _this.el.dispatchEvent(new CustomEvent('uploadSuccess', {
      detail: {
        fontName: fontName,
        fontUrl: fontUrl
      }
    }));
  });

  this.el.dispatchEvent(new CustomEvent('uploadStart', {
    detail: {
      fontName: fontName
    }
  }));

  event.target.value = '';
}

function readFileUploadAsDataURL(file, callback) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var url = event.target.result;

    callback(url);
  };

  reader.readAsDataURL(file);
}

/* harmony default export */ __webpack_exports__["a"] = FontUploadField;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* global autoComplete */

function GoogleFontsAutocompleteField(onSelect, fonts) {
  this.onSelect = onSelect;
  this.setFonts(fonts);
}

GoogleFontsAutocompleteField.prototype = {
  setFonts: setFonts
};

function setFonts(fonts) {
  if (this.autoComplete && typeof this.autoComplete.destroy === 'function') {
    this.autoComplete.destroy();
  }

  this.autoComplete = new autoComplete({
    selector: '[name=google-fonts]',
    minChars: 1,
    source: function (term, suggest) {
      var choices = Object.keys(fonts);
      var matches = [];

      term = term.toLowerCase();

      choices.forEach(function (choice) {
        if (choice.toLowerCase().indexOf(term) === 0) {
          matches.push(choice);
        }
      });

      suggest(matches);
    },

    onSelect: this.onSelect
  });
}

/* harmony default export */ __webpack_exports__["a"] = GoogleFontsAutocompleteField;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__google_fonts_autocomplete__ = __webpack_require__(9);


function GoogleFonts(config) {
  Object.assign(this, config);

  this.attachEventHandlers();

  this.autoCompleteField = new __WEBPACK_IMPORTED_MODULE_0__google_fonts_autocomplete__["a" /* default */](onAutoCompleteChoiceSelect.bind(this), this.fonts);

  this.fetchFonts();
}

GoogleFonts.prototype = {
  updateVariants: updateVariants,
  updateWeights: updateWeights,
  getFontUrl: getFontUrl,
  resetGoogleFontsField: resetGoogleFontsField,
  randomTerm: randomTerm,
  updateSelectedValue: updateSelectedValue,
  optionsHtml: optionsHtml,
  useFont: useFont,
  fetchFonts: fetchFonts,
  attachEventHandlers: attachEventHandlers
};

function attachEventHandlers() {
  var _this = this;

  // accept valid font typed into field without selecting via autocomplete
  // ex. typing exact font name and pressing enter
  this.elGoogleFonts.addEventListener('change', function (event) {
    if (!_this.fonts[event.target.value]) return;

    _this.fontName = event.target.value;
  });

  this.elVariants.addEventListener('change', function () {
    _this.variant = this.value;

    _this.updateWeights();
  });

  this.elWeights.addEventListener('change', function () {
    _this.weight = this.value;
  });

  this.elRandomFont.addEventListener('click', function () {
    _this.fontName = _this.randomTerm();

    _this.useFont();
  });
}

function onAutoCompleteChoiceSelect(event, term) {
  this.fontName = term;

  this.useFont();
}

function useFont() {
  if (!this.fonts[this.fontName]) return false;

  this.resetGoogleFontsField();

  this.updateVariants();
  this.updateWeights();

  this.fontUrl = this.getFontUrl();

  this.elGoogleFonts.dispatchEvent(new CustomEvent('useFont'));
}

function updateVariants() {
  var variants, optionValues;

  if (!this.fonts[this.fontName]) return false;

  variants = this.fonts[this.fontName]['variants'];
  optionValues = Object.keys(variants);

  this.variant = this.updateSelectedValue(optionValues, this.variant);

  this.elVariants.innerHTML = this.optionsHtml(optionValues, this.variant);
}

function updateWeights() {
  var weights, optionValues;

  if (!this.fonts[this.fontName]) return false;

  weights = this.fonts[this.fontName]['variants'][this.variant];
  optionValues = Object.keys(weights);

  this.weight = updateSelectedValue(optionValues, this.weight);

  this.elWeights.innerHTML = optionsHtml(optionValues, this.weight);
}

function getFontUrl() {
  return this.fonts[this.fontName]['variants'][this.variant][this.weight]['url']['woff'].replace('http:', 'https:');
}

function resetGoogleFontsField() {
  this.elGoogleFonts.value = '';

  this.elGoogleFonts.blur();
  this.elGoogleFonts.focus();
}

function randomTerm() {
  var fontNames = Object.keys(this.fonts);
  var index = Math.floor(Math.random() * fontNames.length);

  return fontNames[index];
}

function updateSelectedValue(values, selectedValue) {
  if (values.indexOf(selectedValue) > -1) {
    selectedValue = values[values.indexOf(selectedValue)];
  } else {
    selectedValue = values[0];
  }

  return selectedValue;
}

function optionsHtml(options, selectedValue) {
  var selected = '';

  return options.map(function (value) {
    selected = selectedValue === value ? ' selected' : '';

    return '<option value="' + value + '"' + selected + '>' + value + '</option>';
  }).join('');
}

function fetchFonts() {
  var _this = this;

  fetch('./google-fonts.json').then(function (response) {
    return response.json();
  }).then(function (fonts) {
    _this.fonts = fonts;
    _this.autoCompleteField.setFonts(fonts);
  });
}

/* harmony default export */ __webpack_exports__["a"] = GoogleFonts;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__font_change_panel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__font_upload__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_fonts__ = __webpack_require__(10);




function OptionsPanel(config, drawConfig) {
  Object.assign(this, config);

  this.drawConfig = drawConfig;

  this.initChildComponents(config);
  this.attachEventHandlers();
}

OptionsPanel.prototype = {
  attachEventHandlers: attachEventHandlers,
  initChildComponents: initChildComponents,
  useFont: useFont,
  onSubmit: onSubmit
};

function initChildComponents(config) {
  this.fontChangePanel = new __WEBPACK_IMPORTED_MODULE_0__font_change_panel__["a" /* default */](config.fontChangePanel, config.googleFonts.elGoogleFonts, config.googleFonts.elVariants);
  this.fontUploadField = new __WEBPACK_IMPORTED_MODULE_1__font_upload__["a" /* default */](config.fontChangePanel.elFontUpload);
  this.googleFonts = new __WEBPACK_IMPORTED_MODULE_2__google_fonts__["a" /* default */](config.googleFonts);
}

function attachEventHandlers() {
  var _this = this;

  this.elForm.addEventListener('submit', function (event) {
    event.preventDefault();

    _this.onSubmit(event);
  });

  this.elDrawSubmit.addEventListener('click', function (event) {
    // prevent the font change panel closing on form submit
    // submit triggers a click on the submit button whech propagates to the body
    event.stopPropagation();
  });

  this.elUserText.addEventListener('change', function () {
    _this.drawConfig.userText = this.value;
  });

  this.elFontSize.addEventListener('change', function () {
    _this.drawConfig.fontSize = Number(this.value);
  });

  this.elStrokeWidth.addEventListener('change', function () {
    _this.drawConfig.strokeWidth = Number(this.value);
  });

  this.elAnimationDuration.addEventListener('change', function () {
    _this.drawConfig.animationDuration = Number(this.value);
  });

  this.elStrokeColor.addEventListener('change', function (event) {
    _this.drawConfig.strokeColor = '#' + event.target.value;
  });

  this.elBackgroundColor.addEventListener('change', function (event) {
    _this.drawConfig.backgroundColor = '#' + event.target.value;
  });

  this.googleFonts.elGoogleFonts.addEventListener('useFont', function () {
    _this.useFont(_this.googleFonts.fontName, _this.googleFonts.fontUrl);
  });
}

function onSubmit(event) {
  if (this.googleFonts.fonts[this.drawConfig.fontName]) {
    event.stopPropagation();

    // in case initially loaded font is a google font
    this.googleFonts.fontName = this.drawConfig.fontName;

    this.googleFonts.useFont();
  } else {
    this.useFont(this.drawConfig.fontName, this.drawConfig.fontUrl);
  }
}

function useFont(fontName, fontUrl) {
  this.drawConfig.fontName = fontName;
  this.drawConfig.fontUrl = fontUrl;

  this.fontChangePanel.elFont.innerHTML = fontName;

  this.elOptionsPanel.dispatchEvent(new Event('submit'));
}

/* harmony default export */ __webpack_exports__["a"] = OptionsPanel;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function StyleBlock(drawConfig) {
  this.elStyle = document.createElement('style');

  this.drawConfig = drawConfig;

  this.append();
}

StyleBlock.prototype = {
  update: update,
  append: append
};

function append() {
  document.body.appendChild(this.elStyle);
}

function update() {
  this.elStyle.innerHTML = [
  /* eslint-disable indent */
  '@font-face {', '\tsrc: url("' + this.drawConfig.fontUrl + '");', '\tfont-family: "' + this.drawConfig.fontName + '";', '\tfont-style: normal;', '\tfont-weight: normal;', '\tunicode-range: U+00-FFFF;', '}', '.current-font__name,', '.options-panel__heading {', '\tfont-family: "' + this.drawConfig.fontName + '";', '}', 'body {', '\tbackground-color: ' + this.drawConfig.backgroundColor + ';', '}', '.is-tracing path {', '\tanimation: dash ' + this.drawConfig.animationDuration + 's linear forwards;', '}'].join('\n');
}

/* harmony default export */ __webpack_exports__["a"] = StyleBlock;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function TextPaths(font, userText, strokeWidth, fontSize) {
  var fontY = measureFontY(font, fontSize);

  var glyphPaths = font.getPaths(userText, 0, fontY.ascent, fontSize);

  var parentBox = getParentBox(glyphPaths, fontY.height, strokeWidth, fontSize);

  return {
    glyphPaths: glyphPaths,
    splitPaths: splitPaths(glyphPaths),
    fontY: fontY,
    parentBox: parentBox,
    fontSize: fontSize,
    strokeWidth: strokeWidth
  };
}

function splitPaths(paths) {
  var splitPaths = [];

  paths.forEach(function (path) {
    path.toPathData().split('M').forEach(function (subPath) {
      if (!subPath) return;

      splitPaths.push('M' + subPath);
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
    descent: fontBoundingBoxDescent
  };
}

function getParentBox(glyphPaths, height, strokeWidth, fontSize) {
  var offsetX, offsetY, width;

  var xMinMax = getXMinMax(glyphPaths);

  offsetX = xMinMax.min - strokeWidth / 2 - 5;
  width = xMinMax.max + strokeWidth / 2 - offsetX + 5;

  offsetY = -strokeWidth - fontSize / 15;
  height = height - offsetY + strokeWidth * 2;

  return {
    offsetX: offsetX,
    offsetY: offsetY,
    width: width,
    height: height,
    viewBox: [offsetX, offsetY, width, height].join(' ')
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
    max: svgMaxX
  };
}

/* harmony default export */ __webpack_exports__["a"] = TextPaths;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maybe_polyfill__ = __webpack_require__(2);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__maybe_polyfill__["a" /* default */])(init);

function init(svgDashOffsetCSSAnimationSupported) {
  var configs = componentConfigs(document.getElementsByClassName('drawing-panel')[0], document.getElementsByClassName('options-panel')[0], svgDashOffsetCSSAnimationSupported);

  return new __WEBPACK_IMPORTED_MODULE_0__app__["a" /* default */](configs);
}

function componentConfigs(elDrawingPanel, elOptionsPanel, svgDashOffsetCSSAnimationSupported) {
  return {
    drawConfig: {
      userText: 'Hello world!',
      fontUrl: 'https://fonts.gstatic.com/s/lobster/v18/TSDaXhyJuDJ-NBU0popSWA.ttf',
      fontName: 'Lobster',
      fontSize: 182,
      strokeWidth: 3,
      animationDuration: 4,
      strokeColor: '#F5F3F5',
      backgroundColor: '#576CA8'
    },

    drawingPanel: {
      elDrawingPanel: elDrawingPanel,
      elSvgContainer: elDrawingPanel.getElementsByClassName('svg-container')[0],
      svgDashOffsetCSSAnimationSupported: svgDashOffsetCSSAnimationSupported
    },

    optionsPanel: {
      elOptionsPanel: elOptionsPanel,
      elForm: elOptionsPanel.getElementsByTagName('form')[0],
      elUserText: elOptionsPanel.querySelector('[name=user-text]'),
      elFontSize: elOptionsPanel.querySelector('[name=font-size]'),
      elStrokeWidth: elOptionsPanel.querySelector('[name=stroke-width]'),
      elAnimationDuration: elOptionsPanel.querySelector('[name=animation-duration]'),
      elStrokeColor: elOptionsPanel.querySelector('[name=stroke-color]'),
      elBackgroundColor: elOptionsPanel.querySelector('[name=background-color]'),
      elDrawSubmit: elOptionsPanel.querySelector('[type=submit]'),

      fontChangePanel: {
        elFont: elOptionsPanel.querySelector('[name=current-font'),
        elFontChangePanel: elOptionsPanel.querySelector('.font-change-panel'),
        elFontChangePanelClose: elOptionsPanel.querySelector('.font-change-panel .js-close'),
        elFontUpload: elOptionsPanel.querySelector('[name=font-upload')
      },

      googleFonts: {
        elGoogleFonts: elOptionsPanel.querySelector('[name=google-fonts]'),
        elRandomFont: elOptionsPanel.querySelector('[name=random-font]'),
        elVariants: elOptionsPanel.querySelector('[name=variants]'),
        elWeights: elOptionsPanel.querySelector('[name=weights]'),
        variant: 'normal',
        weight: '400',
        fonts: {}
      }
    },

    exportPanel: {
      elExportPanel: document.querySelector('.export-panel'),
      elExportOpen: document.querySelector('.export-panel__open'),
      elExportClose: document.querySelector('.export-panel__close'),
      elSvgCopy: document.querySelector('.export-panel__svg-copy'),
      elPopupPreview: document.querySelector('.export-panel__pop-up-preview'),
      elDownloadLink: document.querySelector('.export-panel__download'),
      elAnimationTypeToggle: document.querySelector('[name=use-js-animation]'),
      elSvgSize: document.querySelector('.js-svg-size'),
      elTotalSize: document.querySelector('.js-total-size')
    }
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map