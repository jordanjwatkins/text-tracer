import animateTracing from './animate-tracing'

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
  htmlStart: htmlStart,
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

  html = [
    this.htmlStart(),
  ];

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

  svgLength = (this.cssAnimate) ? this.dashedSvg.length : this.svg.length;

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
    if (
      typeof el.className === 'string' &&
      el.className.indexOf('export-panel') > -1
    ) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

function jsAnimationCode() {
  return [
    '<script>',
    animateTracing.sync,
    this.jsTraceInitCode(),
    this.jsClickToRestartCode(),
    '</script>',
  ].join('\n');
}

/* eslint-disable indent */
function jsTraceInitCode() {
  var animationDurationMs = this.drawConfig.animationDuration * 1000;

  return [
    '\nvar elSvg = document.getElementById("svg");',
    'var elSvgPaths = elSvg.childNodes;',
    'var animator = syncPathDashOffsetAnimate(elSvgPaths, ' + animationDurationMs + ');',
  ].join('\n');
}

function jsClickToRestartCode() {
  return [
    '\nelSvg.addEventListener("click", function (event) {',
      '\tanimator.restart();',
    '});',
  ].join('\n');
}

function cssClickToRestartCode() {
  return [
    '<script>',
    'var elSvg = document.getElementById("svg");\n',

    'elSvg.addEventListener("click", function (event) {',
      '\telSvg.classList.remove("is-tracing");\n',

      '\tsetTimeout(function () {',
        '\t\telSvg.classList.add("is-tracing");',
      '\t}, 0);',
    '});',
    '</script>',
  ].join('\n');
}

function htmlStart() {
  var html = [
    '<!DOCTYPE html>\n',
    '<title>Text Tracer Export</title>\n',
    '<style>',
      '\tbody { background-color: ' + this.drawConfig.backgroundColor + '; }',
      '\tsvg { stroke: ' + this.drawConfig.strokeColor + '; overflow: visible; }',
  ];

  if (this.cssAnimate) {
    html.push('\t.is-tracing path { animation: trace ' + this.drawConfig.animationDuration + 's linear forwards; }');
    html.push('\t@keyframes trace { to { stroke-dashoffset: 0; } }');
  }

  html.push('</style>');

  return html.join('\n');
}
/* eslint-enable indent */

export default ExportPanel;
