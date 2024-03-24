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
      <ul className="quizzes-main-page-navigation">
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
      {/* Should these into an interactive card in the middle of the page, maybe use 100vh? */}
    </section>
  );
}
