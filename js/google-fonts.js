import GoogleFontsAutocompleteField from './google-fonts-autocomplete';

function GoogleFonts(config) {
  Object.assign(this, config);

  this.attachEventHandlers();

  this.autoCompleteField = new GoogleFontsAutocompleteField(
    onAutoCompleteChoiceSelect.bind(this),
    this.fonts
  );

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
  attachEventHandlers: attachEventHandlers,
}

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
  return this.fonts[this.fontName]['variants'][this.variant][this.weight]['url']['woff']
    .replace('http:', 'https:');
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
    selected = (selectedValue === value) ? ' selected' : '';

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

export default GoogleFonts;
