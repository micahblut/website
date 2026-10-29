import test from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom, neighbourId, DIRECTIONS, roomFacts, describeRoom, RARE_CHANCE, GLORIOUS_SHARE } from '../js/world.js';
import { UUID_RE, uuidFrom } from '../js/rng.js';
import { guardAnswer } from '../js/guards.js';
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
test('independent guards can have all four personality pairs', () => {
  const pairs = new Set();
  for (let i = 0; i < 1000; i++) {
    const f = generateRoom(uuidFrom(String(i))).feature;
    if (f.kind === 'guards') pairs.add(`${f.lies.left}:${f.lies.right}`);
  }
  assert.deepEqual([...pairs].sort(), ['false:false', 'false:true', 'true:false', 'true:true']);
});
test('honest guards say there is no exit, regardless of their companion', () => {
  for (const other of [true, false]) {
    assert.equal(guardAnswer(false, other, 'any-exit', 'north'), 'No, there is no way out.');
    assert.equal(guardAnswer(false, other, 'exit-door', 'north'), 'No door leads out.');
  }
});
test('lying guards falsely claim an exit', () => {
  for (const other of [true, false]) {
    assert.equal(guardAnswer(true, other, 'exit-door', 'east'), 'The east door leads out.');
    assert.equal(guardAnswer(true, other, 'any-exit', 'east'), 'Yes, there is a way out.');
  }
});
test('matching pairs vouch for each other; mixed pairs accuse', () => {
  for (const asked of [true, false]) for (const other of [true, false]) {
    assert.equal(guardAnswer(asked, other, 'other-liar', 'north'), asked === other ? 'No, the other guard tells the truth.' : 'Yes, the other guard lies.');
    assert.equal(guardAnswer(asked, other, 'other-says', 'north'), asked === other ? 'They would say no, there is no way out.' : 'They would say yes, there is a way out.');
    assert.equal(guardAnswer(asked, other, 'you-liar', 'north'), 'No, I do not lie.');
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
