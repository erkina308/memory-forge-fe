import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards().then((flashcards) => {
      setFlashcards(flashcards);
    });
  }, [flashcards]);

  return (
    <section>
      {flashcards.map((flashcard) => {
        <div key={flashcard.flashcard_id}>
          <ul>
            <li>{flashcard}</li>
          </ul>
        </div>;
      })}
    </section>
  );
}
