'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mapPinsContainer = mapSection.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = mapPinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - window.types.PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - window.types.PinSize.HEIGHT) + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.type;

    return pin;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }

    mapPinsContainer.appendChild(fragment);
  };

  var activate = function () {
    mapSection.classList.remove('map--faded');
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.map = {
    mapSection: mapSection,
    renderPins: renderPins,
    activate: activate,
    deactivate: deactivate,
  };
})();
