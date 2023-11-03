
import SecretWord from "./secretword.js";
import GuessedWord from "./guessedword.js";
import Gallows from "./gallows.js";
import Question from "./question.js";

import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;


export default class Game {

  gallows;
  guessedWord;
  secretWord;
  question;
  turnNbr;
  score;

  constructor() {

    this.startGame();

  }

  startGame() {

    this.score = 0;
    this.turnNbr = 0;
    print("Welcome to hangman!");
    this.gallows = new Gallows();
    this.question = new Question("Type in the secret word: ");
    this.secretWord = new SecretWord(this.question.answer);
    this.guessedWord = new GuessedWord(this.secretWord);
    print("The secret word has " + this.secretWord.length() + " letters.\n");
    this.guessedWord = new GuessedWord(this.secretWord);
    print(this.guessedWord.getCodedWordAsText() + "\n");
    this.guessWord();

  }

  guessWord() {

    this.turnNbr++;
    let newQuestion = new Question("Guess a letter: ");
    let letter = newQuestion.answer;

    print("You guessed: " + letter + ".");

    this.guessedWord.addLetterToUsedLetterList(letter);
    this.guessedWord.fillSecretWordWithLetters();

    print("You have guessed the letters: \n");
    print(this.guessedWord.guessedLetterList);
    print("\n" + this.guessedWord.getCodedWordAsText() + "\n");
    print("You are at turn number: " + this.turnNbr + ".\n");

    if (this.secretWord.isLetterInSecretWord(letter)) {

      print("\nYou found: \n" + this.guessedWord.getCodedWordAsText() + "\n");

      this.checkWin();

    } else {

      print(this.gallows.step());

      this.checkLoose();

    }

  }

  checkWin() {

    if (this.guessedWord.isWholeWordFound()) {

      print("Congratulations, you barely survived this time: \n");
      print("The word was: " + this.guessedWord.secretWordAsText + ".");
      this.score = this.calculateScore(this.turnNbr);
      print("\nYour score is: " + this.score + ".\n");

    } else {

      this.guessWord();

    }

  }

  checkLoose() {

    if (this.gallows.stages.length == 0) {

      print("Wonderful, you got to hang! \n" + "The word was " +
        this.secretWord.asString + ".");

    } else {

      this.guessWord();

    }

  }

  calculateScore(nbrOfTurns) {

    return 1000 - 50 * (nbrOfTurns - this.secretWord.length());

  }

}