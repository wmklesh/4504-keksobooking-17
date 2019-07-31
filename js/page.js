'use strict';

(function () {
  var activate = function () {
    window.data.pageIsActive = true;
    window.form.activate();
    window.data.map.classList.remove('map--faded');
  };

  var deactivate = function () {
    window.data.pageIsActive = false;
    window.form.deactivate();
    window.data.map.classList.add('map--faded');
  };

  deactivate();

  window.page = {
    activate: activate,
  };
})();
