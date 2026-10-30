(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const TO = 'president@asialund.org';

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

  /* Copy the email address */
  const copyBtn = $('.copy');
  if (copyBtn) {
    const label = copyBtn.textContent;
    copyBtn.addEventListener('click', async () => {
      const value = copyBtn.dataset.copy;
      let ok = true;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const t = document.createElement('textarea');
        t.value = value;
        t.style.position = 'fixed';
        t.style.opacity = '0';
        document.body.appendChild(t);
        t.select();
        ok = document.execCommand('copy');
        t.remove();
      }
      copyBtn.textContent = ok ? 'Copied' : 'Copy failed';
      setTimeout(() => { copyBtn.textContent = label; }, 2000);
    });
  }

  /* Contact form: builds an email in the visitor's own mail app (no server needed) */
  const form = $('#contact-form');
  const status = $('#form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.elements.namedItem('name');
    const name = nameInput.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
      status.textContent = 'Please add your name and a message.';
      (name ? form.message : nameInput).focus();
      return;
    }

    const subject = `${form.topic.value} (from ${name})`;
    const body = `${message}\n\n${name}`;
    window.location.href =
      `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Your email app should open. If nothing happens, write to ${TO}.`;
  });

  /* Small things */
  $$('img').forEach((img) => img.addEventListener('error', () => img.classList.add('broken')));
  $('#year').textContent = new Date().getFullYear();
})();