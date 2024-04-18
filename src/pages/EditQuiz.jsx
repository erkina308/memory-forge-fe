import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { patchQuiz } from "../../utils/quizzesApi";
import Nav from "../components/Nav";

export default function EditQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, choices, correct_answer, quiz_id } = location.state.quiz;

  //states for save button
  const [questionInput, setQuestionInput] = useState(question);
  const [correctAnswerInput, setCorrectAnswerInput] = useState(correct_answer);
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
  const [inputs, setInputs] = useState({
    choiceOneInput: choices[0],
    choiceTwoInput: choices[1],
    choiceThreeInput: choices[2],
    choiceFourInput: choices[3],
  });

  //state for focus
  const [focusedTextarea, setFocusedTextarea] = useState(null);

  //handle change for the choices
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

  // input to send off for the patch request
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

  //handle focus and handle blur for the text areas
  function handleFocus(id) {
    setFocusedTextarea(id);
  }

  function handleBlur() {
    setFocusedTextarea(null);
  }

  //form submit for patch
  function handleEditQuizSubmit(e) {
    e.preventDefault();
    setSubmitBtnClicked(true);
    if (isUnique()) {
      if (
        //if the new inputs are the same as the original inputs nothing happens
        input.question === question &&
        input.choices[0] === choices[0] &&
        input.choices[1] === choices[1] &&
        input.choices[2] === choices[2] &&
        input.choices[3] === choices[3] &&
        input.correct_answer === correct_answer
      ) {
        return;
      } else if (
        //checks if the input answer matches at least one of the choices
        correctAnswerInput === inputs.choiceOneInput ||
        correctAnswerInput === inputs.choiceTwoInput ||
        correctAnswerInput === inputs.choiceThreeInput ||
        correctAnswerInput === inputs.choiceFourInput
      ) {
        patchQuiz(quiz_id, input);
      } else {
        console.log("correct answer must match one of the choices");
        return;
      }
    } else {
      return;
    }
  }

  //return to quizzes page
  function handleReturn() {
    navigate("/quizzes/view-quizzes");
  }

  return (
    <div>
      <Nav />
      <form onSubmit={handleEditQuizSubmit} className="edit_quiz_form">
        <label htmlFor="questionInput">Question: </label>
        <textarea
          id="questionInput"
          name="questionInput"
          onFocus={() => handleFocus("questionInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "questionInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          required
        />

        <label htmlFor="choices">Choices: </label>
        <textarea
          id="choiceOneInput"
          name="choiceOneInput"
          onFocus={() => handleFocus("choiceOneInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceOneInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputs.choiceOneInput}
          onChange={handleChange}
        />

        <textarea
          id="choiceTwoInput"
          name="choiceTwoInput"
          onFocus={() => handleFocus("choiceTwoInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceTwoInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputs.choiceTwoInput}
          onChange={handleChange}
        />

        <textarea
          id="choiceThreeInput"
          name="choiceThreeInput"
          onFocus={() => handleFocus("choiceThreeInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceThreeInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputs.choiceThreeInput}
          onChange={handleChange}
        />

        <textarea
          id="choiceFourInput"
          name="choiceFourInput"
          onFocus={() => handleFocus("choiceFourInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceFourInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputs.choiceFourInput}
          onChange={handleChange}
        />

        <label htmlFor="correctAnswerInput">Answer: </label>
        <textarea
          id="correctAnswerInput"
          name="correctAnswerInput"
          onFocus={() => handleFocus("correctAnswerInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "correctAnswerInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={correctAnswerInput}
          onChange={(e) => setCorrectAnswerInput(e.target.value)}
          required
        />

        <button type="submit">Save</button>
        {submitBtnClicked && !isUnique() && <p>All inputs must be unique.</p>}
        <div>
          <button type="button" onClick={handleReturn}>
            Return
          </button>
        </div>
      </form>
    </div>
  );
}
