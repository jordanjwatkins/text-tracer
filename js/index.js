import TextTracer from './app';
import maybePolyfill from './maybe-polyfill';

maybePolyfill(init);

function init(svgDashOffsetCSSAnimationSupported) {
  var configs = componentConfigs(
    document.getElementsByClassName('drawing-panel')[0],
    document.getElementsByClassName('options-panel')[0],
    svgDashOffsetCSSAnimationSupported
  );

  return new TextTracer(configs);
}

function componentConfigs(elDrawingPanel, elOptionsPanel, svgDashOffsetCSSAnimationSupported) {
  return {
    drawConfig: {
      userText: 'Hello world!',
      fontUrl: 'http://fonts.gstatic.com/s/lobster/v18/TSDaXhyJuDJ-NBU0popSWA.ttf',
      fontName: 'Lobster',
      fontSize: 182,
      strokeWidth: 3,
      animationDuration: 4,
      strokeColor: '#F5F3F5',
      backgroundColor: '#576CA8',
    },

    drawingPanel: {
      elDrawingPanel: elDrawingPanel,
      elSvgContainer: elDrawingPanel.getElementsByClassName('svg-container')[0],
      svgDashOffsetCSSAnimationSupported: svgDashOffsetCSSAnimationSupported,
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
        elFontUpload: elOptionsPanel.querySelector('[name=font-upload'),
      },

      googleFonts: {
        elGoogleFonts: elOptionsPanel.querySelector('[name=google-fonts]'),
        elRandomFont: elOptionsPanel.querySelector('[name=random-font]'),
        elVariants: elOptionsPanel.querySelector('[name=variants]'),
        elWeights: elOptionsPanel.querySelector('[name=weights]'),
        variant: 'normal',
        weight: '400',
        fonts: {},
      },
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
      elTotalSize: document.querySelector('.js-total-size'),
    },
  };
}
