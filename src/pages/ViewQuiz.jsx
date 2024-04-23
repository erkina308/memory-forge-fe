import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import Expandable from "../components/Expandable";
import MakeQuiz from "./MakeQuiz";
import EditQuizCard from "../cards/EditQuizCard";
import Nav from "../components/Nav";

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
      <Nav />
      <div className="view_quiz_page">
        <div className="quiz_expandable_container">
          <div className="make_quiz_button_container">
            <Expandable text={"Make a quiz"} arrayProp={"quizzes"}>
              <MakeQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
            </Expandable>
          </div>
        </div>
        {quizzes.map((quiz) => {
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
    </div>
  );
}
