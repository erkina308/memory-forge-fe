import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes, deleteQuiz } from "../../utils/quizzesApi";
import Expandable from "../components/Expandable";
import MakeQuiz from "./MakeQuiz";

export default function ViewQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes().then((quizzes) => {
      setQuizzes(quizzes);
      setIsLoading(false);
    });
  }, []);

  function handleQuizDelete(e, id) {
    e.preventDefault();

    const newQuizList = quizzes.filter((quiz) => {
      return quiz.quiz_id !== id;
    });
    setQuizzes(newQuizList);
    deleteQuiz(id);
  }

  if (isLoading) return <p>Page Loading...</p>;
  return (
    <div>
      <div>
        <Expandable text={"Make a quiz"}>
          <MakeQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
        </Expandable>
      </div>
      {quizzes.map((quiz) => {
        return (
          <div key={quiz.quiz_id} className="quiz-card-container">
            <div className="quiz-card">
              <div>
                <h1 className="quiz-card-question">
                  Question: {quiz.question}
                </h1>
              </div>
              <div className="quiz-card-choice-container">
                <div>
                  <h1 className="quiz-card-choices">Choices: </h1>
                </div>
              </div>
              <div className="quiz-card-list-container">
                {quiz.choices.map((choice) => {
                  return (
                    <div className="quiz-card-list" key={choice}>
                      <ul>
                        <li>{choice}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2 className="quiz-card-answer">
                  Correct answer: {quiz.correct_answer}
                </h2>
              </div>
            </div>
            <div>
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
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
