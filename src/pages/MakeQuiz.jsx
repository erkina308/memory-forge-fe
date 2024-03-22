import { useState } from "react";
import { postQuiz } from "../../utils/quizzesApi";

export default function MakeQuiz({ quizzes, setQuizzes }) {
  const [questionInput, setQuestionInput] = useState("");
  const [correctAnswerInput, setCorrectAnswerInput] = useState("");
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
  const [inputs, setInputs] = useState({
    choiceOneInput: "",
    choiceTwoInput: "",
    choiceThreeInput: "",
    choiceFourInput: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  //isUnique function to check if choices are all unique
  const isUnique = () => {
    const values = Object.values(inputs);
    return new Set(values).size === values.length;
  };

  //reset inputs function to be used in post request
  const resetInputs = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      choiceOneInput: "",
      choiceTwoInput: "",
      choiceThreeInput: "",
      choiceFourInput: "",
    }));
  };

  //by using react state need to make something appear on page to let user know the correct answer has to match one of the choices
  //also for everything need to give feedback to the user

  const input = {
    question: questionInput,
    choices: [
      inputs.choiceOneInput,
      inputs.choiceTwoInput,
      inputs.choiceThreeInput,
      inputs.choiceFourInput,
    ],
    correct_answer: correctAnswerInput,
  };

  async function handleMakeQuiz(e) {
    e.preventDefault();
    setSubmitBtnClicked(true);
    if (isUnique()) {
      if (
        //checking if the correct answer matches at least one of the inputs
        correctAnswerInput === inputs.choiceOneInput ||
        correctAnswerInput === inputs.choiceTwoInput ||
        correctAnswerInput === inputs.choiceThreeInput ||
        correctAnswerInput === inputs.choiceFourInput
      ) {
        setSubmitBtnClicked(false);
        resetInputs();
        setQuestionInput("");
        setCorrectAnswerInput("");
        const data = await postQuiz(input);
        const newQuiz = { ...input, quiz_id: data.quiz_id };
        setQuizzes([newQuiz, ...quizzes]);
      } else {
        console.log("the correct answer has to match one of the choices");
        return;
      }
    } else {
      return;
    }
  }

  return (
    <section>
      <form onSubmit={handleMakeQuiz}>
        <label htmlFor="questionInput">Question</label>
        <textarea
          name="questionInput"
          id="questionInput"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          required
        />
        <label htmlFor="choiceOneInput">Choice 1</label>
        <textarea
          name="choiceOneInput"
          id="choiceOneInput"
          value={inputs.choiceOneInput}
          onChange={handleChange}
          required
        />
        <label htmlFor="choiceTwoInput">Choice 2</label>
        <textarea
          name="choiceTwoInput"
          id="choiceTwoInput"
          value={inputs.choiceTwoInput}
          onChange={handleChange}
          required
        />
        <label htmlFor="choiceOneInput">Choice 3</label>
        <textarea
          name="choiceThreeInput"
          id="choiceThreeInput"
          value={inputs.choiceThreeInput}
          onChange={handleChange}
          required
        />
        <label htmlFor="choiceFourInput">Choice 4</label>
        <textarea
          name="choiceFourInput"
          id="choiceFourInput"
          value={inputs.choiceFourInput}
          onChange={handleChange}
          required
        />
        <label htmlFor="correctAnswer">Correct Answer</label>
        <textarea
          name="correctAnswerInput"
          id="correctAnswerInput"
          value={correctAnswerInput}
          onChange={(e) => setCorrectAnswerInput(e.target.value)}
          required
        />
        <button type="submit">Make new quiz</button>
        {submitBtnClicked && !isUnique() && <p>All inputs must be unique.</p>}
      </form>
    </section>
  );
}
