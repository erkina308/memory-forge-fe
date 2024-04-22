import { useLocation, useNavigate } from "react-router-dom";
import InteractiveQuizCard from "../cards/InteractiveQuizCard";
import Nav from "../components/Nav";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const returnToQuizzes = () => {
    navigate("/quizzes");
  };

  return (
    <section>
      <Nav />
      <div className="interactive-quiz-container">
        <InteractiveQuizCard quizzes={location.state.quizzes} />
      </div>
      <button onClick={returnToQuizzes}>Return</button>
    </section>
  );
}
