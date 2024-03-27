import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "../dashboardNav.css";

export default function Dashboard() {
  return (
    <section id="dashboard">
      <div className="navbar-container">
        <div className="memory-forge-logo">
          <h1 className="memory">Memory</h1>
          <h1 className="forge">Forge</h1>
        </div>
        <ul>
          <li>
            <Link to={"/dashboard"}>Home</Link>
          </li>
          <li>
            <Link to={"/flashcards"}>About</Link>
          </li>
          <li>
            <Link to={"/quizzes"}>Contact</Link>
          </li>
          <li>
            <Link to={"/tasks"}>Tasks</Link>
          </li>
        </ul>
        {/* <Nav /> */}
      </div>
      <div className="dashboard-main-body">
        <div className="dashboard-card">Create a flashcard</div>
        <div className="dashboard-card">Create a quiz</div>
        <div className="dashboard-card">Create a study plan</div>
        <div className="dashboard-card">Go to flashcards</div>
        <div className="dashboard-card">Go to quizzes</div>
        <div className="dashboard-card">Go to study plan</div>
      </div>
    </section>
  );
}
