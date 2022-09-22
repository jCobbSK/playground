import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

const WORD_COUNT = 100;

/*
We deliberatelly store this in memory, it will remain the same until server is restarted.
So we can call the API multiple times with the same results.
*/
const WORDS = new Array(WORD_COUNT).fill(0).map((_, idx) => ({
  id: `${idx}`,
  word: faker.word.noun(),
}));

const VERSION = randomUUID();

export function getWords() {
  return {
    data: WORDS,
    version: VERSION,
  };
}
