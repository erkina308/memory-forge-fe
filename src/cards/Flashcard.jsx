export default function Flashcard({ card }) {
  return (
    <div>
      <p>{card.question}</p>
      <p>{card.answer}</p>
    </div>
  );
}
