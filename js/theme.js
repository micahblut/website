// Run before paint; entering a bookmarked chamber always keeps the lights off.
(() => {
  let stored;
  try { stored = localStorage.getItem('theme'); } catch {}
  const inMaze = /^\/labyrinth\/[^/]+\/?$/.test(location.pathname);
  if (inMaze) document.documentElement.dataset.labyrinth = 'entered';
  const theme = inMaze ? 'dark' : stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  document.getElementById('theme-color-meta')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
})();