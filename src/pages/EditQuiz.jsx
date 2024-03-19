import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { patchQuiz } from "../../utils/quizzesApi";

export default function EditQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, choices, correct_answer, quiz_id } = location.state.quiz;

  //states for save button
  const [inputQuestion, setInputQuestion] = useState(question);
  const [inputChoiceOne, setInputChoiceOne] = useState(choices[0]);
  const [inputChoiceTwo, setInputChoiceTwo] = useState(choices[1]);
  const [inputChoiceThree, setInputChoiceThree] = useState(choices[2]);
  const [inputChoiceFour, setInputChoiceFour] = useState(choices[3]);
  const [inputAnswer, setInputAnswer] = useState(correct_answer);
  //state for focus
  const [focusedTextarea, setFocusedTextarea] = useState(null);

  // input to send off for the patch request
  const input = {
    question: inputQuestion,
    choices: [
      inputChoiceOne,
      inputChoiceTwo,
      inputChoiceThree,
      inputChoiceFour,
    ],
    correct_answer: inputAnswer,
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
    if (
      input.question === question &&
      input.choices[0] === choices[0] &&
      input.choices[1] === choices[1] &&
      input.choices[2] === choices[2] &&
      input.choices[3] === choices[3] &&
      input.correct_answer === correct_answer
    ) {
      return;
    } else if (
      inputAnswer === inputChoiceOne ||
      inputAnswer === inputChoiceTwo ||
      inputAnswer === inputChoiceThree ||
      inputAnswer === inputChoiceFour
    ) {
      patchQuiz(quiz_id, input);
    } else {
      console.log("correct answer must match one of the choices");
      return;
    }
  }

  //return to quizzes page
  function handleReturn() {
    navigate("/quizzes/view-quizzes");
  }

  return (
    <div>
      <form onSubmit={handleEditQuizSubmit}>
        <label htmlFor="currentQuestion">Question: </label>
        <textarea
          id="currentQuestion"
          name="currentQuestion"
          onFocus={() => handleFocus("currentQuestion")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "currentQuestion" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
        />

        <label htmlFor="currentChoices">Choices: </label>
        <textarea
          id="choiceOne"
          name="choiceOne"
          onFocus={() => handleFocus("choiceOne")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceOne" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputChoiceOne}
          onChange={(e) => setInputChoiceOne(e.target.value)}
        />

        <textarea
          id="choiceTwo"
          name="choiceTwo"
          onFocus={() => handleFocus("choiceTwo")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceTwo" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputChoiceTwo}
          onChange={(e) => setInputChoiceTwo(e.target.value)}
        />

        <textarea
          id="choiceThree"
          name="choiceThree"
          onFocus={() => handleFocus("choiceThree")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceThree" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputChoiceThree}
          onChange={(e) => setInputChoiceThree(e.target.value)}
        />

        <textarea
          id="choiceFour"
          name="choiceFour"
          onFocus={() => handleFocus("choiceFour")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "choiceFour" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputChoiceFour}
          onChange={(e) => setInputChoiceFour(e.target.value)}
        />

        <label htmlFor="currentAnswer">Answer: </label>
        <textarea
          id="currentAnswer"
          name="currentAnswer"
          onFocus={() => handleFocus("currentAnswer")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "currentAnswer" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
        />

        <button type="submit">Save</button>
        <div>
          <button type="button" onClick={handleReturn}>
            Return
          </button>
          {/* add an onclick to this to navigate back to the quizzes */}
        </div>
      </form>
    </div>
  );
}
