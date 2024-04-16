export default function FlashSearchResults({ results }) {
  return (
    <div className="flashcard_search_results">
      <ul>
        {results.map((result) => {
          return <li key={result.flashcard_id}>{result.question}</li>;
        })}
      </ul>
    </div>
  );
}
