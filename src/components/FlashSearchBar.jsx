import { useState } from "react";
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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search Flashcards"
      />
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
