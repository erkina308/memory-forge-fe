import { useState } from "react";
import { postFlashcard } from "../../utils/api";

export default function CreateFlashcard() {
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const input = {
    question: questionInput,
    answer: answerInput,
  };
  function handleFlashcardSubmit(e) {
    e.preventDefault();
    setAnswerInput("");
    setQuestionInput("");
    postFlashcard(input);
  }

  return (
    <section>
      <form onSubmit={handleFlashcardSubmit}>
        <label htmlFor="newQuestion">Question</label>
        <input
          name="newQuestion"
          id="newQuestion"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          required
        />
        <label htmlFor="newAnswer">Answer</label>
        <textarea
          name="newAnswer"
          id="newAnswer"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          required
        />
        <button type="submit">Make new flashcard</button>
      </form>
    </section>
  );
}
