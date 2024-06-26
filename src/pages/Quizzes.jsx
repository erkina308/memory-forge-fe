import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes().then((quizzes) => {
      setQuizzes(quizzes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Page Loading...</p>;

  const navigateToStartQuiz = () => {
    if (quizzes && quizzes.length > 0) {
      navigate("/quizzes/quiz", { state: { quizzes } });
    } else {
      setButtonClicked(true);
    }
  };

  return (
    <section>
      <Nav />
      <div className="quiz-navigation-card">
        <div className="quiz-nav-inner-card">
          <ul className="quizzes-main-page-navigation">
            <li onClick={navigateToStartQuiz}>Start quiz</li>
            <li>
              <Link to={"/quizzes/view-quizzes"}>
                View and edit questions and answers
              </Link>
            </li>
          </ul>
          {buttonClicked && quizzes.length === 0 && (
            <p style={{ alignSelf: "flex-start", padding: "1rem" }}>
              No quizzes yet
            </p>
          )}
        </div>
      </div>
      <div>{/* <Link to={"/quizzes/make-a-quiz"}>Make a Quiz</Link> */}</div>
      {/* Should these into an interactive card in the middle of the page, maybe use 100vh? */}
    </section>
  );
}
