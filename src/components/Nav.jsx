import { Link } from "react-router-dom";
import StyledNav from "../styledComponents/StyledNav";

export default function Nav() {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to={"/flashcards"}>Flashcards</Link>
        </li>
        <li>
          <Link to={"/quizzes"}>Quizzes</Link>
        </li>
        <li>
          <Link to={"tasks"}>Tasks</Link>
        </li>
      </ul>
    </StyledNav>
  );
}
