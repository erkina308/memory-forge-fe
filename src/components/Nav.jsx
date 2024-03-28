import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar-container">
      <div className="memory-forge-logo">
        <h1 className="memory">
          <Link to={"/dashboard"}>Memory</Link>
        </h1>
        <h1 className="forge">
          <Link to={"/dashboard"}>Forge</Link>
        </h1>
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
    </div>
  );
}
