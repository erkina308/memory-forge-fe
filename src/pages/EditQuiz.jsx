import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function EditQuiz() {
  const location = useLocation();
  const { question, choices, correct_answer } = location.state.quiz;

  //states for form
  const [newQuestion, setNewQuestion] = useState(question);
  const [choiceOne, setChoiceOne] = useState(choices[0]);
  const [choiceTwo, setChoiceTwo] = useState(choices[1]);
  const [choiceThree, setChoiceThree] = useState(choices[2]);
  const [choiceFour, setChoiceFour] = useState(choices[3]);
  const [newAnswer, setNewAnswer] = useState(correct_answer);
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
    console.log(input);
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
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
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
          value={choiceOne}
          onChange={(e) => setChoiceOne(e.target.value)}
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
          value={choiceTwo}
          onChange={(e) => setChoiceTwo(e.target.value)}
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
          value={choiceThree}
          onChange={(e) => setChoiceThree(e.target.value)}
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
          value={choiceFour}
          onChange={(e) => setChoiceFour(e.target.value)}
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
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            setInputQuestion(newQuestion);
            setInputChoiceOne(choiceOne);
            setInputChoiceTwo(choiceTwo);
            setInputChoiceThree(choiceThree);
            setInputChoiceFour(choiceFour);
            setInputAnswer(newAnswer);
          }}
        >
          Save
        </button>
        <div>
          <button type="submit">Return</button>
        </div>
      </form>
    </div>
  );
}
