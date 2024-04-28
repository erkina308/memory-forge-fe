import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <section>
      <div className="homepage_container">
        <h1 className="homepage_title">Welcome to Memory Forge</h1>
        <div className="homepage_button_container">
          <button className="homepage_btn">
            <Link to={"/register"}>Create Account</Link>
          </button>
          <button className="homepage_btn">
            <Link to={"/login"}>Sign In</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
