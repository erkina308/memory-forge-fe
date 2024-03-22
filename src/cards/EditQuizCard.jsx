export default function EditQuizCard({ quiz }) {
  return (
    <div className="quiz-card-container">
      <div className="quiz-card">
        <div>
          <h1 className="quiz-card-question">Question: {quiz.question}</h1>
        </div>
        <div className="quiz-card-choice-container">
          <div>
            <h1 className="quiz-card-choices">Choices: </h1>
          </div>
          <div className="quiz-card-list-container">
            {quiz.choices.map((choice) => {
              return (
                <div key={choice} className="quiz-card-list">
                  <ul>
                    <li>{choice}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="quiz-card-answer-title">Correct answer:</h2>
          <p className="quiz-card-answer">{quiz.correct_answer}</p>
        </div>
      </div>
    </div>
  );
}
