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

  // Close the menu after jumping to a section on this page
  $$('.nav a[href*="#"]').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeSubs();
    })
  );

  /* Document search: hides rows that don't match, and sections left empty */
  const input = $('#doc-filter');
  const status = $('#doc-status');
  const items = $$('[data-doc]');
  const sections = $$('.doc-sec');

  const run = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;

    items.forEach((el) => {
      const hay = `${el.dataset.doc} ${el.textContent}`.toLowerCase();
      const hit = !q || hay.includes(q);
      el.hidden = !hit;
      if (hit) shown++;
    });

    sections.forEach((s) => {
      s.hidden = ![...s.querySelectorAll('[data-doc]')].some((el) => !el.hidden);
    });

    status.textContent = !q
      ? ''
      : shown
        ? `${shown} ${shown === 1 ? 'match' : 'matches'}`
        : 'No documents match that search.';
  };

  input.addEventListener('input', run);

  /* Small things */
  $$('img').forEach((img) => img.addEventListener('error', () => img.classList.add('broken')));
  $('#year').textContent = new Date().getFullYear();
})();