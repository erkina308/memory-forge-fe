import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Flashcard from "../cards/Flashcard";

export default function FlashcardRevision() {
  const [flashcards, setFlashcards] = useState([]);
  const [needLogout, setNeedLogout] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
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
  }, [needLogout]);

  return (
    <section>
      {flashcards.map((flashcard) => {
        return (
          <div key={flashcard.flashcard_id}>
            <Flashcard card={flashcard} />
          </div>
        );
      })}
      <button onClick={() => setNeedLogout(true)}>Log out</button>
    </section>
  );
}
