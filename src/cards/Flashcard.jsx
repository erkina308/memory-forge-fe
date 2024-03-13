export default function Flashcard({ card }) {
  console.log(card, "<--- card in flashcard");
  return (
    <div>
      <p>{card.question}</p>
      <p>{card.answer}</p>
    </div>
  );
}
