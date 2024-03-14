import { useState, useEffect } from "react";
import { fetchFlashcards } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import FlippableCard from "../components/FlippableCard";

export default function FlashcardRevision() {
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      });
    }
  }, [needLogout]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return Math.min(prevIndex + 1, flashcards.length - 1);
    }); //adds 1 to the previous index but makes sure it doesn't exceed the max
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return Math.max(prevIndex - 1, 0);
    }); //subtracts 1 from the previous index but ensures that it doesn't go below 0 the first index
  };

  if (isLoading) return <p>Page Loading...</p>;
  return (
    <div>
      <header className="navbar">
        <h1 className="title logo">Memory Forge</h1>
        <button className="logout-button" onClick={() => setNeedLogout(true)}>
          Log out
        </button>
      </header>

      <section id="flashcard-revision">
        <FlippableCard card={flashcards[currentCardIndex]} />
        <button className="previous-button" onClick={handlePreviousCard}>
          previous
        </button>
        <button className="next-button" onClick={handleNextCard}>
          next
        </button>
      </section>
    </div>
  );
}
