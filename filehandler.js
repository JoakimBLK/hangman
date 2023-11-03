
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

export default class FileHandler {

  txtFileWord;
  txtFileHighScore;

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

}
