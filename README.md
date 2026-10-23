Personal website for the owner of this repository.

## Hosting

The site is configured for the custom domain in `CNAME`, so its root-relative asset paths work on `https://blut.dev/`. GitHub Pages serves `404.html` for unknown paths; it uses that page to route direct `/labyrinth/<uuid>` visits back through `/labyrinth/` and restore the chamber URL before the labyrinth app starts. This keeps bookmarked and reloaded chamber links working on GitHub Pages.

If you deploy under a project URL such as `username.github.io/repository/`, the site's root-relative asset and navigation paths need a base path first.
