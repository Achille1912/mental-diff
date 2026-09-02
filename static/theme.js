// Toggle chiaro/scuro esplicito, scelto dall'utente (non dal sistema).
// L'attributo data-theme viene già impostato in modo sincrono da uno
// script inline nel <head>, prima del CSS, per evitare il flash di tema
// sbagliato; questo file gestisce solo il click e il testo del bottone.
(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncGiscus(theme) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
      'https://giscus.app'
    );
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? 'dark' : 'light';
    syncGiscus(theme);
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(current());
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(current() === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();
