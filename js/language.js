import { characterById } from "./characters.js";
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
  { text: "lichen spotted slate", form: "material" },
  { text: "splintered oak planks", form: "material" },
  { text: "salt-stained sandstone", form: "material" },
  { text: "cracked obsidian", form: "material" },
  { text: "yellowed ivory panels", form: "material" },
  { text: "rust-eaten iron plates", form: "material" },
  { text: "pitted volcanic rock", form: "material" },
  { text: "waterlogged timber", form: "material" },
  { text: "frost-glazed granite", form: "material" },
  { text: "peeling plaster over ancient stone", form: "material" },
  { text: "veined pink marble", form: "material" },
  { text: "woven reeds bound with clay", form: "material" },
  { text: "smoke-blackened sandstone", form: "material" },
  { text: "translucent amber resin", form: "material" },
  { text: "weathered grey concrete", form: "material" },
  { text: "corroded bronze latticework", form: "material" },
  { text: "crystalline blue salt", form: "material" },
  { text: "worm-eaten wooden beams", form: "material" },
  { text: "whitewashed cobblestone", form: "material" },
  { text: "jagged flint embedded in mortar", form: "material" },
  { text: "blackened ceramic slabs", form: "material" },
];
export const LIGHT = [
  { text: "a guttering torch", form: "source" },
  { text: "phosphorescent fungus", form: "source" },
  { text: "a single candle that never shortens", form: "source" },
  { text: "pale light with no source", form: "source" },
  { text: "a crack of grey daylight high above", form: "source" },
  { text: "an iron brazier of blue coals", form: "source" },
  { text: "glowing runes that swirl like fog", form: "source" },
  { text: "near-total darkness", form: "darkness" },
  { text: "a lantern swinging in an unseen breeze", form: "source" },
  { text: "faint green light seeping through the cracks", form: "source" },
  { text: "a cluster of fireflies drifting overhead", form: "source" },
  { text: "a guttering oil lamp filled with black fluid", form: "source" },
  { text: "cold moonlight filtering through a collapsed ceiling", form: "source" },
  { text: "a pulsing red crystal embedded in the wall", form: "source" },
  { text: "the flickering glow of distant flames", form: "source" },
  { text: "tiny stars suspended in the air", form: "source" },
  { text: "a row of candles burning with violet flames", form: "source" },
  { text: "warm amber light leaking from beneath a door", form: "source" },
  { text: "a ghostly white orb floating near the ceiling", form: "source" },
  { text: "the intermittent flash of distant lightning", form: "source" },
  { text: "dim light refracted through cloudy quartz", form: "source" },
  { text: "a blue flame burning without fuel", form: "source" },
  { text: "a faint golden shimmer beneath the water", form: "source" },
  { text: "the sickly glow of luminous mould", form: "source" },
  { text: "a chain of lanterns disappearing into the dark", form: "source" },
  { text: "flickering light from an unseen chamber", form: "source" },
  { text: "a halo of cold light surrounding an empty space", form: "source" },
  { text: "a dying ember buried beneath grey ash", form: "source" },
  { text: "complete and absolute darkness", form: "darkness" },
];
export const SOUND = [
  { text: "distant dripping", form: "sound" },
  { text: "a faint hum, like a held note", form: "sound" },
  { text: "footsteps that stop when you do", form: "sound" },
  { text: "wind through unseen gaps", form: "sound" },
  { text: "silence so thick it rings", form: "silence" },
  { text: "the slow creak of settling stone", form: "sound" },
  { text: "a far-off bell", form: "sound" },
  { text: "the soft ticking of a clock that cannot be seen", form: "sound" },
  { text: "a deafening rumble of falling water", form: "sound" },
  { text: "a single sustained note, warm and endless", form: "sound" },
  { text: "a silence as final as the grave", form: "silence" },
  { text: "an incipient whine, like a mosquito trapped in a jar", form: "sound" },
  { text: "the distant scrape of metal against stone", form: "sound" },
  { text: "muffled voices speaking in a forgotten language", form: "sound" },
  { text: "the rhythmic thud of something heavy moving overhead", form: "sound" },
  { text: "water bubbling beneath the floor", form: "sound" },
  { text: "a chorus of insects clicking in the darkness", form: "sound" },
  { text: "the brittle crackle of something burning", form: "sound" },
  { text: "a slow, irregular heartbeat", form: "sound" },
  { text: "the faint rustle of unseen wings", form: "sound" },
  { text: "a low grinding noise deep beneath the earth", form: "sound" },
  { text: "the distant laughter of a child", form: "sound" },
  { text: "chains dragging across a stone floor", form: "sound" },
  { text: "a hollow note echoing from somewhere below", form: "sound" },
  { text: "the whisper of leaves in a room without trees", form: "sound" },
  { text: "a sudden sharp knock from inside the wall", form: "sound" },
  { text: "the steady hiss of escaping steam", form: "sound" },
  { text: "something scratching slowly at the other side of a door", form: "sound" },
  { text: "the distant roar of an unseen crowd", form: "sound" },
  { text: "a breath drawn slowly through clenched teeth", form: "sound" },
  { text: "the faint shiver of glass resonating", form: "sound" },
  { text: "a low murmur that rises and falls like a tide", form: "sound" },
  { text: "a single drop falling at perfectly regular intervals", form: "sound" },
  { text: "a silence in which even thought seems loud", form: "silence" },
  { text: "the soft flutter of something passing overhead", form: "sound" },
  { text: "a distant door slamming shut", form: "sound" },
  { text: "the hollow tapping of knuckles against wood", form: "sound" },
  { text: "a thin metallic ringing that never quite fades", form: "sound" },
  { text: "the muffled rush of a river beyond the walls", form: "sound" },
  { text: "absolute silence, without even the sound of breathing", form: "silence" },
];
export const SMELL = [
  { text: "wet stone", form: "smell" },
  { text: "old parchment", form: "smell" },
  { text: "candle smoke", form: "smell" },
  { text: "rust", form: "smell" },
  { text: "cold iron and salt", form: "smell" },
  { text: "crushed mint", form: "smell" },
  { text: "potent sulfur", form: "smell" },
  { text: "black mold", form: "smell" },
  { text: "dust", form: "smell" },
  { text: "mildew", form: "smell" },
  { text: "the sea at low tide", form: "smell" },
  { text: "burning ozone", form: "smell" },
  { text: "nothing at all", form: "odorless" },
  { text: "stale water in a forgotten cistern", form: "smell" },
  { text: "damp wool left too long in a heap", form: "smell" },
  { text: "old sweat and leather", form: "smell" },
  { text: "rotting leaves", form: "smell" },
  { text: "grease and cold ashes", form: "smell" },
  { text: "sour wine spilled into cracks", form: "smell" },
  { text: "mothballs and medicinal herbs", form: "smell" },
  { text: "stale incense clinging to the air", form: "smell" },
  { text: "damp fur", form: "smell" },
  { text: "old cooking oil", form: "smell" },
  { text: "the faint tang of spoiled milk", form: "smell" },
  { text: "earthworms and freshly turned soil", form: "smell" },
  { text: "a sour, vinegary tang", form: "smell" },
  { text: "stagnant water and algae", form: "smell" },
  { text: "old smoke trapped in fabric", form: "smell" },
  { text: "dried blood and damp leather", form: "smell" },
  { text: "rotten apples in a wooden barrel", form: "smell" },
  { text: "faintly rancid butter", form: "smell" },
  { text: "wet dog and muddy fur", form: "smell" },
  { text: "the musty scent of an abandoned cellar", form: "smell" },
  { text: "bitter medicinal roots", form: "smell" },
  { text: "old fish and brine", form: "smell" },
  { text: "damp rope and tar", form: "smell" },
  { text: "rotting wood beneath a floorboard", form: "smell" },
  { text: "sour breath and unwashed linen", form: "smell" },
  { text: "faintly sweet decay", form: "smell" },
  { text: "charred herbs and bitter resin", form: "smell" },
  { text: "a trace of lavender beneath the must", form: "smell" },
  { text: "stale beer and spilled grain", form: "smell" },
  { text: "wet clay and decaying roots", form: "smell" },
  { text: "the metallic tang of old blood", form: "smell" },
  { text: "a faint smell of burnt hair", form: "smell" },
  { text: "overripe fruit and damp straw", form: "smell" },
  { text: "the dusty sweetness of dried flowers", form: "smell" },
  { text: "sour dampness rising from the floor", form: "smell" },
  { text: "old cheese and wooden shelves", form: "smell" },
  { text: "a faint medicinal smell of camphor", form: "smell" },
  { text: "nothing at all", form: "odorless" }
];
export const TREASURES = [
  "a gilded compass whose needle spins endlessly",
  "a silver locket containing your own portrait",
  "a crown of tarnished brass",
  "a tiara of blackened silver, set with a single ruby",
  "an hourglass with sand that falls upward",
  "a ruby the size of a walnut, warm to the touch",
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
  "THE TREASURES WEIGH YOU DOWN AND BUY YOU NOTHING."
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
      { text: "a chandelier of glittering ice", form: "source" },
    ],
    sound: [
      { text: "a choir of humming crystals", form: "sound" },
      { text: "water chiming softly over stone", form: "sound" },
      { text: "a sustained note, warm and endless", form: "sound" },
      { text: "the gentle ring of glass touching glass", form: "sound" },
    ],
    smell: [
      { text: "clean mountain air", form: "smell" },
      { text: "salt and sweet resin", form: "smell" },
      { text: "rain on warm stone", form: "smell" },
      { text: "blossoms that could never grow here", form: "smell" },
    ],
    marvels: [
      { text: "A glittering emerald pool fills the centre, so clear you can see coins at the bottom.", form: "sentence", tags: ["emerald-pool"] },
      { text: "The ceiling rises into a cathedral vault, every arch carved from salt.", form: "sentence", tags: ["salt-vault"] },
      { text: "Crystals as tall as trees growing from the floor, catching the light.", form: "sentence" },
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
      { text: "rows of skulls, stacked like bricks, their eye sockets staring", form: "material" },
    ],
    light: [
      { text: "a lantern that flickers whenever you look away", form: "source" },
      { text: "a dim red glow seeping from cracks in the floor", form: "glow" },
      { text: "a single candle burning with a black flame", form: "source" },
      { text: "There is almost no light at all, and it is shrinking.", form: "sentence" },
    ],
    sound: [
      { text: "whispering just too quiet to make out", form: "sound", tags: ["whispers"] },
      { text: "the slow clink of chains moving by themselves", form: "sound", tags: ["chains"] },
      { text: "steady dripping, thicker than water", form: "sound", tags: ["dripping"] },
      { text: "Your name is spoken once, from behind you.", form: "sentence" },
      { text: "breathing that is not your own", form: "sound" },
      { text: "frantic whispering, like a crowd of people in a panic", form: "sound" },
      { text: "panicked whispers that seem to come from inside your head", form: "sound" },
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
    encounter: "Two guards stand motionless by the doors, watching you.",
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
// Awake narration describes the room's character; the asleep text above shows the guards.
function encounterFact(id) {
  const c = characterById(id);
  return c ? `${c.name} is here. ${c.appearance} (Describe them, but do not speak for them yet.)` : "no interactive feature";
}
export function roomFacts(room) {
  const f = room.feature;
  const feature = f.kind === "chest" ? `a ${f.locked ? "padlocked" : "closed but unlocked"} chest (do not reveal contents)` : f.kind === "key" ? "a small iron key lying on the floor" : f.kind === "encounter" ? encounterFact(f.character) : f.kind === "inscription" ? `an inscription on the wall reading exactly: "${f.text}"` : "no interactive feature; retain all the surroundings and any marvel described above";
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
