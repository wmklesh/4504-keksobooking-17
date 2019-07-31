'use strict';

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
var mapPins = document.querySelector('.map__pins');
var mapMainPin = mapPins.querySelector('.map__pin--main');
var mapPinOffer = document.querySelector('#pin').content.querySelector('.map__pin');

var mapForm = map.querySelector('.map__filters');
var mapFormFields = mapForm.querySelectorAll('select, fieldset');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTimeInSelect = adForm.querySelector('#timein');
var adFormTimeOutSelect = adForm.querySelector('#timeout');

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

var mapActive = false;

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
      type: getRandomItem(Object.keys(offerTypesToMinPrice)),
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
  var pin = mapPinOffer.cloneNode(true);
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

var activatePage = function () {
  mapActive = true;
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < mapFormFields.length; i++) {
    mapFormFields[i].disabled = false;
  }

  for (var j = 0; j < adFormFields.length; j++) {
    adFormFields[j].disabled = false;
  }

  adFormTypeSelect.addEventListener('change', onAdFormPriceInputChange);
  adFormTimeInSelect.addEventListener('change', onAdFormTimeOutSelectChange);
  adFormTimeOutSelect.addEventListener('change', onAdFormTimeInSelectChange);
};

var deactivatePage = function () {
  mapActive = false;
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  for (var i = 0; i < mapFormFields.length; i++) {
    mapFormFields[i].disabled = true;
  }

  for (var j = 0; j < adFormFields.length; j++) {
    adFormFields[j].disabled = true;
  }

  adFormTypeSelect.removeEventListener('change', onAdFormPriceInputChange);
  adFormTimeInSelect.removeEventListener('change', onAdFormTimeOutSelectChange);
  adFormTimeOutSelect.removeEventListener('change', onAdFormTimeInSelectChange);
};

var getMapMainPinButtonPosition = function () {
  return {
    x: mapMainPin.offsetLeft + Math.ceil(MainPin.WIDTH / 2),
    y: mapMainPin.offsetTop + Math.ceil(MainPin.HEIGHT / 2),
  };
};

var renderAdFormAddress = function (location) {
  adFormAddressInput.value = location.x + ', ' + location.y;
};

var onAdFormPriceInputChange = function (evt) {
  var minPrice = offerTypesToMinPrice[evt.target.value];

  adFormPriceInput.min = minPrice;
  adFormPriceInput.placeholder = minPrice;
};

var onAdFormTimeInSelectChange = function () {
  adFormTimeInSelect.value = adFormTimeOutSelect.value;
};

var onAdFormTimeOutSelectChange = function () {
  adFormTimeOutSelect.value = adFormTimeInSelect.value;
};

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

    if (mapActive === false) {
      activatePage();
      renderPins(mapPins, getOffers(OFFERS_COUNT));
    }

    var shift = {
      x: moveEvt.clientX - evt.clientX,
      y: moveEvt.clientY - evt.clientY,
    };

    mapMainPin.style.top = coordinateLimit(start.y + shift.y, MapScope.Y.MIN - MainPin.HEIGHT / 2, MapScope.Y.MAX - MainPin.HEIGHT / 2) + 'px';
    mapMainPin.style.left = coordinateLimit(start.x + shift.x, MapScope.X.MIN - MainPin.WIDTH / 2, MapScope.X.MAX - MainPin.WIDTH / 2) + 'px';

    renderAdFormAddress(getMapMainPinButtonPosition());

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
};

deactivatePage();

mapMainPin.addEventListener('mousedown', onMapMainPinDrag);
