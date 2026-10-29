// English room wording lives here; room selection and probabilities live in world.js.
// Each ambience entry has text and a grammatical form used by the templates below.
// Marvels use the sentence form. Optional tags identify scene details that should
// not be introduced twice. Use the same tag for the same scene detail in any list.
// Add entries one per line; use a complete sentence when no phrase template fits.
// Reordering or adding list entries can change the descriptions of bookmarked rooms.

export const WALLS = [
  { text: "damp limestone", form: "material" },
  { text: "black basalt", form: "material" },
  { text: "crumbling red brick", form: "material" },
  { text: "smooth bone-white marble", form: "material" },
  { text: "moss-furred granite", form: "material" },
  { text: "tarnished copper panels", form: "material" },
  { text: "packed earth threaded with roots", form: "material" },
  { text: "glazed green tiles", form: "material" },
];
export const LIGHT = [
  { text: "a guttering torch", form: "source" },
  { text: "phosphorescent fungus", form: "source" },
  { text: "a single candle that never shortens", form: "source" },
  { text: "pale light with no source", form: "source" },
  { text: "a crack of grey daylight high above", form: "source" },
  { text: "an iron brazier of blue coals", form: "source" },
  { text: "near-total darkness", form: "darkness" },
];
export const SOUND = [
  { text: "distant dripping", form: "sound" },
  { text: "a faint hum, like a held note", form: "sound" },
  { text: "footsteps that stop when you do", form: "sound" },
  { text: "wind through unseen gaps", form: "sound" },
  { text: "silence so thick it rings", form: "silence" },
  { text: "the slow creak of settling stone", form: "sound" },
  { text: "a far-off bell", form: "sound" },
];
export const SMELL = [
  { text: "wet stone", form: "smell" },
  { text: "old parchment", form: "smell" },
  { text: "candle smoke", form: "smell" },
  { text: "rust", form: "smell" },
  { text: "cold iron and salt", form: "smell" },
  { text: "crushed mint", form: "smell" },
  { text: "nothing at all", form: "odorless" },
];
export const TREASURES = [
  "a gilded compass whose needle spins endlessly",
  "a silver locket containing your own portrait",
  "a map of this very room",
  "a crown of tarnished brass",
  "an hourglass with sand that falls upward",
  "a ruby the size of a thumb",
  "a coin stamped with a face on both sides",
  "a ring that fits no finger",
  "a jar of captured starlight",
  "a feather quill that writes only questions",
];
export const INSCRIPTIONS = [
  "ALL WHO ENTER HAVE ALWAYS BEEN HERE",
  "THE WAY OUT IS THE WAY IN",
  "YOU HAVE READ THIS BEFORE",
  "COUNT THE DOORS. THEN STOP COUNTING.",
  "EVERY KEY OPENS SOMETHING. NOTHING OPENS OUTWARD.",
  "HERE THE MAP ENDS. THE MAZE DOES NOT.",
  "THE GUARDS DISAGREE. THE WALLS DO NOT.",
];
export const RARE = {
  glorious: {
    walls: [
      { text: "The walls are crusted with violet amethyst crystals.", form: "sentence" },
      { text: "pale pink salt, carved into the vaulted ribs of a cathedral", form: "material", tags: ["salt-vault"] },
      { text: "veins of raw gold running through white quartz", form: "detail" },
      { text: "mother-of-pearl that shifts colour as you move", form: "material" },
      { text: "polished jade inlaid with silver script", form: "material" },
      { text: "frozen waterfalls of clear crystal", form: "material" },
    ],
    light: [
      { text: "shafts of light refracting through a thousand crystals", form: "glow" },
      { text: "a still emerald pool glowing from beneath", form: "source", tags: ["emerald-pool"] },
      { text: "rose-gold light pouring through salt windows", form: "glow" },
      { text: "drifting motes that shine like fireflies", form: "source" },
      { text: "a chandelier of living ice", form: "source" },
    ],
    sound: [
      { text: "a choir of humming crystals", form: "sound" },
      { text: "water chiming softly over stone", form: "sound" },
      { text: "a single sustained note, warm and endless", form: "sound" },
      { text: "the gentle ring of glass touching glass", form: "sound" },
    ],
    smell: [
      { text: "clean mountain air", form: "smell" },
      { text: "salt and sweet resin", form: "smell" },
      { text: "rain on warm stone", form: "smell" },
      { text: "blossoms that cannot grow here", form: "smell" },
    ],
    marvels: [
      { text: "A glittering emerald pool fills the centre, so clear you can see coins at the bottom.", form: "sentence", tags: ["emerald-pool"] },
      { text: "The ceiling rises into a cathedral vault, every arch carved from salt.", form: "sentence", tags: ["salt-vault"] },
      { text: "Crystals as tall as a person grow from the floor, catching the light.", form: "sentence" },
      { text: "A garden of stone flowers blooms in the cracks, each petal a gemstone.", form: "sentence" },
      { text: "A great window of rose quartz looks out onto a sky that should not exist.", form: "sentence" },
    ]
  },
  sinister: {
    walls: [
      { text: "rusted iron plates slick with something dark", form: "material" },
      { text: "stone stained in long rust-red streaks", form: "material" },
      { text: "black rock scratched with countless tally marks", form: "material" },
      { text: "The walls are hung with heavy, swaying chains.", form: "sentence", tags: ["chains"] },
      { text: "bricks mortared with what looks like old bone", form: "material" },
    ],
    light: [
      { text: "a lantern that flickers whenever you look away", form: "source" },
      { text: "a dim red glow seeping from the cracks", form: "glow" },
      { text: "a single candle burning with a black flame", form: "source" },
      { text: "There is almost no light at all, and it is shrinking.", form: "sentence" },
    ],
    sound: [
      { text: "whispering just too quiet to make out", form: "sound", tags: ["whispers"] },
      { text: "the slow clink of chains moving by themselves", form: "sound", tags: ["chains"] },
      { text: "steady dripping, thicker than water", form: "sound", tags: ["dripping"] },
      { text: "Your name is spoken once, from behind you.", form: "sentence" },
      { text: "breathing that is not your own", form: "sound" },
    ],
    smell: [
      { text: "blood and wet iron", form: "smell" },
      { text: "rot beneath the stone", form: "smell" },
      { text: "smoke and burnt hair", form: "smell" },
      { text: "a sickly sweetness", form: "smell" },
    ],
    marvels: [
      { text: "Chains hang from the ceiling, and some of them are still swaying.", form: "sentence", tags: ["chains"] },
      { text: "Something drips steadily from above, pooling red on the floor.", form: "sentence", tags: ["dripping"] },
      { text: "Dark whispers circle the room, always just behind your ear.", form: "sentence", tags: ["whispers"] },
      { text: "Manacles are bolted to the wall at the height of a kneeling person.", form: "sentence" },
      { text: "Handprints smear the walls, all of them reaching for the doors.", form: "sentence" },
    ]
  }
};

