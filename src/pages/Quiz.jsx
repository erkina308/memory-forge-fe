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
      <div className="return_btn_container">
        <button className="return_to_prev_page_btn" onClick={returnToQuizzes}>
          Return
        </button>
      </div>
      <div className="interactive-quiz-container">
        <InteractiveQuizCard quizzes={location.state.quizzes} />
      </div>
    </section>
  );
}
