
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

  sortWords(words1) {

    let n1 = words1.length;

    if (n1 < 2) {
      return words1;
    }

    words1 = words1.sort(this.compareWords);

    return words1;

  }

  sortHighScoresDesc(players1) {

    let n1 = players1.length;

    if (n1 < 2) {
      return players1;
    }

    players1 = players1.sort(this.compareHighScores);
    players1 = players1.reverse();

    return players1;

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