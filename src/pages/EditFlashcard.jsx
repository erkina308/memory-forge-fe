import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { patchFlashcard } from "../../utils/flashcardApi";
import Nav from "../components/Nav";

export default function EditFlashcard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, answer, flashcard_id, topic } = location.state.flashcard;

  const [questionInput, setQuestionInput] = useState(question);
  const [answerInput, setAnswerInput] = useState(answer);
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

  //state for focus
  const [focusedTextarea, setFocusedTextarea] = useState(null);

  const input = {
    question: questionInput,
    answer: answerInput,
  };

  function handleFocus(id) {
    setFocusedTextarea(id);
  }

  function handleBlur() {
    setFocusedTextarea(null);
  }

  //form submit for patch
  function handleEditFlashcardSubmit(e) {
    e.preventDefault();
    setSubmitBtnClicked(true);
    if (
      //if the new inputs are the same as the original inputs nothing happens
      input.question === question &&
      input.answer === answer
    ) {
      return;
    } else {
      patchFlashcard(flashcard_id, input);
    }
    // setTimeout(() => {
    //   setSubmitBtnClicked(false);
    // }, 1000);
  }

  function handleReturn() {
    navigate(`/flashcards/topic?topic=${topic}`);
  }

  return (
    <div>
      <Nav />
      <form onSubmit={handleEditFlashcardSubmit} className="edit_quiz_form">
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

        <label htmlFor="answerInput">Answer: </label>
        <textarea
          id="answerInput"
          name="answerInput"
          onFocus={() => handleFocus("answerInput")}
          onBlur={handleBlur}
          style={{
            backgroundColor:
              focusedTextarea === "answerInput" ? "white" : "#f0f0f0", //add more styling especially border radius, border, box-shadow etc
          }}
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          required
        />

        {/* {submitBtnClicked && input.question !== question ? (
          <p>Question changed</p>
        ) : null}
        {submitBtnClicked && input.answer !== answer ? (
          <p>Answer changed</p>
        ) : null} */}
        <button type="submit">Save</button>
        <div>
          <button type="button" onClick={handleReturn}>
            Return
          </button>
        </div>
      </form>
    </div>
  );
}
