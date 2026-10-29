(() => {
  const duration = 160;
  let menuTimer;

  window.openMenu = () => {
    const overlay = document.getElementById('menuOverlay');
    if (!overlay) return;

    clearTimeout(menuTimer);
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('is-visible'));
    });
  };

  window.closeMenu = () => {
    const overlay = document.getElementById('menuOverlay');
    if (!overlay) return;

    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');

    menuTimer = setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, duration);
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return;

    event.preventDefault();
    document.body.classList.add('page-is-leaving');
    setTimeout(() => window.location.assign(destination.href), duration);
  });

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-is-leaving');
  });
})();
