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

// Gallery: single reusable pair-dialog (before/after together) with next/prev
// stepping between pairs, plus a separate full-size zoom dialog per photo.
(function () {
  const GALLERY_ITEMS = [
    {
      title: 'Gyári állapot visszaállítása.',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FA1__b32ca554.jpg?alt=media&token=df9de0b8-9822-444b-8080-fadc4e4327db',
        caption: 'A sérülés eredeti állapota - mély horpadás az élen.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FA2__b236c58d.jpg?alt=media&token=a6a3896b-cd45-44ae-b6c7-43efef3dd25c',
        caption: 'A végleges eredmény - tökéletesen sima felület fényezés nélkül.',
      },
    },
    {
      title: 'Komplex jégkár javítás',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FB1__9d6066eb.jpg?alt=media&token=5b6a8855-71c6-4923-8035-4f6cf4bf12de',
        caption: 'Számos kisebb horpadás a motorháztetőn a jégkár után.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FB2__f9432b07.jpg?alt=media&token=64a38539-901c-49c7-a37c-e2c25649cd5f',
        caption: 'Minden horpadás nyom nélkül eltávolítva, gyári fény megmaradt.',
      },
    },
    {
      title: 'Élmenti horpadás helyreállítása',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FC1__6de04a7d.jpg?alt=media&token=aae48aed-1017-47ec-98c6-2b5419f963b8',
        caption: 'Mély horpadások sárvédő íven, ami nagy odafigyelést igényel.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FC2__164fd358.jpg?alt=media&token=6538b272-3f55-4097-a3ad-d3a1759344fd',
        caption: 'A javítás után a felület újra tökéletesen sima, fényezés nélkül.',
      },
    },
    {
      title: 'Motorháztető precíziós javítása',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FG1__7564c641.jpg?alt=media&token=8a930cee-dd47-4194-9068-ef6bafe3d85b',
        caption: 'Nagyméretű horpadás a motorháztetőn, töréssel az él mentén.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FG2__89072b15.jpg?alt=media&token=73a321f2-db84-4202-9fe9-c359603c2ca9',
        caption: 'Látványos végeredmény - a motorháztető visszanyerte eredeti formáját.',
      },
    },
    {
      title: 'Oldalpanel precíziós javítása',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FH1__58617fa3.jpg?alt=media&token=cb2ad8c4-0740-48d5-9332-41097507ee48',
        caption: 'Mély, éles horpadás az oldalpanelen, ami speciális PDR technikát igényelt.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FH2__9d3698b1.jpg?alt=media&token=9684d44f-342a-4701-b68a-270ff80ae7a3',
        caption: 'A javítás után a felület újra tökéletes, mintha sosem történt volna sérülés.',
      },
    },
    {
      title: 'Nagyfelületű oldalpanel javítás',
      before: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FN1__945506ce.jpg?alt=media&token=ae5a3b98-b9af-4dfe-8980-f7e23befc8a1',
        caption: 'Kiterjedt, nagyméretű horpadás Mercedes V-Class oldalpanelén.',
      },
      after: {
        src: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FLQkYTrRmvvhYisZbqnz83GIuhVg1%2FN2__6734d415.jpg?alt=media&token=e430393a-5be8-41fc-859c-698b16950410',
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
