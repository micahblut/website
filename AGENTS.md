# Repository guidance

- Keep English room vocabulary and description formatting in `js/language.js`, and room generation and probabilities in `js/world.js`; separating prose from game rules makes wording easier to maintain.
- Preserve the existing native JavaScript module stack and the public exports of `js/world.js` when reorganizing room content; the site loads without a build step.
