import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";

export default function Quizzes() {
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
    <section>
      {quizzes.map((quiz) => {
        return (
          <div className="quiz-container" key={quiz.quiz_id}>
            <ul>
              <li>{quiz.question}</li>
              <li>
                {quiz.choices.map((choice) => {
                  return (
                    <div key={choice}>
                      <ul>
                        <li>{choice}</li>
                      </ul>
                    </div>
                  );
                })}
              </li>
              <li>{quiz.correct_answer}</li>
            </ul>
          </div>
        );
      })}
    </section>
  );
}
