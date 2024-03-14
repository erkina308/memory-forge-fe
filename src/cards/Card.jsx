function Card({ onClick, card }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-front">{card.question}</div>
      <div className="card-back">{card.answer}</div>
    </div>
  );
}
export default Card;
