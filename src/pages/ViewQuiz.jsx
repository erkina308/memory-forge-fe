import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../../utils/quizzesApi";

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

  if (isLoading) return <p>Page Loading...</p>;
  return (
    <div>
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
            <button
              onClick={() => {
                navigate("/quizzes/edit-quiz", { state: { quiz } });
              }}
            >
              Edit Quiz
            </button>
          </div>
        );
      })}
    </div>
  );
}
