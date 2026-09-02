// Toggle IT/EN condiviso: scambia il contenuto degli elementi con data-it/data-en.
// Le pagine possono registrare callback con onLangChange() per ridisegnare i contenuti dinamici.
(function () {
  const callbacks = [];
  // Nessuna scelta esplicita salvata: il blog parte in inglese di default.
  const stored = localStorage.getItem('lang');
  let lang = stored === 'it' || stored === 'en' ? stored : 'en';

  window.currentLang = () => lang;
  window.onLangChange = (fn) => { callbacks.push(fn); fn(lang); };

  function apply() {
    document.querySelectorAll('[data-it]').forEach(el => {
      el.innerHTML = el.getAttribute('data-' + lang);
    });
    document.documentElement.lang = lang;
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'it' ? 'en' : 'it';
    callbacks.forEach(fn => fn(lang));
  }

  window.formatDate = (iso) => {
    const [y, m, d] = iso.split('-');
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + +d + ', ' + y;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        lang = lang === 'it' ? 'en' : 'it';
        localStorage.setItem('lang', lang);
        apply();
      });
    }
    apply();
  });
})();
