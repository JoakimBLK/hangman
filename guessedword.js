
export default class GuessedWord {

  secretWord;
  secretWordAsText;
  secretWordAsLetters = [];
  secretWordCoded = [];
  guessedLetterList = [];
  correctGuessedLetters = [];

  fillChar = "*";

  constructor(newSecretWord) {

    this.secretWord = newSecretWord;
    this.secretWordAsText = this.secretWord.secretWordAsText;
    this.secretWordAsLetters = this.secretWord.processSecretWord();
    this.fillSecretWordWithOnlyStars();

  }

  isWholeWordFound() {

    this.fillSecretWordWithLetters();

    return !this.secretWordCoded.includes(this.fillChar);

  }

  getCodedWordAsText() {
    return this.secretWordCoded.join("");
  }

  fillSecretWordWithLetters() {

    let n1 = this.secretWordAsText.length;
    let letter = "";

    for (let i = 0; i < n1; i++) {

      letter = this.secretWordAsText.charAt(i).toLowerCase();

      if (this.isLetterAlreadyGuessed(letter)) {
        this.secretWordCoded[i] = letter;
      }
      else {
        this.secretWordCoded[i] = this.fillChar;
      }

    }

  }

  fillSecretWordWithOnlyStars() {

    let n1 = this.secretWordAsText.length;

    for (let i = 0; i < n1; i++) {
      this.secretWordCoded[i] = this.fillChar;
    }

  }

  isLetterAlreadyGuessed(letter) {
    return this.guessedLetterList.includes(letter);
  }

  addLetterToUsedLetterList(letter) {

    let bOK = false;

    if (letter.length < 1) {
      return bOK;
    }

    let letter1 = letter.charAt(0).toLowerCase();

    if (this.secretWord.isLetterInSecretWord(letter1) &&
      !this.isLetterAlreadyGuessed(letter1)) {
      this.guessedLetterList.push(letter1);
      this.correctGuessedLetters.push(letter1);
      bOK = true;
    }
    else if (this.secretWord.isLetterInSecretWord(letter1) &&
      this.isLetterAlreadyGuessed(letter1)) {
      bOK = false;
    }
    else if (!this.secretWord.isLetterInSecretWord(letter1) &&
      !this.isLetterAlreadyGuessed(letter1)) {
      this.guessedLetterList.push(letter1);
      bOK = false;
    }
    else {
      bOK = false;
    }

    return bOK;

  }

}
