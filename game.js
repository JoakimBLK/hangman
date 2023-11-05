
import SecretWord from "./secretword.js";
import GuessedWord from "./guessedword.js";
import Gallows from "./gallows.js";
import Question from "./question.js";
import Word from "./word.js";
import Player from "./player.js";
import FileHandler from "./filehandler.js";
import ArrayHandler from "./arrayhandler.js";

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
  word;
  player;
  fileHandler;
  arrayHandler;

  constructor() {

    this.startGame();

  }

  startGame() {

    this.score = 0;
    this.turnNbr = 0;

    this.checkOldGamesAndResults();

    print("Welcome to hangman!");
    let nameQuestion = new Question("What is your name: ");
    this.player = new Player(nameQuestion.answer);
    this.gallows = new Gallows();
    this.question = new Question("Type in the secret word: ");

    this.word = new Word(this.question.answer);

    // Add a word to word list and save to file.
    this.fileHandler.addWordToWordList(this.word);
    this.fileHandler.sortWords();
    this.arrayHandler.copyAndSaveWordsList(this.fileHandler.words);
    let bOverWriteFile = true;
    this.fileHandler.writeWordsToFile(bOverWriteFile);

    // Use the written secret word or a word from file.
    let answer = "";
    answer = prompt("Do you want to use a secret word from file (yes or no)? ");
    if (answer.charAt(0).toLowerCase() == "y") {
      this.secretWord = new SecretWord(this.fileHandler.getRandomWordFromList());
    }
    else {
      this.secretWord = new SecretWord(this.question.answer);
    }

    this.guessedWord = new GuessedWord(this.secretWord);
    print("The secret word has " + this.secretWord.length() + " letters.\n");
    this.guessedWord = new GuessedWord(this.secretWord);
    print(this.guessedWord.getCodedWordAsText() + "\n");
    this.guessWord();

  }

  checkOldGamesAndResults() {

    this.fileHandler = new FileHandler();
    this.arrayHandler = new ArrayHandler();
    let bOverWriteList = true;
    let bOverWriteFile = true;
    let bDefaultFile = false;
    let answer = "";

    // Reset highscores from initial file (if you want to do so).
    answer = prompt("Do you want to reset highscores (yes or no)? ");
    if (answer.charAt(0).toLowerCase() == "y") {
      bDefaultFile = true;
      this.fileHandler.getHighScoresFromFile(bOverWriteList, bDefaultFile);
      this.fileHandler.writeHighScoresToFile(bOverWriteFile);
    }

    // Reset words from initial file (if you want to do so).
    answer = prompt("Do you want to reset word list (yes or no)? ");
    if (answer.charAt(0).toLowerCase() == "y") {
      bDefaultFile = true;
      this.fileHandler.getWordsFromFile(bOverWriteList, bDefaultFile);
      this.fileHandler.writeWordsToFile(bOverWriteFile);
    }

    // Get old highscores from file.
    let highscores = this.fileHandler.getHighScoresFromFile(bOverWriteList);
    highscores = this.arrayHandler.sortHighScoresDesc(highscores);
    print("Earlier highscores:");
    print(highscores);

    // Get old words from file.
    let words = this.fileHandler.getWordsFromFile(bOverWriteList);
    words = this.arrayHandler.sortWords(words);
    print("\nEarlier words that have been used:");
    print(words);

  }

  guessWord() {

    this.turnNbr++;
    let newQuestion = new Question("Guess a letter: ");
    let letter = newQuestion.answer;
    let bLetterAlreadyGuessed = false;

    // Check if letter already guessed before the new letter.
    bLetterAlreadyGuessed = this.guessedWord.isLetterAlreadyGuessed(letter);

    print("You guessed: " + letter + ".");

    this.guessedWord.addLetterToUsedLetterList(letter);
    this.guessedWord.fillSecretWordWithLetters();

    print("You have guessed the letters: \n");
    print(this.guessedWord.guessedLetterList);
    print("\n" + this.guessedWord.getCodedWordAsText() + "\n");
    print("You are at turn number: " + this.turnNbr + ".\n");

    if (this.secretWord.isLetterInSecretWord(letter) &&
      !bLetterAlreadyGuessed) {

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
      this.player.setScore(this.score);
      print("\nYour score is: " + this.score + ".\n");

      // Add player to highscore list in file.
      this.fileHandler.addPlayerToHighScoreList(this.player);
      let bOverWriteFile = true;
      this.fileHandler.sortHighScores();
      this.arrayHandler.copyAndSavePlayersList(this.fileHandler.players);
      this.fileHandler.writeHighScoresToFile(bOverWriteFile);

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
