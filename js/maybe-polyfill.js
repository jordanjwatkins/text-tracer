import checkSvgDashOffsetCSSAnimationSupport from './check-svg-dash-offset-css-animation-support'

function maybePolyfill(callback) {
  checkSvgDashOffsetCSSAnimationSupport(function (svgDashOffsetCSSAnimationSupported) {
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

export default maybePolyfill;
