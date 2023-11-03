

import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

export default class Word {

  txtWord;

  constructor(txtWord) {
    this.txtWord = txtWord;
  }

  setWord(txtWord) {
    this.txtWord = txtWord;
  }

  getName() {
    return this.txtWord;
  }

  asStringForFile() {

    let strText = "";
    strText = strText + this.getWord() + "\r\n";
    return strText;

  }

}
