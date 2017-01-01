/* global autoComplete */

function GoogleFontsAutocompleteField(onSelect, fonts) {
  this.onSelect = onSelect;
  this.setFonts(fonts);
}

GoogleFontsAutocompleteField.prototype = {
  setFonts: setFonts,
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

    onSelect: this.onSelect,
  });
}

export default GoogleFontsAutocompleteField;
