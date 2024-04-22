import { useNavigate } from "react-router-dom";

export default function FlashSearchResults({ results }) {
  const navigate = useNavigate();

  const handleClick = (selectedCard) => {
    navigate("/flashcards/selected-flashcard", { state: { selectedCard } });
  };

  return (
    <div
      className={`flashcard_search_results ${
        results.length === 0 ? "empty" : ""
      }`}
    >
      <ul className="search_results_ul">
        {results.map((result) => {
          return (
            <li onClick={() => handleClick(result)} key={result.flashcard_id}>
              {result.question}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
