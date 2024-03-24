import { deleteQuiz } from "../../utils/quizzesApi";
import { useNavigate } from "react-router-dom";

export default function EditQuizCard({ quiz, quizzes, setQuizzes }) {
  const navigate = useNavigate();

  function handleQuizDelete(e, id) {
    e.preventDefault();

    const newQuizList = quizzes.filter((quiz) => {
      return quiz.quiz_id !== id;
    });
    setQuizzes(newQuizList);
    deleteQuiz(id);
  }

  return (
    <div className="quiz-card-container">
      <div className="quiz-card">
        <h1 className="quiz-card-question">Question: </h1>
        <p className="quiz-card-answer">{quiz.question}</p>
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
        <div className="edit-delete-quiz-btn-container">
          <button
            className="edit-quiz-button"
            onClick={() => {
              navigate("/quizzes/edit-quiz", { state: { quiz } });
            }}
          >
            Edit Quiz
          </button>
          <button
            className="edit-quiz-button"
            onClick={(e) => handleQuizDelete(e, quiz.quiz_id)}
          >
            Delete Quiz
            {/* This needs to have a confirm popup, to confirm whether the user really wants to delete the quiz */}
          </button>
        </div>
      </div>
    </div>
  );
}
