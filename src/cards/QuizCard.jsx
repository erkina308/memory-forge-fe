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

//need to bring the quiz card format from the ViewQuiz.jsx and the handleChoice functionality from this page when actually interacting and using the quizzes, this page should just become the navigation page to view quizzes, edit quizzes, delete quizzes

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
