import { pick, rngFor, uuidFrom } from "./rng.js";
export const DIRECTIONS = ["north", "east", "south", "west"];
const WALLS = ["damp limestone", "black basalt", "crumbling red brick", "smooth bone-white marble", "moss-furred granite", "tarnished copper panels", "packed earth threaded with roots", "glazed green tiles"];
const LIGHT = ["a guttering torch", "phosphorescent fungus", "a single candle that never shortens", "pale light with no source", "a crack of grey daylight high above", "an iron brazier of blue coals", "near-total darkness"];
const SOUND = ["distant dripping", "a faint hum, like a held note", "footsteps that stop when you do", "wind through unseen gaps", "silence so thick it rings", "the slow creak of settling stone", "a far-off bell"];
const SMELL = ["wet stone", "old parchment", "candle smoke", "rust", "cold iron and salt", "crushed mint", "nothing at all"];
export const TREASURES = ["a gilded compass whose needle spins endlessly", "a silver locket containing your own portrait", "a map of this very room", "a crown of tarnished brass", "an hourglass with sand that falls upward", "a ruby the size of a thumb", "a coin stamped with a face on both sides", "a ring that fits no finger", "a jar of captured starlight", "a feather quill that writes only questions"];
const INSCRIPTIONS = ["ALL WHO ENTER HAVE ALWAYS BEEN HERE", "THE WAY OUT IS THE WAY IN", "YOU HAVE READ THIS BEFORE", "COUNT THE DOORS. THEN STOP COUNTING.", "EVERY KEY OPENS SOMETHING. NOTHING OPENS OUTWARD.", "HERE THE MAP ENDS. THE MAZE DOES NOT.", "THE GUARDS DISAGREE. THE WALLS DO NOT."];
function pickFeature(rng, exits) {
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
  if (r < 0.85)
    return { kind: "guards", lies: { left: rng() < 0.5, right: rng() < 0.5 }, falseDoor: pick(rng, exits).dir };
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
  return {
    id,
    exits,
    feature: pickFeature(rng, exits),
    ambience: { walls: pick(rng, WALLS), light: pick(rng, LIGHT), sound: pick(rng, SOUND), smell: pick(rng, SMELL) }
  };
}
export function neighbourId(id, dir) {
  return uuidFrom(`${id}->${dir}`);
}
export function describeRoom(room) {
  const a = room.ambience;
  const exits = room.exits.map((e) => e.locked ? `${e.dir} (locked)` : e.dir).join(", ");
  const feature = {
    empty: "The chamber is bare.",
    chest: room.feature.kind === "chest" && room.feature.locked ? "A heavy chest sits against the wall, bound with a padlock." : "A wooden chest sits against the wall, its lid unlatched.",
    key: "Something glints on the floor: a small iron key.",
    guards: "Two guards stand motionless by the doors, watching you.",
    inscription: room.feature.kind === "inscription" ? `Words are carved into the wall: “${room.feature.text}”` : ""
  }[room.feature.kind];
  return `Walls of ${a.walls}, lit by ${a.light}. You hear ${a.sound} and smell ${a.smell}. ${feature}
Doors lead: ${exits}.`;
}
export function roomFacts(room) {
  const f = room.feature;
  const feature = f.kind === "chest" ? `a ${f.locked ? "padlocked" : "closed but unlocked"} chest (do not reveal contents)` : f.kind === "key" ? "a small iron key lying on the floor" : f.kind === "guards" ? "two silent guards, one on the left and one on the right (never say or hint whether either of them lies)" : f.kind === "inscription" ? `an inscription on the wall reading exactly: "${f.text}"` : "nothing of note";
  return [
    `Walls: ${room.ambience.walls}`,
    `Light: ${room.ambience.light}`,
    `Sound: ${room.ambience.sound}`,
    `Smell: ${room.ambience.smell}`,
    `Feature: ${feature}`,
    `Doors (exactly these, no others): ${room.exits.map((e) => `${e.dir}${e.locked ? " (locked)" : ""}`).join(", ")}`
  ].join(`
`);
}
