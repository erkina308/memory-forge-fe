import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function Nav() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const username = decodedToken.username.split("")[0].toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const [userBtnOpen, setUserBtnOpen] = useState(false);
  const [needLogout, setNeedLogout] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserBtn = () => {
    setUserBtnOpen(!userBtnOpen);
  };

  useEffect(() => {
    if (needLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [needLogout]);

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
        <div className="username_button_container">
          <div
            onClick={toggleUserBtn}
            className="username_button_inner_container"
          >
            <div style={{ fontFamily: "Inter" }}>{username}</div>
          </div>
          <MdOutlineKeyboardArrowUp
            onClick={toggleUserBtn}
            className={`user_btn_arrow ${userBtnOpen ? "open" : ""}`}
          />
          <div className={`user_links ${userBtnOpen ? "open" : ""}`}>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => setNeedLogout(true)}>
              <a>Logout</a>
            </li>
          </div>
        </div>
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
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => setNeedLogout(true)}>
              <a>Logout</a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
