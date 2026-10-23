const SATCHEL = "labyrinth:satchel";
const MEMORY = "labyrinth:memory";
const NARRATION = "labyrinth:narration";
const CAP = 300;
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
export const loadSatchel = () => read(SATCHEL, { keys: 0, treasures: [], steps: 0 });
export const saveSatchel = (s) => write(SATCHEL, s);
export const loadMemory = () => read(MEMORY, { opened: [], taken: [], unlocked: [] });
export function remember(kind, value) {
  const m = loadMemory();
  if (!m[kind].includes(value))
    m[kind] = [...m[kind], value].slice(-CAP);
  write(MEMORY, m);
}
export function cachedNarration(id) {
  return read(NARRATION, {})[id];
}
export function cacheNarration(id, text) {
  const all = read(NARRATION, {});
  all[id] = text;
  const keys = Object.keys(all);
  if (keys.length > CAP)
    for (const k of keys.slice(0, keys.length - CAP))
      delete all[k];
  write(NARRATION, all);
}
