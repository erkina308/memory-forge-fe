import "../dashboardNav.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import DashboardFlashcard from "../components/DashboardFlashcard";

export default function Dashboard() {
  return (
    <section id="dashboard">
      <Nav />
      <header>
        <h1>
          Master Any Subject with Interactive Flashcards, Engaging Quizzes, and
          Tailored Study Plans.
        </h1>
      </header>
      <div className="study-plan-box-container">
        <div className="study-plan-box"></div>
      </div>
      <div className="dashboard-main-body">
        <div className="flashcard-info">
          <div className="dashboard-flashcard-container">
            <DashboardFlashcard
              frontText={"Add your question"}
              backText={"Add your answer"}
            />
          </div>
          <div className="dashboard-flashcard-info">
            <h2>Flashcards</h2>
            <p>
              Make customisable flashcards to support your learning or view and
              edit current flashcards
            </p>
            <div>
              <Link to={"/flashcards"}>
                <button className="dashboard-flashcard-button">
                  Make a flashcard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
