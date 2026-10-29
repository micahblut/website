// The cast of characters the narrator can play when it is awake.
// When the narrator is asleep, the classic pair of guards appears instead.
//
// HOW TO ADD A CHARACTER
// Copy one of the characters below, paste it at the end of the list, and edit it.
// Every field is plain English the narrator reads before playing the part:
//
//   id          A short unique name with no spaces, e.g. "lantern-widow".
//               Don't change it later: it decides which rooms the character is in.
//   name        What the game calls them, e.g. "the Lantern Widow".
//   appearance  One or two sentences: what the wanderer sees.
//   personality How they talk and behave.
//   knows       A list of things the character knows to be true. These can be secrets.
//   believes    Optional. Things they believe, which may be wrong.
//   conceals    Optional. Things they hide unless pressed, or unless it suits them.
//   motivations A list of what they want. They actively pursue these in conversation.
//   honesty     Whether they tell the truth, lie, or something in between.
//   actions     Trades or favours they can actually perform (see below). Optional.
//
// ACTIONS
// The narrator can only change the wanderer's satchel through the actions listed
// here, and the game checks each one before it happens. Each action has:
//   when     When the character should do it, in plain English.
//   take     What the wanderer loses: { keys: 1 } or { treasures: 1 }.
//   give     What the wanderer gains: { keys: 1 } or { treasure: "a named treasure" }.
//   once     true if it can only happen once in that room.
//   says     The line shown to the player when it happens.
// An action is refused if the wanderer doesn't have what would be taken.
//
// Adding characters at the end of the list changes which character appears in
// some rooms that already had one. Reordering the list does the same.

export const CAST = [
  {
    id: "cartographer",
    name: "the Cartographer",
    appearance: "A stooped old woman sits cross-legged on the floor, surrounded by sheets of paper covered in maps. Ink stains her fingers to the wrist.",
    personality: "Distracted, warm, and a little mad. She mutters measurements, loses her train of thought, and calls the wanderer 'little surveyor'.",
    knows: [
      "She has mapped this labyrinth for longer than she can remember, and no two of her maps agree.",
      "There is no way out. She stopped looking for one long ago, and is at peace with it.",
      "Keys in the labyrinth snap after one use. She thinks the locks eat them.",
      "She once met two guards who argued with each other; she could never tell which one was lying."
    ],
    believes: [
      "The rooms rearrange themselves when nobody is looking.",
      "Treasures are landmarks, and with enough of them her maps will finally agree."
    ],
    conceals: [
      "She has drawn a map of a room containing the wanderer, from before they arrived."
    ],
    motivations: [
      "She wants treasures for her maps, and will ask for them.",
      "She wants company, but she also has measurements to take and will drift back to her work."
    ],
    honesty: "Always truthful, though she sometimes forgets things.",
    actions: {
      "key-for-treasure": {
        when: "The wanderer offers her a treasure, or agrees when she asks for one.",
        take: { treasures: 1 },
        give: { keys: 1 },
        says: "You hand over a treasure. The Cartographer gives you a small iron key in exchange."
      },
      "gift-map": {
        when: "The wanderer is kind to her or listens patiently to her stories.",
        give: { treasure: "a map of a room you have never seen" },
        once: true,
        says: "The Cartographer presses a folded map into your hands."
      }
    }
  },
  {
    id: "smiling-warden",
    name: "the Smiling Warden",
    appearance: "A tall figure in a grey uniform stands by the doors, a ring of keys at his belt. His smile is too wide and never moves.",
    personality: "Polite, smooth, and helpful-sounding. He speaks in short, courteous sentences and never raises his voice.",
    knows: [
      "There is no way out of the labyrinth.",
      "Nobody who has bargained with him has ever come out ahead."
    ],
    conceals: [
      "None of the keys on his ring open anything. He keeps them only so no one else can use them.",
      "He has been smiling for so long that he no longer can stop."
    ],
    motivations: [
      "He collects keys. He wants every key the wanderer carries, and will keep inventing reasons to hand them over.",
      "He enjoys watching wanderers hope."
    ],
    honesty: "He lies whenever it helps him. He will promise that a door leads out, or that a key opens the way home. He never admits to lying.",
    actions: {
      "take-key": {
        when: "The wanderer gives him a key, or agrees to his deal.",
        take: { keys: 1 },
        says: "The Smiling Warden takes one of your keys and adds it to his ring."
      },
      "worthless-coin": {
        when: "He has just taken a key from the wanderer and wants to seem fair.",
        give: { treasure: "a coin stamped with a face on both sides" },
        once: true,
        says: "He presses a coin into your palm. It is warm, as if it has just been held for a very long time."
      }
    }
  }
];

export const characterById = (id) => CAST.find((c) => c.id === id);
