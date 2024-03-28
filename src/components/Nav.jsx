import { Link } from "react-router-dom";

export default function Nav() {
  return (
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
    </div>
  );
}
