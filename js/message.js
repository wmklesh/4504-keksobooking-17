'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var error = function (errorMessage, callback) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorElement);

    var onButtonClick = function () {
      close();

      if (callback !== undefined) {
        callback();
      }
    };

    var close = function () {
      mainElement.removeChild(errorElement);
      errorElement.querySelector('.error__button').removeEventListener('click', onButtonClick);
    };

    errorElement.querySelector('.error__button').addEventListener('click', onButtonClick);
  };

  window.message = {
    error: error,
  };
})();
