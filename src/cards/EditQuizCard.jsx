import { deleteQuiz } from "../../utils/quizzesApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditQuizCard({ quiz, quizzes, setQuizzes }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const confirmDeleteModal = () => {
    setConfirmDelete(true);
  };

  const cancelDeleteModal = () => {
    setConfirmDelete(false);
  };

  function handleQuizDelete(e, id) {
    e.preventDefault();

    const newQuizList = quizzes.filter((selectedQuiz) => {
      return selectedQuiz.quiz_id !== id;
    });
    setQuizzes(newQuizList);
    deleteQuiz(id);
    setConfirmDelete(false);
  }

  if (confirmDelete) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
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
                <div key={choice}>
                  <ul className="quiz-card-list">
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
            onClick={(e) => confirmDeleteModal()}
          >
            Delete Quiz
          </button>
          {confirmDelete && (
            <div className="confirmation-modal">
              <p>Are you sure you want to delete this question?</p>
              <button onClick={(e) => handleQuizDelete(e, quiz.quiz_id)}>
                Yes
              </button>
              <button onClick={(e) => cancelDeleteModal()}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
