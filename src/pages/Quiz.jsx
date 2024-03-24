import { useLocation, useNavigate } from "react-router-dom";
import InteractiveQuizCard from "../cards/InteractiveQuizCard";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const returnToQuizzes = () => {
    navigate("/quizzes");
  };

  return (
    <section>
      <InteractiveQuizCard quizzes={location.state.quizzes} />
      <button onClick={returnToQuizzes}>Return</button>
    </section>
  );
}
