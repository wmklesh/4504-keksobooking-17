'use strict';

(function () {
  var activate = function () {
    window.types.pageIsActive = true;
    window.form.activate();
    window.map.activate();
  };

  var deactivate = function () {
    window.types.pageIsActive = false;
    window.form.deactivate();
    window.map.deactivate();
  };

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})();
