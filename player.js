

import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

export default class Player {

  name;
  score;

  constructor(name) {
    this.score = 0;
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setScore(score) {
    this.score = score;
  }

  getScore() {
    return this.score;
  }

  asStringForFile() {

    let strText = "";
    strText = strText + this.getName() + "," + this.getScore() + "\r\n";
    return strText;

  }

}
