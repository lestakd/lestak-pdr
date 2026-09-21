// Navbar: scroll shadow + mobile menu toggle
(function () {
  const nav = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('bg-background/80', 'backdrop-blur-md', 'shadow-md', 'py-3');
      nav.classList.remove('bg-transparent', 'py-4');
    } else {
      nav.classList.remove('bg-background/80', 'backdrop-blur-md', 'shadow-md', 'py-3');
      nav.classList.add('bg-transparent', 'py-4');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');
  let isOpen = false;
  const setOpen = (open) => {
    isOpen = open;
    menu.classList.toggle('translate-x-full', !open);
    menu.classList.toggle('translate-x-0', open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  };
  toggle.addEventListener('click', () => setOpen(!isOpen));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
})();

// Gallery lightbox dialogs
(function () {
  document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.getAttribute('data-open-dialog'));
      if (dialog) dialog.showModal();
    });
  });
  document.querySelectorAll('dialog.lightbox').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
    dialog.querySelectorAll('[data-close-dialog]').forEach((btn) =>
      btn.addEventListener('click', () => dialog.close())
    );
  });
})();
