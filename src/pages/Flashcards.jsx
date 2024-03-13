import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [needLogout, setNeedLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //api call for flashcards
  useEffect(() => {
    if (needLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      fetchFlashcards().then((flashcards) => {
        setFlashcards(flashcards);
        setIsLoading(false);
      });
    }
  }, [needLogout]);

  //rendering flashcards if page has loaded
  if (isLoading) return <p>Page Loading...</p>;
  return (
    <section>
      <h2>Create flashcard</h2>
      <h2>
        <Link to={"/revision-flashcards"}>Revision</Link>
      </h2>
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
