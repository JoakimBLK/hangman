
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

import { appendFileSync, readFileSync } from 'node:fs';


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
      this.players.push(new Player(user[0], user[1]));
    }

    console.log(users);

    return this.players;

  }
}
