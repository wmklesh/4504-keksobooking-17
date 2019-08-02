'use strict';

(function () {
  var mapForm = window.map.mapSection.querySelector('.map__filters');
  var mapFormFields = mapForm.querySelectorAll('select, fieldset');

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');

  var onAdFormPriceInputChange = function (evt) {
    var minPrice = window.types.OfferTypesToMinPrice[evt.target.value];

    adFormPriceInput.min = minPrice;
    adFormPriceInput.placeholder = minPrice;
  };

  var onAdFormTimeInSelectChange = function () {
    adFormTimeInSelect.value = adFormTimeOutSelect.value;
  };

  var onAdFormTimeOutSelectChange = function () {
    adFormTimeOutSelect.value = adFormTimeInSelect.value;
  };

  var renderAddress = function (location) {
    adFormAddressInput.value = location.x + ', ' + location.y;
  };

  var activate = function () {
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

  var deactivate = function () {
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

  window.form = {
    activate: activate,
    deactivate: deactivate,
    renderAddress: renderAddress,
  };
})();
