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

  /* Board roles: expand or collapse all */
  const roles = $$('.roles details');
  const all = $('#toggle-roles');
  const sync = () => {
    all.textContent = roles.every((d) => d.open) ? 'Collapse all' : 'Expand all';
  };
  all.addEventListener('click', () => {
    const openAll = !roles.every((d) => d.open);
    roles.forEach((d) => { d.open = openAll; });
    sync();
  });
  roles.forEach((d) => d.addEventListener('toggle', sync));

  // Opening the page at #structure from the menu: nothing to expand, but keep the label right
  sync();

  /* Promotional video: loads only when played, once a YouTube ID is set */
  const promo = $('#promo');
  const vid = promo && promo.dataset.youtube;
  if (vid) {
    promo.innerHTML =
      `<button class="video-play" type="button" aria-label="Play the promotional video">` +
      `<img src="https://i.ytimg.com/vi/${vid}/hqdefault.jpg" alt=""><span>Play</span></button>`;
    promo.querySelector('button').addEventListener('click', () => {
      promo.innerHTML =
        `<iframe src="https://www.youtube-nocookie.com/embed/${vid}?autoplay=1" ` +
        `title="EASA Lund promotional video 2020" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  /* Small things */
  $$('img').forEach((img) => img.addEventListener('error', () => img.classList.add('broken')));
  $('#year').textContent = new Date().getFullYear();
})();