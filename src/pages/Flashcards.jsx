import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [needLogout, setNeedLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (needLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      fetchFlashcards().then((flashcards) => {
        setFlashcards(flashcards);
      });
    }
  }, [needLogout, navigate]);

  return (
    <section>
      {flashcards.map((flashcard) => {
        return (
          <div key={flashcard.flashcard_id}>
            <ul>
              <li>{`Question: ${flashcard.question}`}</li>
              <li>{`Answer: ${flashcard.answer}`}</li>
            </ul>
          </div>
        );
      })}
      <button onClick={() => setNeedLogout(true)}>Log out</button>
    </section>
  );
}
