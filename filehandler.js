
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

import { appendFileSync, readFileSync } from 'node:fs';

import Word from "./word.js";
import Player from "./player.js";
import ArrayHandler from "./arrayhandler.js";


export default class FileHandler {

  txtFileWord;
  txtFileHighScore;
  txtHighScoreDefault;
  txtFileWordDefault;
  arrayHandler;

  players = [];
  words = [];

  constructor() {

    this.txtFileWord = "data/words.csv";
    this.txtFileHighScore = "data/highscores.csv";
    this.txtFileWordDefault = "data/words_copy.csv";
    this.txtFileHighScoreDefault = "data/highscores_copy.csv";
    this.arrayHandler = new ArrayHandler();

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

  addPlayerToHighScoreList(player1) {
    this.players.push(player1);
  }

  addWordToWordList(word1) {

    if (!this.isWordInList(word1)) {
      this.words.push(word1);
    }

  }

  isWordInList(word1) {

    bIsInList = false;
    let n1 = words.length;

    if (n1 < 1) {
      return bIsInList;
    }

    for (let i = 0; i < n1; i++) {

      let strTextA = word1.txtWord.toLowerCase();
      let strTextB = words[i].txtWord.toLowerCase();

      if (strTextA == strTextB) {
        bIsInList = true;
        return bIsInList;
      }

    }

    return bIsInList;

  }

  sortHighScores() {

    this.players = this.arrayHandler.sortHighScoresDesc(this.players);

    return this.players;

  }

  sortWords() {

    this.words = this.arrayHandler.sortWords(this.words);

    return this.words;

  }

  getHighScoresFromFile(bOverWriteList, bDefaultFile) {

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
    if (bOverWriteList) {
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

  getWordsFromFile(bOverWriteList, bDefaultFile) {

    let savedWords = [];

    let fileName = this.txtFileWord;

    if (bDefaultFile) {
      fileName = this.txtFileWordDefault;
    }

    try {

      savedWords = readFileSync(fileName, "utf-8");
    } catch (err) {
      console.error(err);
    }

    savedWords = savedWords.trim();
    savedWords = savedWords.split('\r\n');

    // Check if we want to empty the list,
    // before reading data from the file.
    if (bOverWriteList) {
      this.words = [];
    }

    for (let word of savedWords) {
      let txtWord = word;
      this.words.push(new Word(txtWord));
    }

    return this.words;

  }

  writeHighScoresToFile(bOverWriteFile) {

    let txtPlayers = "";

    let fileName = this.txtFileHighScore;

    let n1 = this.players.length;

    // If no players do not write anything.
    if (n1 < 1) {
      return;
    }

    for (let i = 0; i < n1; i++) {
      txtPlayers = txtPlayers + this.players[i].asStringForFile();
    }

    try {

      // Overwrite file.
      if (bOverWriteFile) {
        appendFileSync(fileName, txtPlayers, { flag: 'w+' }, "utf8");
      }
      // Append to file.
      else {
        appendFileSync(fileName, txtPlayers, "utf8");
      }

    } catch (err) {
      console.error(err);
    }

  }

  writeWordsToFile(bOverWriteFile) {

    let txtWords = "";

    let fileName = this.txtFileWord;

    let n1 = this.words.length;

    // If no players do not write anything.
    if (n1 < 1) {
      return;
    }

    for (let i = 0; i < n1; i++) {
      txtWords = txtWords + this.words[i].asStringForFile();
    }

    try {

      // Overwrite file.
      if (bOverWriteFile) {
        appendFileSync(fileName, txtWords, { flag: 'w+' }, "utf8");
      }
      // Append to file.
      else {
        appendFileSync(fileName, txtWords, "utf8");
      }

    } catch (err) {
      console.error(err);
    }

  }

}
