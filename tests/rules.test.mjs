import test from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom, neighbourId, DIRECTIONS, roomFacts, describeRoom, RARE_CHANCE, GLORIOUS_SHARE, ENCOUNTER_CHANCE } from '../js/world.js';
import { UUID_RE, uuidFrom } from '../js/rng.js';
import { guardAnswer } from '../js/guards.js';
import { CAST } from '../js/characters.js';
import { loadSatchel, saveSatchel, loadMemory, remember } from '../js/storage.js';

const id = '3f1c2a9e-1b2c-4d3e-8f00-123456789abc';
test('bookmarked room IDs reproduce identical chambers', () => {
  assert.deepEqual(generateRoom(id), generateRoom(id));
});
test('every door leads onward to another GUID', () => {
  for (const dir of DIRECTIONS) { assert.match(neighbourId(id, dir), UUID_RE); assert.notEqual(neighbourId(id, dir), id); }
});
test('wandering always has at least two doors and an unlocked way onward', () => {
  for (let i = 0; i < 1000; i++) {
    const room = generateRoom(uuidFrom(String(i)));
    assert.ok(room.exits.length >= 2); assert.ok(room.exits.some(e => !e.locked));
  }
});
test('about 20% of rooms hold an encounter, with the liar on either side and a character from the cast', () => {
  assert.equal(ENCOUNTER_CHANCE, 0.2);
  const sides = new Set(); const people = new Set(); let count = 0;
  for (let i = 0; i < 20000; i++) {
    const room = generateRoom(uuidFrom(String(i))); const f = room.feature;
    if (f.kind !== 'encounter') continue;
    count++; sides.add(f.liar); people.add(f.character);
    assert.ok(room.exits.some(e => e.dir === f.falseDoor));
  }
  assert.ok(Math.abs(count / 20000 - 0.2) < 0.01, `encounter share ${count / 20000}`);
  assert.deepEqual([...sides].sort(), ['left', 'right']);
  assert.equal(people.size, CAST.length);
});
test('the honest guard says there is no exit; the liar claims one', () => {
  for (const liar of ['left', 'right']) {
    const honest = liar === 'left' ? 'right' : 'left';
    assert.equal(guardAnswer(liar, honest, 'any-exit', 'north'), 'No, there is no way out.');
    assert.equal(guardAnswer(liar, honest, 'exit-door', 'north'), 'No door leads out.');
    assert.equal(guardAnswer(liar, liar, 'exit-door', 'east'), 'The east door leads out.');
    assert.equal(guardAnswer(liar, liar, 'any-exit', 'east'), 'Yes, there is a way out.');
  }
});
test('both guards deny lying, accuse each other, and give the same answer about the other', () => {
  for (const liar of ['left', 'right']) for (const side of ['left', 'right']) {
    assert.equal(guardAnswer(liar, side, 'you-liar', 'north'), 'No, I do not lie.');
    assert.equal(guardAnswer(liar, side, 'other-liar', 'north'), 'Yes, the other guard lies.');
    assert.equal(guardAnswer(liar, side, 'other-says', 'north'), 'They would say yes, there is a way out.');
  }
});
test('inventory and room memory are local, with duplicate actions remembered once', () => {
  const data = new Map();
  globalThis.localStorage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  saveSatchel({ keys: 2, treasures: ['a ruby'], steps: 7 });
  assert.deepEqual(loadSatchel(), { keys: 2, treasures: ['a ruby'], steps: 7 });
  remember('opened', id); remember('opened', id);
  assert.deepEqual(loadMemory().opened, [id]);
});
test('rare rooms appear about 8% of the time, split evenly between glorious and sinister', () => {
  assert.equal(RARE_CHANCE, 0.08); assert.equal(GLORIOUS_SHARE, 0.5);
  const counts = { standard: 0, glorious: 0, sinister: 0 };
  for (let i = 0; i < 20000; i++) counts[generateRoom(uuidFrom(String(i))).rarity]++;
  const rare = counts.glorious + counts.sinister;
  assert.ok(Math.abs(rare / 20000 - 0.08) < 0.01, `rare share ${rare / 20000}`);
  assert.ok(Math.abs(counts.glorious / rare - 0.5) < 0.06, `glorious share ${counts.glorious / rare}`);
});
test('rare rooms describe their marvel; standard rooms do not have one', () => {
  for (let i = 0; i < 2000; i++) {
    const room = generateRoom(uuidFrom(String(i)));
    if (room.rarity === 'standard') assert.equal(room.marvel, null);
    else { assert.ok(describeRoom(room).includes(room.marvel)); assert.ok(roomFacts(room).includes(room.marvel)); }
  }
});
