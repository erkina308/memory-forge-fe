export default function InteractiveQuizCard({ quiz, quizAnswer }) {
  function handleChoice(choice) {
    if (choice === quizAnswer) {
      console.log("well done");
    } else {
      console.log("wrong answer");
    }
  }
  return (
    <div key={quiz.quiz_id} className="quiz-card-container">
      <div className="quiz-card">
        <div className="interactive-quiz-container">
          <div>
            <h1 className="quiz-card-question">{quiz.question}</h1>
          </div>
          <div className="quiz-card-list-container">
            {quiz.choices.map((choice) => {
              return (
                <div className="quiz-card-list" key={choice}>
                  <ul>
                    <div onClick={() => handleChoice(choice)}>
                      <li>{choice}</li>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

//need to bring the quiz card format from the ViewQuiz.jsx and the handleChoice functionality from this page when actually interacting and using the quizzes, this page should just become the navigation page to view quizzes, edit quizzes, delete quizzes
