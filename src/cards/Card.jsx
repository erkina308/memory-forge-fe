function Card({ onClick, card }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-front">
        <h1>{card.question}</h1>
      </div>
      <div className="card-back">
        <h1>{card.answer}</h1>
      </div>
    </div>
  );
}
export default Card;