// Templates are English-only. Unknown forms fail loudly rather than silently
// producing an ungrammatical sentence when new wording is added.
const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
export const SENTENCE_PATTERNS = {
  material: (text) => `The walls are made of ${text}.`,
  detail: (text) => `The walls are threaded with ${text}.`,
  source: (text) => `The chamber is lit by ${text}.`,
  glow: (text) => `${capitalize(text)} fills the chamber.`,
  darkness: (text) => `${capitalize(text)} fills the chamber.`,
  sound: (text) => `You hear ${text}.`,
  silence: (text) => `There is ${text}.`,
  smell: (text) => `You smell ${text}.`,
  odorless: () => "The air has no scent.",
  sentence: (text) => text,
};
const vocabulary = [
  ...WALLS, ...LIGHT, ...SOUND, ...SMELL,
  ...Object.values(RARE).flatMap((set) => Object.values(set).flat()),
];
const entriesByText = new Map(vocabulary.map((entry) => [entry.text, entry]));
export function sentenceFor(entry) {
  const pattern = SENTENCE_PATTERNS[entry.form];
  if (!pattern) throw new Error(`Unknown room phrase form: ${entry.form}`);
  return pattern(entry.text);
}
// Pure filtering keeps compatibility separate from random selection. world.js
// still owns the seed and consumes one random draw per selected detail.
export function compatibleEntries(entries, selected) {
  const used = new Set(selected.flatMap((entry) => entry.tags || []));
  return entries.filter((entry) => !(entry.tags || []).some((tag) => used.has(tag)));
}
function ambienceSentence(text, fallbackForm) {
  // String room records (including older records) remain supported.
  return sentenceFor(entriesByText.get(text) || { text, form: fallbackForm });
}
export function describeRoom(room) {
  const a = room.ambience;
  const exits = room.exits.map((e) => e.locked ? `${e.dir} (locked)` : e.dir).join(", ");
  const feature = {
    empty: room.marvel ? "" : "There is nothing here to take or disturb.",
    chest: room.feature.kind === "chest" && room.feature.locked ? "A heavy chest sits against the wall, bound with a padlock." : "A wooden chest sits against the wall, its lid unlatched.",
    key: "Something glints on the floor: a small iron key.",
    guards: "Two guards stand motionless by the doors, watching you.",
    inscription: room.feature.kind === "inscription" ? `Words are carved into the wall: “${room.feature.text}”` : ""
  }[room.feature.kind];
  return [
    ambienceSentence(a.walls, "material"),
    ambienceSentence(a.light, "source"),
    ambienceSentence(a.sound, "sound"),
    ambienceSentence(a.smell, "smell"),
    room.marvel,
    feature,
  ].filter(Boolean).join(" ") + `\nDoors lead: ${exits}.`;
}
export function roomFacts(room) {
  const f = room.feature;
  const feature = f.kind === "chest" ? `a ${f.locked ? "padlocked" : "closed but unlocked"} chest (do not reveal contents)` : f.kind === "key" ? "a small iron key lying on the floor" : f.kind === "guards" ? "two silent guards, one on the left and one on the right (never say or hint whether either of them lies)" : f.kind === "inscription" ? `an inscription on the wall reading exactly: "${f.text}"` : "no interactive feature; retain all the surroundings and any marvel described above";
  return [
    `Walls: ${ambienceSentence(room.ambience.walls, "material")}`,
    `Light: ${ambienceSentence(room.ambience.light, "source")}`,
    `Sound: ${ambienceSentence(room.ambience.sound, "sound")}`,
    `Smell: ${ambienceSentence(room.ambience.smell, "smell")}`,
    ...room.rarity === "glorious" ? ["Atmosphere: a rare, glorious chamber — awe-inspiring and beautiful", `Marvel: ${room.marvel}`] : room.rarity === "sinister" ? ["Atmosphere: a rare, sinister chamber — unsettling horror and dread", `Marvel: ${room.marvel}`] : [],
    `Feature: ${feature}`,
    `Doors (exactly these, no others): ${room.exits.map((e) => `${e.dir}${e.locked ? " (locked)" : ""}`).join(", ")}`
  ].join("\n");
}
