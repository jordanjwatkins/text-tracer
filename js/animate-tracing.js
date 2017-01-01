function syncPathDashOffsetAnimate(paths, duration) {
  var delta = 0;
  var lastTimestamp;
  var pathLength;
  var updateHandle;

  duration = duration || 2000;

  initializePaths(paths);
  start();

  return {
    stop: stop,
    start: start,
    restart: restart,
  };

  function initializePaths() {
    Array.prototype.forEach.call(paths, function (elPath) {
      pathLength = elPath.getTotalLength();

      elPath.style.strokeDashoffset = pathLength;
      elPath.style.strokeDasharray = pathLength + ', ' + pathLength;

      elPath.dashSpeed = pathLength / duration;
    });
  }

  function update(timestamp) {
    if (!shouldUpdate()) return;

    if (lastTimestamp) {
      delta = timestamp - lastTimestamp;
    }

    lastTimestamp = timestamp;

    updatePaths();

    updateHandle = requestAnimationFrame(update);
  }

  function shouldUpdate() {
    return !(!paths[0] || paths[0].style.strokeDashoffset <= 0);
  }

  function updatePaths() {
    Array.prototype.forEach.call(paths, function (elPath) {
      elPath.style.strokeDashoffset -= delta * elPath.dashSpeed;

      if (elPath.style.strokeDashoffset <= 0) {
        elPath.style.strokeDashoffset = 0;
      }
    });
  }

  function stop() {
    cancelAnimationFrame(updateHandle);
  }

  function start() {
    lastTimestamp = 0;
    updateHandle = requestAnimationFrame(update);
  }

  function restart() {
    initializePaths(paths);
    start();
  }
}

export default {
  sync: syncPathDashOffsetAnimate,
};
