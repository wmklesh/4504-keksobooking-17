'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mapMainPin = mapSection.querySelector('.map__pin--main');

  var getMapMainPinPosition = function () {
    return {
      x: mapMainPin.offsetLeft + window.types.MainPinSize.RADIUS,
      y: mapMainPin.offsetTop + window.types.MainPinSize.HEIGHT,
    };
  };

  var onMapMainPinDrag = function (evt) {
    evt.preventDefault();

    var start = {
      x: mapMainPin.offsetLeft,
      y: mapMainPin.offsetTop,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (window.types.pageIsActive === false) {
        window.page.activate();
        window.data.loadPinsData();
      }

      var shift = {
        x: moveEvt.clientX - evt.clientX,
        y: moveEvt.clientY - evt.clientY,
      };


      mapMainPin.style.top = Math.min(Math.max(start.y + shift.y, window.types.MainPinCoordinateLimit.Y.MIN), window.types.MainPinCoordinateLimit.Y.MAX) + 'px';
      mapMainPin.style.left = Math.min(Math.max(start.x + shift.x, window.types.MainPinCoordinateLimit.X.MIN), window.types.MainPinCoordinateLimit.X.MAX) + 'px';

      window.form.renderAddress(getMapMainPinPosition());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pin = {
    mapMainPin: mapMainPin,
    onMapMainPinDrag: onMapMainPinDrag,
    getMapMainPinPosition: getMapMainPinPosition,
  };
})();
