
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

import { appendFileSync, readFileSync } from 'node:fs';

import Word from "./word.js";
import Player from "./player.js";



export default class ArrayHandler {

  players = [];
  words = [];

  constructor() {

  }

  compareHighScores(player1, player2) {

    let scoreA = player1.score;
    let scoreB = player2.score;

    return scoreA - scoreB;

  }

  compareWords(word1, word2) {

    let wordA = word1.txtWord.toLowerCase();
    let wordB = word2.txtWord.toLowerCase();

    if (wordA == wordB) {
      return 0;
    }
    else if (wordA > wordB) {
      return 1;
    }
    else if (wordA < wordB) {
      return -1;
    }

  }

}