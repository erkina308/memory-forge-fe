import { useState } from "react";
import { postFlashcard } from "../../utils/flashcardApi";

export default function CreateFlashcard({ flashcards, setFlashcards }) {
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  // const [err, setErr] = useState(null);

  const flashcard_id = new Date(); //for the new flashcard, as it is being optimistically rendered and requires an id for the key in the flashcards page
  const input = {
    question: questionInput,
    answer: answerInput,
  };

  function handleFlashcardSubmit(e) {
    e.preventDefault();
    setAnswerInput("");
    setQuestionInput("");
    const newFlashcard = { ...input, flashcard_id };
    setFlashcards([newFlashcard, ...flashcards]);
    postFlashcard(input);
  }

  return (
    <section>
      <form onSubmit={handleFlashcardSubmit}>
        <label htmlFor="newQuestion">Question</label>
        <textarea
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
