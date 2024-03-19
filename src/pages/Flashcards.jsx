import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/flashcardApi";
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

  //get the right id for the key when rendering, used in the .map below
  function getKey(instance) {
    if (instance.tempId) {
      return instance.tempId;
    } else {
      return instance.flashcard_id;
    }
  }

  //rendering flashcards if page has loaded
  if (isLoading) return <p>Page Loading...</p>;
  return (
    <section>
      <header className="navbar">
        <h1 className="title logo">
          <Link to={"/dashboard"}>Memory Forge</Link>
        </h1>

        <button className="logout-button" onClick={() => setNeedLogout(true)}>
          Log out
        </button>
      </header>
      <div className="flashcards-links-container">
        <ul>
          <li>
            <Expandable text={"Make new flashcard"}>
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
            <div key={getKey(card)}>
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
