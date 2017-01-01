import FontChangePanel from './font-change-panel';
import FontUploadField from './font-upload';
import GoogleFonts from './google-fonts';

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
  onSubmit: onSubmit,
};

function initChildComponents(config) {
  this.fontChangePanel = new FontChangePanel(config.fontChangePanel, config.googleFonts.elGoogleFonts, config.googleFonts.elVariants);
  this.fontUploadField = new FontUploadField(config.fontChangePanel.elFontUpload);
  this.googleFonts = new GoogleFonts(config.googleFonts);
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
    _this.useFont(
      _this.googleFonts.fontName,
      _this.googleFonts.fontUrl
    );
  });
}

function onSubmit(event) {
  if (this.googleFonts.fonts[this.drawConfig.fontName]) {
    event.stopPropagation();

    // in case initially loaded font is a google font
    this.googleFonts.fontName = this.drawConfig.fontName;

    this.googleFonts.useFont();
  } else {
    this.useFont(
      this.drawConfig.fontName,
      this.drawConfig.fontUrl
    );
  }
}

function useFont(fontName, fontUrl) {
  this.drawConfig.fontName = fontName;
  this.drawConfig.fontUrl = fontUrl;

  this.fontChangePanel.elFont.innerHTML = fontName;

  this.elOptionsPanel.dispatchEvent(new Event('submit'));
}

export default OptionsPanel;
