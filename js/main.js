'use strict';

var OFFERS_COUNT = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var Pin = {
  WIDTH: 50,
  HEIGHT: 70,
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generationOffer = function (id) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (id + 1) + '.png',
    },
    offer: {
      type: getRandomItem(OFFER_TYPES),
    },
    location: {
      x: getRandomNumber(MapScope.X.MIN, MapScope.X.MAX),
      y: getRandomNumber(MapScope.Y.MIN, MapScope.Y.MAX),
    },
  };
};

var getOffers = function (count) {
  var offersList = [];

  for (var i = 0; i < count; i++) {
    offersList[i] = generationOffer(i);
  }

  return offersList;
};

var createPin = function (offer) {
  var pin = mapPin.cloneNode(true);
  var image = pin.querySelector('img');

  pin.style.left = (offer.location.x - Pin.WIDTH / 2) + 'px';
  pin.style.top = (offer.location.y - Pin.HEIGHT) + 'px';
  image.src = offer.author.avatar;
  image.alt = offer.offer.type;

  return pin;
};

var renderPins = function (target, pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  target.appendChild(fragment);
};

map.classList.remove('map--faded');
renderPins(mapPins, getOffers(OFFERS_COUNT));
