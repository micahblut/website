import { pick, rngFor, uuidFrom } from "./rng.js";
export const DIRECTIONS = ["north", "east", "south", "west"];
const WALLS = ["damp limestone", "black basalt", "crumbling red brick", "smooth bone-white marble", "moss-furred granite", "tarnished copper panels", "packed earth threaded with roots", "glazed green tiles"];
const LIGHT = ["a guttering torch", "phosphorescent fungus", "a single candle that never shortens", "pale light with no source", "a crack of grey daylight high above", "an iron brazier of blue coals", "near-total darkness"];
const SOUND = ["distant dripping", "a faint hum, like a held note", "footsteps that stop when you do", "wind through unseen gaps", "silence so thick it rings", "the slow creak of settling stone", "a far-off bell"];
const SMELL = ["wet stone", "old parchment", "candle smoke", "rust", "cold iron and salt", "crushed mint", "nothing at all"];
export const TREASURES = ["a gilded compass whose needle spins endlessly", "a silver locket containing your own portrait", "a map of this very room", "a crown of tarnished brass", "an hourglass with sand that falls upward", "a ruby the size of a thumb", "a coin stamped with a face on both sides", "a ring that fits no finger", "a jar of captured starlight", "a feather quill that writes only questions"];
const INSCRIPTIONS = ["ALL WHO ENTER HAVE ALWAYS BEEN HERE", "THE WAY OUT IS THE WAY IN", "YOU HAVE READ THIS BEFORE", "COUNT THE DOORS. THEN STOP COUNTING.", "EVERY KEY OPENS SOMETHING. NOTHING OPENS OUTWARD.", "HERE THE MAP ENDS. THE MAZE DOES NOT.", "THE GUARDS DISAGREE. THE WALLS DO NOT."];
// Rare rooms: RARE_CHANCE of all rooms are rare; of those, GLORIOUS_SHARE are glorious and the rest sinister.
export const RARE_CHANCE = 0.08;
export const GLORIOUS_SHARE = 0.5;
export const RARE = {
  glorious: {
    walls: ["walls crusted with violet amethyst crystals", "pale pink salt, carved into the vaulted ribs of a cathedral", "veins of raw gold running through white quartz", "mother-of-pearl that shifts colour as you move", "polished jade inlaid with silver script", "frozen waterfalls of clear crystal"],
    light: ["shafts of light refracting through a thousand crystals", "a still emerald pool glowing from beneath", "rose-gold light pouring through salt windows", "drifting motes that shine like fireflies", "a chandelier of living ice"],
    sound: ["a choir of humming crystals", "water chiming softly over stone", "a single sustained note, warm and endless", "the gentle ring of glass touching glass"],
    smell: ["clean mountain air", "salt and sweet resin", "rain on warm stone", "blossoms that cannot grow here"],
    marvels: ["A glittering emerald pool fills the centre, so clear you can see coins at the bottom.", "The ceiling rises into a cathedral vault, every arch carved from salt.", "Crystals as tall as a person grow from the floor, catching the light.", "A garden of stone flowers blooms in the cracks, each petal a gemstone.", "A great window of rose quartz looks out onto a sky that should not exist."]
  },
  sinister: {
    walls: ["rusted iron plates slick with something dark", "stone stained in long rust-red streaks", "black rock scratched with countless tally marks", "walls hung with heavy, swaying chains", "bricks mortared with what looks like old bone"],
    light: ["a lantern that flickers whenever you look away", "a dim red glow seeping from the cracks", "a single candle burning with a black flame", "almost no light at all, and it is shrinking"],
    sound: ["whispering just too quiet to make out", "the slow clink of chains moving by themselves", "steady dripping, thicker than water", "your name, spoken once, from behind you", "breathing that is not your own"],
    smell: ["blood and wet iron", "rot beneath the stone", "smoke and burnt hair", "a sickly sweetness"],
    marvels: ["Chains hang from the ceiling, and some of them are still swaying.", "Something drips steadily from above, pooling red on the floor.", "Dark whispers circle the room, always just behind your ear.", "Manacles are bolted to the wall at the height of a kneeling person.", "Handprints smear the walls, all of them reaching for the doors."]
  }
};
function pickRarity(id) {
  const rng = rngFor(`rarity:${id}`);
  if (rng() >= RARE_CHANCE)
    return null;
  const kind = rng() < GLORIOUS_SHARE ? "glorious" : "sinister";
  const set = RARE[kind];
  return { kind, marvel: pick(rng, set.marvels), ambience: { walls: pick(rng, set.walls), light: pick(rng, set.light), sound: pick(rng, set.sound), smell: pick(rng, set.smell) } };
}
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
  const feature = pickFeature(rng, exits);
  const ambience = { walls: pick(rng, WALLS), light: pick(rng, LIGHT), sound: pick(rng, SOUND), smell: pick(rng, SMELL) };
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
  return `${/^walls /.test(a.walls) ? a.walls[0].toUpperCase() + a.walls.slice(1) : `Walls of ${a.walls}`}, lit by ${a.light}. You hear ${a.sound} and smell ${a.smell}.${room.marvel ? ` ${room.marvel}` : ""} ${feature}
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
    ...room.rarity === "glorious" ? ["Atmosphere: a rare, glorious chamber — awe-inspiring and beautiful", `Marvel: ${room.marvel}`] : room.rarity === "sinister" ? ["Atmosphere: a rare, sinister chamber — unsettling horror and dread", `Marvel: ${room.marvel}`] : [],
    `Feature: ${feature}`,
    `Doors (exactly these, no others): ${room.exits.map((e) => `${e.dir}${e.locked ? " (locked)" : ""}`).join(", ")}`
  ].join(`
`);
}
