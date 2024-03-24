import { useState } from "react";

export default function InteractiveQuizCard({ quiz, quizAnswer }) {
  const [correctChoiceClicked, setCorrectChoiceClicked] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(0);

  function handleChoice(choice) {
    setSelectedChoice(choice);
    if (selectedChoice === quizAnswer) {
      setCorrectChoiceClicked(true);
    } else {
      setCorrectChoiceClicked(false);
    }
  }
  return (
    <div key={quiz.quiz_id} className="quiz-card-container">
      <div className="quiz-card">
        <div className="interactive-quiz-container">
          <h1 className="quiz-card-question interactive-question">
            {quiz.question}
          </h1>
          <div className="interactive-quiz-card-grid">
            {quiz.choices.map((choice, index) => {
              return (
                <div
                  className={`quiz-card-list interactive-card-list ${
                    correctChoiceClicked
                      ? "selected-correct-choice"
                      : "selected-incorrect-choice"
                  }`}
                  key={index}
                  onClick={() => handleChoice(choice)}
                >
                  <ul>
                    <li>{choice}</li>
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
