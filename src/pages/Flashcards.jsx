import { useState, useEffect, useContext, Fragment } from "react";
import { TopicContext } from "../contexts/TopicContext";
import { fetchFlashcards } from "../../utils/flashcardApi";
import { useNavigate } from "react-router-dom";
import CreateFlashcard from "./CreateFlashcard";
import Expandable from "../components/Expandable";
import Nav from "../components/Nav";
import FlashSearchBar from "../components/FlashSearchBar";
import FlashSearchResults from "../components/FlashSearchResults";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [needLogout, setNeedLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { topics } = useContext(TopicContext);
  const navigate = useNavigate();

  const key = 1000;

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

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, results.length - 1)
      );
    }
  };

  //get the right id for the key when rendering, used in the .map below
  function getKey(instance) {
    if (instance.tempId) {
      return instance.tempId;
    } else {
      return instance.flashcard_id;
    }
  }
  //to get the count of flashcards by topic
  const getFlashcardCountsByTopic = () => {
    const flashcardCounts = {};
    flashcards.forEach((flashcard) => {
      const topic = flashcard.topic;
      flashcardCounts[topic] = (flashcardCounts[topic] || 0) + 1;
    });
    // console.log(flashcardCounts, "<-- flashcard counts?");
    return flashcardCounts;
  };

  const handleNavigate = () => {
    if (flashcards && flashcards.length > 0) {
      navigate("/revision-flashcards");
      setButtonClicked(false);
    } else {
      setButtonClicked(true);
    }
  };

  //rendering flashcards if page has loaded
  if (isLoading) return <p>Page Loading...</p>;

  const flashcardCountsByTopic = getFlashcardCountsByTopic(); //function called to get count

  return (
    <section>
      <Nav />
      <div className="flashcards_page_container">
        <div className="flashcards-links-container">
          <ul>
            <li>
              <div className="flashcard_search_container">
                <FlashSearchBar
                  flashcards={flashcards}
                  setResults={setResults}
                />
                <FlashSearchResults
                  results={results}
                  handleKeyDown={handleKeyDown}
                />
              </div>
            </li>
            <li>
              <Expandable text={"Make new flashcard"} arrayProp={"flashcards"}>
                <CreateFlashcard
                  flashcards={flashcards}
                  setFlashcards={setFlashcards}
                />
              </Expandable>
            </li>
            <li>
              <div className="expandable_button_container">
                <button className="expandable_button" onClick={handleNavigate}>
                  Revision
                </button>
                {buttonClicked && flashcards.length === 0 && (
                  <p style={{ paddingTop: "0.9rem" }}>No flashcards yet</p>
                )}
              </div>
            </li>
          </ul>
        </div>

        <h1 className="flashcard-deck-title">Flashcard Decks</h1>

        <div className="flash-by-topic-card-container">
          {flashcards.length ? (
            <div
              className="topic-card"
              key={key}
              onClick={() => {
                navigate(`/flashcards/all-flashcards`);
              }}
            >
              <h1>All Flashcards</h1>
              <p>Card count: {flashcards.length}</p>
            </div>
          ) : null}
          {topics.map((topic) =>
            flashcardCountsByTopic[topic.topic_name] ? (
              <div
                onClick={() => {
                  navigate(`/flashcards/topic?topic=${topic.topic_name}`);
                }}
                className="topic-card"
                key={topic.topic_id}
              >
                <h1>{topic.topic_name}</h1>
                <p>Card count: {flashcardCountsByTopic[topic.topic_name]}</p>
              </div>
            ) : (
              <Fragment key={topic.topic_id}></Fragment>
            )
          )}
        </div>
      </div>
    </section>
  );
}
// Users should be able to view decks by topics or all flashcards
// when a user creates a new flashcard, a card(deck) should dynamically be made if the topic doesnt exist, with the number of cards being 1
//if the card with that topic already exists then it should just increase the count by 1
//when the user clicks onto the card it navigates them to a page where those flashcards by topic are loaded and should use sort by? in the backend to do this
