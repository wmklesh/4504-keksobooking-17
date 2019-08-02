'use strict';

(function () {
  var Request = {
    TIMEOUT: 1000,
    TYPE: 'json',
    Url: {
      GET: 'https://js.dump.academy/keksobooking/data',
      POST: 'https://js.dump.academy/keksobooking',
    },
    Method: {
      GET: 'GET',
      POST: 'POST',
    },
  };

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25,
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 33,
  };

  var MapScope = {
    X: {
      MIN: 0,
      MAX: 1200,
    },
    Y: {
      MIN: 130,
      MAX: 630,
    },
  };

  var MainPinCoordinateLimit = {
    X: {
      MIN: MapScope.X.MIN - MainPinSize.RADIUS,
      MAX: MapScope.X.MAX - MainPinSize.RADIUS,
    },
    Y: {
      MIN: MapScope.Y.MIN - MainPinSize.HEIGHT,
      MAX: MapScope.Y.MAX - MainPinSize.HEIGHT,
    },
  };

  var OfferTypesToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var pageIsActive = false;

  window.types = {
    Request: Request,
    PinSize: PinSize,
    MainPinSize: MainPinSize,
    MapScope: MapScope,
    MainPinCoordinateLimit: MainPinCoordinateLimit,
    OfferTypesToMinPrice: OfferTypesToMinPrice,
    pageIsActive: pageIsActive,
  };
})();
