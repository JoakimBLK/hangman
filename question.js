
import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

const print = console.log;

export default class Question {

  questionText;
  answer;

  constructor(questionText) {

    this.questionText = questionText;
    this.answer = prompt(questionText).toLowerCase();

  }

}
