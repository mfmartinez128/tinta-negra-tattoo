/* ==========================================================================
   TINTA NEGRA — content-loader.js
   Lee content.json y aplica los valores a los elementos marcados con
   data-key en el HTML. Si content.json no existe o falla la carga, la
   página se queda tal cual con el contenido por defecto (sin romperse).
   ========================================================================== */

(function () {
  var SAFE_URL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'];

  function getPath(obj, path) {
    var parts = path.split('.');
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
      if (current === null || current === undefined) return undefined;
      current = current[parts[i]];
    }
    return current;
  }

  function isSafeUrl(value) {
    if (typeof value !== 'string') return false;
    if (value.charAt(0) === '#' || value.charAt(0) === '/') return true;
    try {
      var url = new URL(value, window.location.href);
      return SAFE_URL_SCHEMES.indexOf(url.protocol) !== -1;
    } catch (e) {
      return false;
    }
  }

  function applyValue(el, key, value) {
    if (value === undefined || value === null) return;

    var attr = el.getAttribute('data-key-attr');

    if (attr === 'href') {
      if (isSafeUrl(value)) el.setAttribute('href', value);
      return;
    }

    if (attr === 'bg') {
      el.style.backgroundImage = 'url(' + JSON.stringify(String(value)) + ')';
      return;
    }

    el.textContent = value;
  }

  function applyContent(content) {
    var nodes = document.querySelectorAll('[data-key]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-key');
      var value = getPath(content, key);
      applyValue(el, key, value);
    });
  }

  fetch('content.json', { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error('content.json no disponible (' + res.status + ')');
      return res.json();
    })
    .then(function (content) {
      applyContent(content);
      window.__tintaNegraContent = content; // usado por admin.html para precargar el formulario
    })
    .catch(function (err) {
      // Sin content.json la página muestra el contenido por defecto del HTML.
      console.warn('[content-loader]', err.message);
    });

  // Vista previa en vivo: admin.html puede enviar contenido en borrador (sin
  // publicar todavía) para que esta página lo muestre dentro de un <iframe>.
  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin) return;
    if (!event.data || event.data.type !== 'tinta-negra-preview') return;
    applyContent(event.data.content);
  });
})();
