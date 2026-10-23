export const GUARD_QUESTIONS = [
  { id: "exit-door", label: "Which door leads out?" },
  { id: "any-exit", label: "Is there any way out at all?" },
  { id: "you-liar", label: "Do you lie?" },
  { id: "other-liar", label: "Does the other guard lie?" },
  { id: "other-says", label: "If I asked the other guard whether there's a way out, what would they say?" }
];
export function guardAnswer(askedLies, otherLies, q, falseDoor) {
  const say = (truth) => askedLies ? !truth : truth;
  switch (q) {
    case "exit-door":
      return askedLies ? `The ${falseDoor} door leads out.` : "No door leads out.";
    case "any-exit":
      return say(false) ? "Yes, there is a way out." : "No, there is no way out.";
    case "you-liar":
      return say(askedLies) ? "Yes, I lie." : "No, I do not lie.";
    case "other-liar":
      return say(otherLies) ? "Yes, the other guard lies." : "No, the other guard tells the truth.";
    case "other-says": {
      const otherWouldSayYes = otherLies;
      return say(otherWouldSayYes) ? "They would say yes, there is a way out." : "They would say no, there is no way out.";
    }
  }
}
