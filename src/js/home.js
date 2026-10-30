(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* Navigation */
  const toggle = $('.menu-toggle');
  const nav = $('#nav');
  const subs = $$('.has-sub > button');

  const closeSubs = (except) =>
    subs.forEach((b) => { if (b !== except) b.setAttribute('aria-expanded', 'false'); });

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', open);
    nav.classList.toggle('open', open);
  });

  subs.forEach((b) =>
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') !== 'true';
      closeSubs(b);
      b.setAttribute('aria-expanded', open);
    })
  );

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-sub')) closeSubs();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSubs();
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });

  /* Hero greeting: "Welcome" in the languages of the region */
  const greetings = [
    ['Welcome', 'English', 'en'],
    ['欢迎', 'Mandarin', 'zh-Hans'],
    ['ようこそ', 'Japanese', 'ja'],
    ['환영합니다', 'Korean', 'ko'],
    ['Selamat datang', 'Indonesian and Malay', 'id'],
    ['Chào mừng', 'Vietnamese', 'vi'],
    ['ยินดีต้อนรับ', 'Thai', 'th'],
    ['Maligayang pagdating', 'Filipino', 'fil'],
    ['Тавтай морилно уу', 'Mongolian', 'mn'],
  ];

  const word = $('#word');
  const langEl = $('#lang');
  const roll = word.parentElement;

  // Shrink long greetings so they stay on one line
  const fit = () => {
    word.style.fontSize = '';
    const k = Math.min(1, roll.clientWidth / word.scrollWidth);
    word.style.fontSize = k + 'em';
  };

  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      word.classList.add('out');
      setTimeout(() => {
        i = (i + 1) % greetings.length;
        const [text, lang, code] = greetings[i];
        word.textContent = text;
        word.lang = code;
        langEl.textContent = lang;
        fit();
        word.classList.remove('out');
        word.classList.add('pre');
        void word.offsetWidth; // restart the transition from below
        word.classList.remove('pre');
      }, 450);
    }, 3000);
  }

  /* Small things */
  $$('img').forEach((img) => img.addEventListener('error', () => img.classList.add('broken')));
  $('#year').textContent = new Date().getFullYear();
})();