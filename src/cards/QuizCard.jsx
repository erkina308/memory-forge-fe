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
