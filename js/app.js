import DrawingPanel from './drawing-panel';
import OptionsPanel from './options-panel';
import ExportPanel from './export-panel';
import StyleBlock from './style-block';

function TextTracerApp(configs) {
  this.initComponents(configs);
  this.attachEventHandlers(configs.drawConfig);

  this.drawConfig = configs.drawConfig;

  this.drawingPanel.draw();
}

TextTracerApp.prototype = {
  initComponents: initComponents,
  attachEventHandlers: attachEventHandlers,
};

function initComponents(configs) {
  this.optionsPanel = new OptionsPanel(configs.optionsPanel, configs.drawConfig);
  this.drawingPanel = new DrawingPanel(configs.drawingPanel, configs.drawConfig);

  this.exportPanel = new ExportPanel(configs.exportPanel, configs.drawConfig);
  this.styleBlock = new StyleBlock(configs.drawConfig);
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

export default TextTracerApp;
