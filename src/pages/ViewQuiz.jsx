import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";

export default function ViewQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <div key={quiz.quiz_id} className="quiz-container">
            <h1>{quiz.question}</h1>
            {quiz.choices.map((choice) => {
              return (
                <ul className="quiz-list" key={choice}>
                  <div>
                    <li>{choice}</li>
                  </div>
                </ul>
              );
            })}
            <h2>{quiz.correct_answer}</h2>
          </div>
        );
      })}
    </div>
  );
}
