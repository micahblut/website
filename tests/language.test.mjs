import test from 'node:test';
import assert from 'node:assert/strict';
import { WALLS, LIGHT, SOUND, SMELL, RARE, SENTENCE_PATTERNS, compatibleEntries } from '../js/language.js';
import { generateRoom } from '../js/world.js';
import { uuidFrom } from '../js/rng.js';

const entries = [...WALLS, ...LIGHT, ...SOUND, ...SMELL, ...Object.values(RARE).flatMap(set => Object.values(set).flat())];
test('every phrase declares a supported grammatical form and has an unambiguous lookup', () => {
  assert.equal(new Set(entries.map(entry => entry.text)).size, entries.length);
  for (const entry of entries) {
    assert.equal(typeof entry.text, 'string');
    assert.equal(typeof SENTENCE_PATTERNS[entry.form], 'function');
  }
  assert.equal(LIGHT[6].form, 'darkness');
  assert.equal(RARE.glorious.walls[2].form, 'detail');
  assert.equal(RARE.sinister.light[3].form, 'sentence');
});
test('compatibility removes shared scene tags while retaining unrelated and untagged options', () => {
  const duplicate = { text: 'duplicate', tags: ['chains'] };
  const unrelated = { text: 'unrelated', tags: ['pool'] };
  const plain = { text: 'plain' };
  assert.deepEqual(compatibleEntries([duplicate, unrelated, plain], [{ tags: ['chains'] }]), [unrelated, plain]);
  assert.deepEqual(compatibleEntries([duplicate], [{ tags: ['chains'] }]), []);
  assert.deepEqual(compatibleEntries([duplicate], []), [duplicate]);
});
test('all rare scene combinations have compatible choices in every category', () => {
  for (const set of Object.values(RARE)) {
    function visit(fields, selected) {
      if (!fields.length) return;
      const candidates = compatibleEntries(set[fields[0]], selected);
      assert.ok(candidates.length > 0);
      for (const entry of candidates) visit(fields.slice(1), [...selected, entry]);
    }
    for (const marvel of set.marvels) visit(['walls', 'light', 'sound', 'smell'], [marvel]);
  }
});
test('generated rare rooms never introduce the same tagged scene detail twice', () => {
  const byText = new Map(entries.map(entry => [entry.text, entry]));
  const counts = { glorious: 0, sinister: 0 };
  for (let i = 0; i < 20000; i++) {
    const room = generateRoom(uuidFrom(String(i)));
    for (const value of Object.values(room.ambience)) assert.equal(typeof value, 'string');
    if (room.rarity === 'standard') continue;
    counts[room.rarity]++;
    assert.equal(typeof room.marvel, 'string');
    const tags = [...Object.values(room.ambience), room.marvel].flatMap(text => byText.get(text).tags || []);
    assert.equal(new Set(tags).size, tags.length, room.id);
  }
  assert.ok(counts.glorious > 0 && counts.sinister > 0);
});
