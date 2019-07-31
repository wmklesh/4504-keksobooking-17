'use strict';

(function () {
  var OFFERS_COUNT = 8;

  var offerTypesToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var map = document.querySelector('.map');

  var MapScope = {
    X: {
      MIN: Pin.WIDTH / 2,
      MAX: map.clientWidth - (Pin.WIDTH / 2),
    },
    Y: {
      MIN: 130,
      MAX: 630,
    },
  };

  var pageIsActive = false;

  window.data = {
    OFFERS_COUNT: OFFERS_COUNT,
    offerTypesToMinPrice: offerTypesToMinPrice,
    Pin: Pin,
    MainPin: MainPin,
    map: map,
    MapScope: MapScope,
    pageIsActive: pageIsActive,
  };
})();
