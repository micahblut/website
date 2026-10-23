
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav-drawer');

    // theme
    themeBtn.textContent = html.dataset.theme === 'dark' ? '☼' : '☾';
    themeBtn.setAttribute('aria-label', html.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    themeBtn.addEventListener('click', () => {
      const next = html.dataset.theme === 'light' ? 'dark' : 'light';
      setTheme(next);
      try { localStorage.setItem('theme', next); } catch {}
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (/^\/labyrinth\/[^/]+\/?$/.test(location.pathname)) return;
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    function setTheme(t) {
      html.dataset.theme = t;
      themeBtn.textContent = t === 'dark' ? '☼' : '☾';
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

      // iOS Safari can fail to repaint the safe-area/notch color when only
      // the meta tag's `content` attribute is mutated; replacing the node
      // forces it to pick up the new value.
      const oldMeta = document.getElementById('theme-color-meta');
      const newMeta = document.createElement('meta');
      newMeta.id = 'theme-color-meta';
      newMeta.name = 'theme-color';
      newMeta.content = t === 'dark' ? '#000000' : '#ffffff';
      oldMeta.replaceWith(newMeta);
    }

    // cookie banner & dialog
    const COOKIE_TYPES = {
      'chocolate-chip': {
        name: 'Chocolate Chip',
        recipe: 'Cream 1 cup butter with ¾ cup each sugar and brown sugar. Beat in 2 eggs and 2 tsp vanilla. Stir in 2¼ cups flour, 1 tsp baking soda, 1 tsp salt. Fold in 2 cups chocolate chips. Bake at 190°C for 9–11 min.'
      },
      'peanut-butter': {
        name: 'Peanut Butter',
        recipe: 'Mix 1 cup peanut butter, 1 cup sugar, 1 egg, 1 tsp vanilla, and ½ tsp baking soda. Roll into balls, press flat with a fork. Bake at 180°C for 10–12 min.'
      },
      'molasses-crinkles': {
        name: 'Molasses Crinkles',
        recipe: 'Melt ¾ cup butter, mix with 1 cup brown sugar, 1 egg, and ¼ cup molasses. Sift 2¼ cups flour, 2 tsp baking soda, ½ tsp salt, 1 tsp cinnamon, 1 tsp ginger, and ½ tsp cloves. Mix, chill 1 hr, roll into balls, dip in sugar. Bake at 190°C for 10–12 min.'
      }
    };

    function setCookie(name, value, days = 365) {
      try {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const isFile = location.protocol === 'file:';
        document.cookie = isFile
          ? `${name}=${encodeURIComponent(value)}; expires=${expires}`
          : `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
      } catch (e) {}
      try {
        localStorage.setItem(name, value);
      } catch (e) {}
    }

    function getCookie(name) {
      let val = '';
      try {
        const match = document.cookie.split('; ').find(v => v.split('=')[0] === name);
        if (match) {
          val = decodeURIComponent(match.split('=').slice(1).join('='));
        }
      } catch (e) {}
      if (!val) {
        try {
          val = localStorage.getItem(name) || '';
        } catch (e) {}
      }
      return val;
    }

    function deleteCookie(name) {
      try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      } catch (e) {}
      try {
        localStorage.removeItem(name);
      } catch (e) {}
    }

    const banner = document.getElementById('cookie-banner');
    const configureBtn = document.getElementById('cookie-configure-btn');
    const rejectBtn = document.getElementById('cookie-reject');
    const acceptBtn = document.getElementById('cookie-accept');

    const dialog = document.getElementById('cookie-dialog');
    const dialogSaveBtn = document.getElementById('dialog-save-btn');
    const dialogCancelBtn = document.getElementById('dialog-cancel-btn');

    function dismissBanner() {
      banner.classList.remove('visible');
    }

    function saveCookies(types) {
      setCookie('cookie-consent', 'set');
      Object.keys(COOKIE_TYPES).forEach(type => {
        if (types.includes(type)) {
          setCookie(`cookie-${type}`, COOKIE_TYPES[type].recipe);
        } else {
          deleteCookie(`cookie-${type}`);
        }
      });
      dismissBanner();
    }

    const hasAnyCookie = Object.keys(COOKIE_TYPES).some(type => getCookie(`cookie-${type}`));
    if (!getCookie('cookie-consent') && !hasAnyCookie) {
      setTimeout(() => banner.classList.add('visible'), 400);
    }

    rejectBtn.addEventListener('click', () => {
      setCookie('cookie-consent', 'rejected');
      Object.keys(COOKIE_TYPES).forEach(type => deleteCookie(`cookie-${type}`));
      dismissBanner();
    });

    acceptBtn.addEventListener('click', () => {
      saveCookies(Object.keys(COOKIE_TYPES));
    });

    configureBtn.addEventListener('click', () => {
      dismissBanner();
      dialog.showModal();
    });

    dialogSaveBtn.addEventListener('click', () => {
      const checked = [...dialog.querySelectorAll('input[type="checkbox"]:checked')]
        .map(el => el.value);
      saveCookies(checked);
      dialog.close();
    });

    function cancelDialog() {
      setCookie('cookie-consent', 'rejected');
      dialog.close();
    }

    dialogCancelBtn.addEventListener('click', cancelDialog);

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      cancelDialog();
    });

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        cancelDialog();
      }
    });

    // menu
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '[ close ]' : '[ menu ]';
    });
  