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
  hidePanel: hidePanel,
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
    if (
      typeof el.className === 'string' && (
        el.className.indexOf('font-change-panel') > -1 ||
        el.className.indexOf('autocomplete-suggestions') > -1 ||
        el.className.indexOf('current-font') > -1
      )
    ) {
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

export default FontChangePanel;
