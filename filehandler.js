
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

import { appendFileSync, readFileSync } from 'node:fs';

import Word from "./word.js";
import Player from "./player.js";



export default class FileHandler {

  txtFileWord;
  txtFileHighScore;
  txtHighScoreDefault;
  txtFileWordDefault;

  players = [];
  words = [];

  constructor() {
    this.txtFileWord = "data/correctwords.csv";
    this.txtFileHighScore = "data/highscores.csv";
    this.txtFileWordDefault = "data/correctwords_copy.csv";
    this.txtFileHighScoreDefault = "data/highscores_copy.csv";
  }

  setFileNameWord(txtWord) {
    this.txtFileWord = "data/" + txtWord;
  }

  getFileNameWord() {
    return this.txtFileWord;
  }

  setFileNameHighScore(txtWord) {
    this.txtFileHighScore = "data/" + txtWord;
  }

  getFileNameHighScore() {
    return this.txtFileHighScore;
  }

  getHighScoresFromFile(bOverWrite, bDefaultFile) {

    let savedPlayers = [];

    let fileName = this.txtFileHighScore;

    if (bDefaultFile) {
      fileName = this.txtFileHighScoreDefault;
    }

    try {
      savedPlayers = readFileSync(fileName, "utf-8");
    } catch (err) {
      console.error(err);
    }

    savedPlayers = savedPlayers.trim();
    savedPlayers = savedPlayers.split('\r\n');

    // Check if we want to empty the list,
    // before reading data from the file.
    if (bOverWrite) {
      this.players = [];
    }

    for (let player of savedPlayers) {
      player = player.split(',');
      let txtName = player[0];
      let iScore = parseInt(player[1]);
      this.players.push(new Player(txtName, iScore));
    }

    return this.players;

  }

}
