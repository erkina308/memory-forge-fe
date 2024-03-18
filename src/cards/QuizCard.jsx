export default function QuizCard({ quiz, quizAnswer }) {
  function handleChoice(choice) {
    if (choice === quizAnswer) {
      console.log("well done");
    } else {
      console.log("wrong answer");
    }
  }
  return (
    <div className="quiz-container">
      <h1>{quiz.question}</h1>
      {quiz.choices.map((choice) => {
        return (
          <ul className="quiz-list" key={choice}>
            <div onClick={() => handleChoice(choice)}>
              <li>{choice}</li>
            </div>
          </ul>
        );
      })}
    </div>
  );
}

{
  /* <div className="quiz-card-container">
  <div className="quiz-card">
    <div>
      <h1 className="quiz-card-front">{quiz.question}</h1>
    </div>
    <div>
      {quiz.choices.map((choice) => {
        return (
          <div className="quiz-card-front" key={choice}>
            <ul>
              <li>{choice}</li>
            </ul>
          </div>
        );
      })}
    </div>
    <div>
      <h2 className="quiz-card-front">{quiz.correct_answer}</h2>
    </div>
  </div>
</div>; */
}
