'use strict';

(function () {
  var createRequest = function (onError, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = window.types.Request.TYPE;
    xhr.timeout = window.types.Request.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        return;
      }

      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время выполнения запроса превысило ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var load = function (onError, onLoad) {
    var xhr = createRequest(onError, onLoad);
    xhr.open(window.types.Request.Method.GET, window.types.Request.Url.GET);
    xhr.send();
  };

  var save = function (data, onError, onLoad) {
    var xhr = createRequest(onError, onLoad);
    xhr.open(window.types.Request.Method.POST, window.types.Request.Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
