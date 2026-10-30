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

/* Small things */
  $$('img').forEach((img) => img.addEventListener('error', () => img.classList.add('broken')));
  $('#year').textContent = new Date().getFullYear();

})