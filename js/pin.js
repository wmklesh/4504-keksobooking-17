'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var mapPinOffer = document.querySelector('#pin').content.querySelector('.map__pin');

  var generation = function (id) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (id + 1) + '.png',
      },
      offer: {
        type: window.util.getRandomItem(Object.keys(window.data.offerTypesToMinPrice)),
      },
      location: {
        x: window.util.getRandomNumber(window.data.MapScope.X.MIN, window.data.MapScope.X.MAX),
        y: window.util.getRandomNumber(window.data.MapScope.Y.MIN, window.data.MapScope.Y.MAX),
      },
    };
  };

  var getList = function (count) {
    var offersList = [];

    for (var i = 0; i < count; i++) {
      offersList[i] = generation(i);
    }

    return offersList;
  };

  var create = function (offer) {
    var pin = mapPinOffer.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (offer.location.x - window.data.Pin.WIDTH / 2) + 'px';
    pin.style.top = (offer.location.y - window.data.Pin.HEIGHT) + 'px';
    image.src = offer.author.avatar;
    image.alt = offer.offer.type;

    return pin;
  };

  var render = function (target, pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(create(pins[i]));
    }

    target.appendChild(fragment);
  };

  var getMapMainPinButtonPosition = function () {
    return {
      x: window.map.mapMainPin.offsetLeft + Math.ceil(window.data.MainPin.WIDTH / 2),
      y: window.map.mapMainPin.offsetTop + Math.ceil(window.data.MainPin.HEIGHT / 2),
    };
  };

  window.pin = {
    mapPins: mapPins,
    getList: getList,
    render: render,
    getMapMainPinButtonPosition: getMapMainPinButtonPosition,
  };
})();
