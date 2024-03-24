import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { Link, useNavigate } from "react-router-dom";
import InteractiveQuizCard from "../cards/InteractiveQuizCard";

export default function Quizzes() {
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
    <section>
      <ul>
        <li
          onClick={() => {
            navigate("/quizzes/quiz", { state: { quizzes } });
          }}
        >
          Start Quiz
        </li>
        <li>
          <Link to={"/quizzes/view-quizzes"}>View Questions and Answers</Link>
        </li>
      </ul>
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
