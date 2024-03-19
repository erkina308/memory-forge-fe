import { useState } from "react";
import { postQuiz } from "../../utils/quizzesApi";

export default function MakeQuiz({ quizzes, setQuizzes }) {
  const [questionInput, setQuestionInput] = useState("");
  const [choiceOneInput, setChoiceOneInput] = useState("");
  const [choiceTwoInput, setChoiceTwoInput] = useState("");
  const [choiceThreeInput, setChoiceThreeInput] = useState("");
  const [choiceFourInput, setChoiceFourInput] = useState("");
  const [correctAnswerInput, setCorrectAnswerInput] = useState("");

  //by using react state need to make something appear on page to let user know the correct answer has to match one of the choices
  //also for everything need to give feedback to the user

  const input = {
    question: questionInput,
    choices: [
      choiceOneInput,
      choiceTwoInput,
      choiceThreeInput,
      choiceFourInput,
    ],
    correct_answer: correctAnswerInput,
  };

  const quiz_id = new Date();

  function handleMakeQuiz(e) {
    e.preventDefault();
    if (
      correctAnswerInput === choiceOneInput ||
      correctAnswerInput === choiceTwoInput ||
      correctAnswerInput === choiceThreeInput ||
      correctAnswerInput === choiceFourInput
    ) {
      setQuestionInput("");
      setChoiceOneInput("");
      setChoiceTwoInput("");
      setChoiceThreeInput("");
      setChoiceFourInput("");
      setCorrectAnswerInput("");
      const newQuiz = { ...input, quiz_id };
      setQuizzes([newQuiz, ...quizzes]);
      postQuiz(input);
    } else {
      console.log("the correct answer has to match one of the choices");
      return;
    }
  }

  return (
    <section>
      <form onSubmit={handleMakeQuiz}>
        <label htmlFor="newQuestion">Question</label>
        <textarea
          name="newQuestion"
          id="newQuestion"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          required
        />
        <label htmlFor="choiceOne">Choice 1</label>
        <textarea
          name="choiceOne"
          id="choiceOne"
          value={choiceOneInput}
          onChange={(e) => setChoiceOneInput(e.target.value)}
          required
        />
        <label htmlFor="choiceTwo">Choice 2</label>
        <textarea
          name="choiceTwo"
          id="choiceTwo"
          value={choiceTwoInput}
          onChange={(e) => setChoiceTwoInput(e.target.value)}
          required
        />
        <label htmlFor="choiceOne">Choice 3</label>
        <textarea
          name="choiceThree"
          id="choiceThree"
          value={choiceThreeInput}
          onChange={(e) => setChoiceThreeInput(e.target.value)}
          required
        />
        <label htmlFor="choiceFour">Choice 4</label>
        <textarea
          name="choiceFour"
          id="choiceFour"
          value={choiceFourInput}
          onChange={(e) => setChoiceFourInput(e.target.value)}
          required
        />
        <label htmlFor="correctAnswer">Correct Answer</label>
        <textarea
          name="correctAnswer"
          id="correctAnswer"
          value={correctAnswerInput}
          onChange={(e) => setCorrectAnswerInput(e.target.value)}
          required
        />
        <button type="submit">Make new quiz</button>
      </form>
    </section>
  );
}
