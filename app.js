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
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  toggle.addEventListener('click', () => setOpen(!isOpen));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
})();

// Gallery: single reusable pair-dialog (before/after together) with next/prev
// stepping between pairs, plus a separate full-size zoom dialog per photo.
(function () {
  const GALLERY_ITEMS = [
    {
      title: 'Gyári állapot visszaállítása.',
      before: {
        src: 'assets/gallery/gallery-01-before.jpg',
        caption: 'A sérülés eredeti állapota - mély horpadás az élen.',
      },
      after: {
        src: 'assets/gallery/gallery-01-after.jpg',
        caption: 'A végleges eredmény - tökéletesen sima felület fényezés nélkül.',
      },
    },
    {
      title: 'Komplex jégkár javítás',
      before: {
        src: 'assets/gallery/gallery-02-before.jpg',
        caption: 'Számos kisebb horpadás a motorháztetőn a jégkár után.',
      },
      after: {
        src: 'assets/gallery/gallery-02-after.jpg',
        caption: 'Minden horpadás nyom nélkül eltávolítva, gyári fény megmaradt.',
      },
    },
    {
      title: 'Élmenti horpadás helyreállítása',
      before: {
        src: 'assets/gallery/gallery-03-before.jpg',
        caption: 'Mély horpadások sárvédő íven, ami nagy odafigyelést igényel.',
      },
      after: {
        src: 'assets/gallery/gallery-03-after.jpg',
        caption: 'A javítás után a felület újra tökéletesen sima, fényezés nélkül.',
      },
    },
    {
      title: 'Motorháztető precíziós javítása',
      before: {
        src: 'assets/gallery/gallery-04-before.jpg',
        caption: 'Nagyméretű horpadás a motorháztetőn, töréssel az él mentén.',
      },
      after: {
        src: 'assets/gallery/gallery-04-after.jpg',
        caption: 'Látványos végeredmény - a motorháztető visszanyerte eredeti formáját.',
      },
    },
    {
      title: 'Oldalpanel precíziós javítása',
      before: {
        src: 'assets/gallery/gallery-05-before.jpg',
        caption: 'Mély, éles horpadás az oldalpanelen, ami speciális PDR technikát igényelt.',
      },
      after: {
        src: 'assets/gallery/gallery-05-after.jpg',
        caption: 'A javítás után a felület újra tökéletes, mintha sosem történt volna sérülés.',
      },
    },
    {
      title: 'Nagyfelületű oldalpanel javítás',
      before: {
        src: 'assets/gallery/gallery-06-before.jpg',
        caption: 'Kiterjedt, nagyméretű horpadás Mercedes V-Class oldalpanelén.',
      },
      after: {
        src: 'assets/gallery/gallery-06-after.jpg',
        caption: 'Tökéletes, fényezés nélküli helyreállítás, az autó visszanyerte gyári állapotát.',
      },
    },
    {
      title: 'Tetőlap horpadásainak eltávolítása',
      before: {
        src: 'assets/gallery/new-01-before.jpg',
        caption: 'A tető felületén több horpadás is jól látszik a diagnosztikai fény megtört vonalain.',
      },
      after: {
        src: 'assets/gallery/new-01-after.jpg',
        caption: 'A javítás után a fénycsík törésmentesen, egyenletesen fut végig a tetőn.',
      },
    },
    {
      title: 'Sárvédő horpadásának javítása',
      before: {
        src: 'assets/gallery/new-02-before.jpg',
        caption: 'Jól látható horpadás a sárvédő élén, közvetlenül a kerékjárat felett.',
      },
      after: {
        src: 'assets/gallery/new-02-after.jpg',
        caption: 'A javítás után a felület nyom nélkül, gyári fényben pompázik.',
      },
    },
    {
      title: 'Hátsó sárvédő horpadásának javítása',
      before: {
        src: 'assets/gallery/new-03-before.jpg',
        caption: 'Horpadás a hátsó sárvédőn, közvetlenül a lámpa mellett.',
      },
      after: {
        src: 'assets/gallery/new-03-after.jpg',
        caption: 'A javítás után a fénymintázat törés nélkül, egyenletesen fut a karosszérián.',
      },
    },
    {
      title: 'Oldalajtó horpadásának javítása',
      before: {
        src: 'assets/gallery/new-04-before.jpg',
        caption: 'Horpadás az oldalajtó felső részén, a tükör közelében.',
      },
      after: {
        src: 'assets/gallery/new-04-after.jpg',
        caption: 'A javítás után a panel újra sima, a fényvonal egyenesen fut végig rajta.',
      },
    },
    {
      title: 'Nagyfelületű hátsó sárvédő javítása',
      before: {
        src: 'assets/gallery/new-05-before.jpg',
        caption: 'Kiterjedt horpadás a hátsó sárvédő felületén.',
      },
      after: {
        src: 'assets/gallery/new-05-after.jpg',
        caption: 'A végeredmény: sima, horpadásmentes felület, tökéletes fényvisszaverődéssel.',
      },
    },
  ];

  const galleryDialog = document.getElementById('gallery-dialog');
  const zoomDialog = document.getElementById('zoom-dialog');
  if (!galleryDialog || !zoomDialog) return;

  const titleEl = document.getElementById('gallery-dialog-title');
  const counterEl = document.getElementById('gallery-dialog-counter');
  const beforeImgEl = document.getElementById('gallery-dialog-before-img');
  const beforeCaptionEl = document.getElementById('gallery-dialog-before-caption');
  const afterImgEl = document.getElementById('gallery-dialog-after-img');
  const afterCaptionEl = document.getElementById('gallery-dialog-after-caption');
  const zoomImgEl = document.getElementById('zoom-dialog-img');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  let currentIndex = 0;

  function render(index) {
    currentIndex = ((index % GALLERY_ITEMS.length) + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const item = GALLERY_ITEMS[currentIndex];
    titleEl.textContent = 'Eredmény: ' + item.title;
    counterEl.textContent = (currentIndex + 1) + ' / ' + GALLERY_ITEMS.length;
    beforeImgEl.src = item.before.src;
    beforeCaptionEl.textContent = item.before.caption;
    afterImgEl.src = item.after.src;
    afterCaptionEl.textContent = item.after.caption;
  }

  function openGallery(index) {
    render(index);
    if (!galleryDialog.open) galleryDialog.showModal();
  }

  function step(delta) {
    render(currentIndex + delta);
  }

  document.querySelectorAll('[data-gallery-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openGallery(parseInt(trigger.getAttribute('data-gallery-open'), 10) || 0);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => step(1));

  // Keyboard navigation while the pair dialog is open (and the zoom dialog isn't on top of it)
  galleryDialog.addEventListener('keydown', (e) => {
    if (zoomDialog.open) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });

  // Simple touch swipe support for next/prev on mobile
  let touchStartX = null;
  galleryDialog.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  galleryDialog.addEventListener('touchend', (e) => {
    if (touchStartX === null || zoomDialog.open) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 40) return;
    step(dx > 0 ? -1 : 1);
  }, { passive: true });

  // Zoom: clicking either photo opens it enlarged in its own dialog
  document.querySelectorAll('[data-zoom-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img) return;
      zoomImgEl.src = img.src;
      zoomImgEl.alt = img.alt;
      zoomDialog.showModal();
    });
  });
  // Clicking the enlarged photo itself also closes the zoom view (cursor: zoom-out)
  zoomImgEl.addEventListener('click', () => zoomDialog.close());

  // Shared close behavior for all lightbox-style dialogs: a genuine backdrop click
  // always fires the click event with target === the dialog element itself (never a
  // descendant), so this works correctly even for content that visually overflows the
  // dialog box (like the prev/next nav buttons).
  document.querySelectorAll('dialog.lightbox').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.querySelectorAll('[data-close-dialog]').forEach((btn) =>
      btn.addEventListener('click', () => dialog.close())
    );
  });
})();
