import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import FlippableCard from "../components/FlippableCard";
import CreateFlashcard from "./CreateFlashcard";
import Expandable from "../components/Expandable";

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
      <header className="navbar">
        <h1 className="title logo">Memory Forge</h1>
        <button className="logout-button" onClick={() => setNeedLogout(true)}>
          Log out
        </button>
      </header>
      <div className="flashcards-links-container">
        <ul>
          <li>
            <Expandable>
              <CreateFlashcard
                flashcards={flashcards}
                setFlashcards={setFlashcards}
              />
            </Expandable>
          </li>
          <li>
            <Link to={"/revision-flashcards"}>Revision</Link>
          </li>
        </ul>
      </div>
      <div className="links-listedcards-container">
        {flashcards.map((card) => {
          return (
            <div key={card.flashcard_id}>
              <ul className="flashcard-list">
                <li>
                  <FlippableCard card={card} />
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
