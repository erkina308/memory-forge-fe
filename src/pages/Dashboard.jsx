import "../dashboardNav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Nav from "../components/Nav";
import DashboardFlashcard from "../components/DashboardFlashcard";
import DashboardQuiz from "../components/DashboardQuiz";
import DashboardTopicCard from "../components/DashboardTopicCard";

export default function Dashboard() {
  const [answers, setAnswers] = useState({
    answers: ["answer one", "answer two", "answer three", "answer four"],
  });

  return (
    <section id="dashboard">
      <Nav />
      <header>
        <h1>
          Master Any Subject with Interactive Flashcards, Engaging Quizzes, and
          Tailored Study Plans.
        </h1>
      </header>
      {/* <div className="study-plan-box-container">
        <div className="study-plan-box"></div>
      </div> */}
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
                  Make a Flashcard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="quiz-info topic-info">
          <div className="dashboard-quiz-container">
            <DashboardTopicCard />
          </div>
          <div className="dashboard-topic-info">
            <h2>Flashcard by topic decks</h2>
            <p>
              Flashcards can even be put into decks, by selecting a topic when
              making the flashcard, which can be useful for easy navigation to a
              specific topic
            </p>
          </div>
        </div>
        <div className="quiz-info">
          <div className="dashboard-quiz-container">
            <DashboardQuiz
              question={"Question"}
              answers={answers.answers}
              correctAnswer={answers.answers[0]}
            />
          </div>
          <div className="dashboard-quiz-info">
            <h2>Quizzes</h2>
            <p>
              Make customisable quizzes which can be timed multiple choice
              quizzes or normal multiple choice quizzes. Or view and edit
              current quizzes
            </p>
            <div>
              <Link to={"/quizzes"}>
                <button className="dashboard-quiz-button">Make a Quiz</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
