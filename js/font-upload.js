function FontUploadField(elFontUpload) {
  this.el = elFontUpload;

  this.attachEventHandlers();
}

FontUploadField.prototype = {
  attachEventHandlers: attachEventHandlers,
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

  var fontName = event.target.value
    .replace(/.*\\/, '')
    .replace(/\..*/, '');

  var file = event.target.files[0];

  readFileUploadAsDataURL(file, function (fontUrl) {
    _this.el.dispatchEvent(new CustomEvent('uploadSuccess', {
      detail: {
        fontName: fontName,
        fontUrl: fontUrl,
      },
    }));
  });

  this.el.dispatchEvent(new CustomEvent('uploadStart', {
    detail: {
      fontName: fontName,
    },
  }));

  event.target.value = '';
}

function readFileUploadAsDataURL(file, callback) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var url = event.target.result;

    callback(url);
  }

  reader.readAsDataURL(file);
}

export default FontUploadField;
