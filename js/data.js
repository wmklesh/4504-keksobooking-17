'use strict';

(function () {
  var onLoadPins = function (data) {
    window.map.renderPins(data);
  };

  var onErrorLoadPins = function (errorMessage) {
    window.message.error(errorMessage, function () {
      loadPinsData();
    });
  };

  var loadPinsData = function () {
    window.backend.load(onErrorLoadPins, onLoadPins);
  };

  window.data = {
    loadPinsData: loadPinsData,
  };
})();
