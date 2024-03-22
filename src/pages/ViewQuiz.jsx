import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { deleteQuiz } from "../../utils/quizzesApi";
import { useNavigate } from "react-router-dom";
import Expandable from "../components/Expandable";
import MakeQuiz from "./MakeQuiz";
import EditQuizCard from "../cards/EditQuizCard";

export default function ViewQuiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <div key={quiz.quiz_id}>
            <div>
              <EditQuizCard quiz={quiz} />
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
                  onClick={(e) => handleQuizDelete(e, quiz.quiz_id)}
                >
                  Delete Quiz
                  {/* This needs to have a confirm popup, to confirm whether the user really wants to delete the quiz */}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
