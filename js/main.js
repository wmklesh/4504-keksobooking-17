'use strict';

(function () {
  window.page.deactivate();
  window.pin.mapMainPin.addEventListener('mousedown', window.pin.onMapMainPinDrag);
})();
