import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <section>
      <h1>Welcome to Memory Forge</h1>
      <div>
        <button>
          <Link to={"/register"}>Create Account</Link>
        </button>
        <button>
          <Link to={"/login"}>Sign In</Link>
        </button>
      </div>
    </section>
  );
}
