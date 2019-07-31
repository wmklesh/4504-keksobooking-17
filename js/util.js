'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
  };
})();
