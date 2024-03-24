import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { Link } from "react-router-dom";
import InteractiveQuizCard from "../cards/InteractiveQuizCard";

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
      <div>
        <Link to={"/quizzes/quiz"}>Start Quiz</Link>
      </div>
      <div>
        <Link to={"/quizzes/view-quizzes"}>View Questions and Answers</Link>
      </div>
      <div>{/* <Link to={"/quizzes/make-a-quiz"}>Make a Quiz</Link> */}</div>
      <div>
        {/* {quizzes.map((quiz) => {
          return (
            <div key={quiz.quiz_id}>
              <InteractiveQuizCard
                quiz={quiz}
                quizAnswer={quiz.correct_answer}
              />
            </div>
          );
        })} */}
        <InteractiveQuizCard quizzes={quizzes} />
      </div>
      {/* this quiz.map should eventually leave this page */}
    </section>
  );
}
