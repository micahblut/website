import test from 'node:test';
import assert from 'node:assert/strict';
import { CAST } from '../js/characters.js';
import { parseReply, visibleWhileStreaming, applyAction } from '../js/encounters.js';

const cartographer = CAST.find(c => c.id === 'cartographer');
const warden = CAST.find(c => c.id === 'smiling-warden');

test('every character card has the fields the narrator needs', () => {
  assert.equal(new Set(CAST.map(c => c.id)).size, CAST.length);
  for (const c of CAST) {
    for (const field of ['id', 'name', 'appearance', 'personality', 'honesty']) assert.equal(typeof c[field], 'string', `${c.id}.${field}`);
    assert.ok(c.knows.length > 0 && c.motivations.length > 0, c.id);
    for (const [actionId, a] of Object.entries(c.actions || {})) {
      assert.match(actionId, /^[a-z0-9-]+$/);
      assert.equal(typeof a.when, 'string'); assert.equal(typeof a.says, 'string');
      assert.ok(a.take || a.give, `${c.id}.${actionId} does nothing`);
    }
  }
});
test('action tags are read from replies and hidden from the player', () => {
  assert.deepEqual(parseReply('Take this, little surveyor. [[ACTION:key-for-treasure]]'), { speech: 'Take this, little surveyor.', action: 'key-for-treasure' });
  assert.deepEqual(parseReply('No deal.'), { speech: 'No deal.', action: null });
  assert.equal(visibleWhileStreaming('Here you are. [[ACT'), 'Here you are.');
});
test('an action not on the character card is refused', () => {
  assert.equal(applyAction(warden, 'key-for-treasure', { keys: 0, treasures: ['a ruby'] }).ok, false);
  assert.equal(applyAction(cartographer, 'give-everything', { keys: 0, treasures: [] }).ok, false);
});
test('a trade needing something the wanderer lacks is refused', () => {
  assert.equal(applyAction(cartographer, 'key-for-treasure', { keys: 0, treasures: [] }).reason, 'missing-items');
  assert.equal(applyAction(warden, 'take-key', { keys: 0, treasures: [] }).reason, 'missing-items');
});
test('a valid trade swaps one treasure for one key, without changing the original satchel', () => {
  const before = { keys: 1, treasures: ['a ruby', 'a crown'], steps: 3 };
  const result = applyAction(cartographer, 'key-for-treasure', before);
  assert.deepEqual(result.satchel, { keys: 2, treasures: ['a ruby'], steps: 3 });
  assert.deepEqual(before.treasures, ['a ruby', 'a crown']);
});
test('once-only gifts cannot be repeated in the same room', () => {
  const satchel = { keys: 0, treasures: [] };
  assert.deepEqual(applyAction(cartographer, 'gift-map', satchel).satchel.treasures, ['a map of a room you have never seen']);
  assert.equal(applyAction(cartographer, 'gift-map', satchel, ['gift-map']).reason, 'already-done');
});
