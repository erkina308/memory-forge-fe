import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { useNavigate } from "react-router-dom";
import Expandable from "../components/Expandable";
import MakeQuiz from "./MakeQuiz";
import EditQuizCard from "../cards/EditQuizCard";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";

export default function ViewQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
      setIsLoading(false);
    });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentQuizzes = quizzes.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) return <p>Page Loading...</p>;
  return (
    <div>
      <Nav />
      <div className="view_quiz_page">
        <div className="quiz_expandable_container">
          <div className="make_quiz_button_container">
            <Expandable text={"Make a quiz"} arrayProp={"quizzes"}>
              <MakeQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
            </Expandable>
          </div>
          <div className="make_quiz_button_container">
            <div className="expandable_button_container">
              <button
                className="expandable_button"
                onClick={() => {
                  if (currentQuizzes.length === 0) {
                    console.log("no quizzes");
                  } else {
                    navigate("/quizzes/quiz", { state: { quizzes } });
                  }
                }}
              >
                Start quiz
              </button>
            </div>
          </div>
        </div>
        <div className="edit_quiz_cards_container">
          {currentQuizzes.map((quiz) => {
            return (
              <div key={quiz.quiz_id}>
                <div className="edit-quiz-screen">
                  <EditQuizCard
                    quiz={quiz}
                    quizzes={quizzes}
                    setQuizzes={setQuizzes}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {quizzes.length > postsPerPage ? (
          <Pagination
            totalPosts={quizzes.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
}
