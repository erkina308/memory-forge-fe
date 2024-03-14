import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to the dashboard or any other protected route
      navigate(`/flashcards`); //change this later to /dashboard
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., display an error message to the user
    }
  };

  return (
    <section id="login">
      <nav className="navbar">
        <div className="nav-container">
          <Link to={"/register"}>Create Account</Link>
        </div>
      </nav>
      <div className="login-container">
        <h2 className="title">Login</h2>
        <div className="login-form">
          <form className="form-for-login" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
