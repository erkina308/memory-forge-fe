import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import Expandable from "../components/Expandable";
import MakeQuiz from "./MakeQuiz";
import EditQuizCard from "../cards/EditQuizCard";

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
            </div>
          </div>
        );
      })}
    </div>
  );
}
