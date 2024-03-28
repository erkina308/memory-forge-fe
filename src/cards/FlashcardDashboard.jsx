function FlashcardDashboard({ onClick, frontText, backText }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-front">{frontText}</div>
      <div className="card-back">{backText}</div>
    </div>
  );
}
export default FlashcardDashboard;
