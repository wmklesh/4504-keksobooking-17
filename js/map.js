'use strict';

(function () {
  var mapMainPin = window.pin.mapPins.querySelector('.map__pin--main');

  var coordinateLimit = function (coordinate, min, max) {
    return Math.min(Math.max(coordinate, min), max);
  };

  var onMapMainPinDrag = function (evt) {
    evt.preventDefault();

    var start = {
      x: mapMainPin.offsetLeft,
      y: mapMainPin.offsetTop,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (window.data.pageIsActive === false) {
        window.page.activate();
        window.pin.render(window.pin.mapPins, window.pin.getList(window.data.OFFERS_COUNT));
      }

      var shift = {
        x: moveEvt.clientX - evt.clientX,
        y: moveEvt.clientY - evt.clientY,
      };

      mapMainPin.style.top = coordinateLimit(start.y + shift.y, window.data.MapScope.Y.MIN - window.data.MainPin.HEIGHT / 2, window.data.MapScope.Y.MAX - window.data.MainPin.HEIGHT / 2) + 'px';
      mapMainPin.style.left = coordinateLimit(start.x + shift.x, window.data.MapScope.X.MIN - window.data.MainPin.WIDTH / 2, window.data.MapScope.X.MAX - window.data.MainPin.WIDTH / 2) + 'px';

      window.form.renderAddress(window.pin.getMapMainPinButtonPosition());

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
  };

  mapMainPin.addEventListener('mousedown', onMapMainPinDrag);

  window.map = {
    mapMainPin: mapMainPin,
  };
})();
