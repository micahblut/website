import test from 'node:test';
import assert from 'node:assert/strict';
import { DETAILS, AIR } from '../js/atmosphere.js';
import { generateRoom, describeRoom, roomFacts } from '../js/world.js';
import { uuidFrom } from '../js/rng.js';

test('the new categories have 50 details and 40 air choices', () => {
  assert.equal(DETAILS.length, 50);
  assert.equal(AIR.length, 40);
  assert.equal(new Set(DETAILS).size, 50);
  assert.equal(new Set(AIR).size, 40);
});
test('all room types receive repeatable detail and air choices', () => {
  const kinds = new Set(), details = new Set(), air = new Set();
  for (let i = 0; i < 2000; i++) {
    const id = uuidFrom(`atmosphere:${i}`);
    const room = generateRoom(id);
    assert.deepEqual(room, generateRoom(id));
    assert.ok(DETAILS.includes(room.ambience.detail));
    assert.ok(AIR.includes(room.ambience.air));
    kinds.add(room.rarity); details.add(room.ambience.detail); air.add(room.ambience.air);
  }
  assert.deepEqual([...kinds].sort(), ['glorious', 'sinister', 'standard']);
  assert.equal(details.size, 50); assert.equal(air.size, 40);
});
test('older room records without the new fields remain usable', () => {
  const room = generateRoom(uuidFrom('legacy-atmosphere'));
  delete room.ambience.detail; delete room.ambience.air;
  assert.equal(describeRoom(room).includes('undefined'), false);
  assert.equal(roomFacts(room).includes('undefined'), false);
});
