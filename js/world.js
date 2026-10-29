import { pick, rngFor, uuidFrom } from "./rng.js";
import { WALLS, LIGHT, SOUND, SMELL, TREASURES, INSCRIPTIONS, RARE, compatibleEntries } from "./language.js";
import { CAST } from "./characters.js";
// Preserve existing imports used by the game and tests.
export { TREASURES, RARE, describeRoom, roomFacts } from "./language.js";
export const DIRECTIONS = ["north", "east", "south", "west"];
// Rare rooms: RARE_CHANCE of all rooms are rare; of those, GLORIOUS_SHARE are glorious and the rest sinister.
export const RARE_CHANCE = 0.08;
export const GLORIOUS_SHARE = 0.5;
// Encounters: ENCOUNTER_CHANCE of all rooms hold someone to meet. With the
// narrator asleep, that is the pair of guards (one honest, one liar); with it
// awake, one character from the cast in characters.js.
export const ENCOUNTER_CHANCE = 0.2;
function pickRarity(id) {
  const rng = rngFor(`rarity:${id}`);
  if (rng() >= RARE_CHANCE)
    return null;
  const kind = rng() < GLORIOUS_SHARE ? "glorious" : "sinister";
  const set = RARE[kind];
  const marvel = pick(rng, set.marvels);
  const selected = [marvel];
  const ambience = {};
  for (const field of ["walls", "light", "sound", "smell"]) {
    const candidates = compatibleEntries(set[field], selected);
    if (!candidates.length) throw new Error(`No compatible ${field} for ${kind} room`);
    const entry = pick(rng, candidates);
    selected.push(entry);
    ambience[field] = entry.text;
  }
  return { kind, marvel: marvel.text, ambience };
}
function pickEncounter(id, rng, exits) {
  const liar = rng() < 0.5 ? "left" : "right";
  rng(); // Unused draw, kept so the rest of every room stays as it was.
  const falseDoor = pick(rng, exits).dir;
  // The character uses its own seed, so adding characters never changes doors or loot.
  const character = pick(rngFor(`character:${id}`), CAST).id;
  return { kind: "encounter", liar, falseDoor, character };
}
function pickFeature(id, rng, exits) {
  const r = rng();
  if (r < 0.25)
    return { kind: "empty" };
  if (r < 0.5) {
    const lr = rng();
    const loot = lr < 0.55 ? { kind: "treasure", name: pick(rng, TREASURES) } : lr < 0.85 ? { kind: "key" } : { kind: "nothing" };
    return { kind: "chest", locked: rng() < 0.4, loot };
  }
  if (r < 0.65)
    return { kind: "key" };
  if (r < 0.65 + ENCOUNTER_CHANCE)
    return pickEncounter(id, rng, exits);
  return { kind: "inscription", text: pick(rng, INSCRIPTIONS) };
}
export function generateRoom(id) {
  const rng = rngFor(`room:${id}`);
  let dirs = DIRECTIONS.filter(() => rng() < 0.65);
  if (dirs.length < 2)
    dirs = [...DIRECTIONS].sort(() => rng() - 0.5).slice(0, 2);
  const exits = dirs.map((dir) => ({ dir, locked: rng() < 0.22, to: neighbourId(id, dir) }));
  if (exits.every((e) => e.locked) && exits[0])
    exits[0].locked = false;
  const feature = pickFeature(id, rng, exits);
  const ambience = { walls: pick(rng, WALLS).text, light: pick(rng, LIGHT).text, sound: pick(rng, SOUND).text, smell: pick(rng, SMELL).text };
  const rare = pickRarity(id);
  return {
    id,
    exits,
    feature,
    ambience: rare ? rare.ambience : ambience,
    rarity: rare ? rare.kind : "standard",
    marvel: rare ? rare.marvel : null
  };
}
export function neighbourId(id, dir) {
  return uuidFrom(`${id}->${dir}`);
}
