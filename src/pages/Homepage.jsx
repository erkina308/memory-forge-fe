import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <section data-testid="homepage">
      <div className="homepage_container">
        <h1 className="homepage_title" data-testid="homepage-title">
          Welcome to Memory Forge
        </h1>
        <div className="homepage_button_container">
          <button className="homepage_btn">
            <Link to={"/register"} data-testid="createacc">
              Create Account
            </Link>
          </button>
          <button className="homepage_btn">
            <Link to={"/login"} data-testid="signinbtn">
              Sign In
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
