
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

import { appendFileSync, readFileSync } from 'node:fs';

import Word from "./word.js";
import Player from "./player.js";



export default class FileHandler {

  txtFileWord;
  txtFileHighScore;
  players = [];
  words = [];

  constructor() {
    this.txtFileWord = "data/correctwords.csv";
    this.txtFileHighScore = "data/highscores.csv";
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

  getHighScoresFromFile() {

    let savedPlayers = [];

    try {
      savedPlayers = readFileSync(this.txtFileHighScore, "utf-8");
    } catch (err) {
      console.error(err);
    }

    savedPlayers = savedPlayers.trim();
    savedPlayers = savedPlayers.split('\r\n');

    for (let player of savedPlayers) {
      player = player.split(',');
      let txtName = player[0];
      let iScore = parseInt(player[1]);
      this.players.push(new Player(txtName, iScore));
    }

    console.log(this.players);

    return this.players;

  }

}
