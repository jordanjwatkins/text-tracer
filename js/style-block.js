function StyleBlock(drawConfig) {
  this.elStyle = document.createElement('style');

  this.drawConfig = drawConfig;

  this.append();
}

StyleBlock.prototype = {
  update: update,
  append: append,
}

function append() {
  document.body.appendChild(this.elStyle);
}

function update() {
  this.elStyle.innerHTML = [
    /* eslint-disable indent */
    '@font-face {',
      '\tsrc: url("'+ this.drawConfig.fontUrl + '");',
      '\tfont-family: "' + this.drawConfig.fontName + '";',
      '\tfont-style: normal;',
      '\tfont-weight: normal;',
      '\tunicode-range: U+00-FFFF;',
    '}',

    '.current-font__name,',
    '.options-panel__heading {',
      '\tfont-family: "' + this.drawConfig.fontName + '";',
    '}',

    'body {',
      '\tbackground-color: ' + this.drawConfig.backgroundColor + ';',
    '}',

    '.is-tracing path {',
      '\tanimation: dash ' + this.drawConfig.animationDuration + 's linear forwards;',
    '}',
    /* eslint-enable indent */
  ].join('\n');
}

export default StyleBlock;
