import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import { searchFlashcard } from "../../utils/flashcardApi";

export default function FlashSearchBar({ flashcards, setResults }) {
  const [query, setQuery] = useState("");

  const fetchSelectedFlashcards = (value) => {
    const results = flashcards.filter((card) => {
      return (
        value &&
        card &&
        card.question &&
        card.question.toLowerCase().includes(value)
      );
    });
    setResults(results);
  };
  const handleChange = (value) => {
    setQuery(value);
    fetchSelectedFlashcards(value);
  };

  // const handleSearch = () => {
  //   searchFlashcard(query)
  //     .then((data) => {
  //       setResults(data);
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // };

  return (
    <div className="flash_bar">
      <div className="flash_search_bar_container">
        <IoSearchOutline style={{ fontSize: "16px" }} />
        <input
          className="flash_search_bar"
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search Flashcards"
        />
      </div>
      {/* <button onClick={handleSearch}>Search</button> */}
      {/* <div>
        {results.length !== 0
          ? results.map((flashcard) => {
              return (
                <div key={flashcard.flashcard_id}>
                  <h3>{flashcard.question}</h3>
                  <p>{flashcard.answer}</p>
                </div>
              );
            })
          : null}
      </div> */}
    </div>
  );
}
