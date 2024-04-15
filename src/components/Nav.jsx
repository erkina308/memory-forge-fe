import { Link } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav_container">
      <nav id="desktop_nav">
        <div className="memory-forge-logo">
          <h1 className="memory">
            <Link to={"/dashboard"}>Memory</Link>
          </h1>
          <h1 className="forge">
            <Link to={"/dashboard"}>Forge</Link>
          </h1>
        </div>
        <ul className="nav_links">
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
      </nav>
      <nav id="burger_nav">
        <div className="memory-forge-logo">
          <h1 className="memory">
            <Link to={"/dashboard"}>Memory</Link>
          </h1>
          <h1 className="forge">
            <Link to={"/dashboard"}>Forge</Link>
          </h1>
        </div>
        <div className="burger_menu">
          <div
            className={`burger_icon ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu_links ${isOpen ? "open" : ""}`}>
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
          </div>
        </div>
      </nav>
    </div>
  );
}
