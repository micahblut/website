// The classic guard puzzle, used when the narrator is asleep.
// Two guards stand in the room: exactly one always tells the truth and the
// other always lies. The labyrinth has no exit, so the honest guard always
// says so, and the liar always claims there is one.

export const GUARD_QUESTIONS = [
  { id: "exit-door", label: "Which door leads out?" },
  { id: "any-exit", label: "Is there any way out at all?" },
  { id: "you-liar", label: "Do you lie?" },
  { id: "other-liar", label: "Does the other guard lie?" },
  { id: "other-says", label: "If I asked the other guard whether there's a way out, what would they say?" }
];

// Answer from one guard. `liar` is the side ("left" or "right") of the lying
// guard; `side` is the guard being asked; `falseDoor` is the door the liar
// pretends leads out.
export function guardAnswer(liar, side, q, falseDoor) {
  const lies = side === liar;
  const say = (truth) => lies ? !truth : truth;
  switch (q) {
    case "exit-door":
      return lies ? `The ${falseDoor} door leads out.` : "No door leads out.";
    case "any-exit":
      return say(false) ? "Yes, there is a way out." : "No, there is no way out.";
    case "you-liar":
      return say(lies) ? "Yes, I lie." : "No, I do not lie.";
    case "other-liar":
      return say(!lies) ? "Yes, the other guard lies." : "No, the other guard tells the truth.";
    case "other-says":
      // The other guard would honestly say "no" if truthful, or falsely "yes"
      // if they lie; this guard then reports that faithfully or flips it.
      return say(lies ? false : true) ? "They would say yes, there is a way out." : "They would say no, there is no way out.";
  }
}
