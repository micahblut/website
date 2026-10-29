import test from 'node:test';
import assert from 'node:assert/strict';
import { CAST } from '../js/characters.js';
import { characterPrompt, wandererTurn, conversationStage, WEARY_AFTER, LAST_WORD_AT } from '../js/encounters.js';
import { FOUNDATION, NARRATOR_VOICE, roomPrompt } from '../js/prompts.js';

const satchel = { keys: 1, treasures: [] };

test('the shared foundation keeps the labyrinth endless and exitless', () => {
  assert.match(FOUNDATION, /no exit/);
  assert.match(FOUNDATION, /Never invent new doors, exits, items/);
});
test('character instructions speak in first person and do not include the second-person narrator voice', () => {
  for (const c of CAST) {
    const prompt = characterPrompt(c, 'facts');
    assert.match(prompt, /first person/);
    assert.ok(!prompt.includes(NARRATOR_VOICE));
  }
});
test('characters wind down after 6 things said and end at 10', () => {
  assert.equal(WEARY_AFTER, 6); assert.equal(LAST_WORD_AT, 10);
  assert.equal(conversationStage(6), 'open');
  assert.equal(conversationStage(7), 'weary');
  assert.equal(conversationStage(10), 'last');
  assert.ok(!wandererTurn('hi', satchel, 6).includes('final reply'));
  assert.match(wandererTurn('hi', satchel, 7), /move on/);
  assert.match(wandererTurn('hi', satchel, 10), /final reply/);
});
test('room descriptions carry the tone of their rarity', () => {
  assert.match(roomPrompt('f', 'glorious'), /wonder/);
  assert.match(roomPrompt('f', 'sinister'), /dread/);
  assert.match(roomPrompt('f'), /restrained/);
});
