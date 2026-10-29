# Repository guidance

- Keep English room vocabulary and description formatting in `js/language.js`, and room generation and probabilities in `js/world.js`; separating prose from game rules makes wording easier to maintain.
- Preserve the existing native JavaScript module stack and the public exports of `js/world.js` when reorganizing room content; the site loads without a build step.
- Store grammatical forms and optional scene tags alongside English wording in `js/language.js`; use its templates and compatibility filter rather than guessing grammar from text, keeping new prose additions explicit and dependency-free.
- Keep generated room ambience and marvels as strings and consume one random draw per detail; room records and gameplay remain stable while compatible rare scenery can vary.
- Keep character cards in `js/characters.js`, the asleep-narrator guard puzzle in `js/guards.js`, and conversation/trade rules in `js/encounters.js`; the AI may only change the satchel through action tags listed on a card and validated by `applyAction`, so free text can never create items.
- Pick a room's character from its own `character:<id>` seed; editing the cast must never change doors, loot or other room content.
- Keep the narrator's standing instructions in `js/prompts.js`: a shared foundation (labyrinth rules plus permitted invention) and a separate narrator voice; character sessions get the foundation plus their own first-person card prompt, so the two voices never contradict.
- Bound character conversations with the turn limits in `js/encounters.js` rather than saved conversation memory; each scene stays short enough for the on-device model's context and nudges the wanderer onward.

- Keep compact, non-interactive detail and air wording in `js/atmosphere.js`, with separate `detail:<id>` and `air:<id>` seeds; expanding these lists must not change existing room facts, doors, loot or rarity. Include them in asleep descriptions and awake facts without increasing the narrator sentence budget.
