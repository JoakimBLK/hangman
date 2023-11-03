
export default class SecretWord {

  secretWordAsText;
  secretWordAsLetters = [];

  fillChar = "*";

  constructor(newSecretWord) {

    this.secretWordAsText = newSecretWord;
    this.secretWordAsLetters = this.processSecretWord();

  }

  processSecretWord() {
    return this.secretWordAsText.toLowerCase().split("");
  }

  get asString() {
    return this.secretWordAsText;
  }

  length() {
    return this.secretWordAsLetters.length;
  }

  getLetterAtPosition(index) {

    if (index < 0 || index >= this.length()) {
      return "";
    }
    else {
      return this.secretWordAsText.charAt(index);
    }

  }

  isLetterInSecretWord(letter) {
    return this.secretWordAsLetters.includes(letter);
  }

}
