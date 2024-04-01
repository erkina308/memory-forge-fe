import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchFlashcards } from "../../utils/flashcardApi";
import FlippableCard from "../components/FlippableCard";
import Nav from "../components/Nav";

export default function FlashcardTopicPage() {
  const [flashcardsByTopic, setFlashcardsByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const topic = searchParams.get("topic");

  useEffect(() => {
    fetchFlashcards(topic).then((data) => {
      setFlashcardsByTopic(data);
      setIsLoading(false);
    });
  }, []);

  //get the right id for the key when rendering, used in the .map below
  function getKey(instance) {
    if (instance.tempId) {
      return instance.tempId;
    } else {
      return instance.flashcard_id;
    }
  }

  if (isLoading) <p>Page Loading...</p>;
  return (
    <section>
      <Nav />

      <div className="links-listedcards-container topic-page-container">
        {flashcardsByTopic.map((card) => {
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
