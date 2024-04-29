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
      const response = await axios.post(
        "https://memory-forge-be.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to the dashboard or any other protected route
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., display an error message to the user
    }
  };

  const areInputsEmpty = () => {
    return username.trim() === "" || password.trim() === "";
  };

  return (
    <section id="login">
      <nav className="nav_bar">
        <div className="memory-forge-logo">
          <h1 className="memory">
            <Link to={"/dashboard"}>Memory</Link>
          </h1>
          <h1 className="forge">
            <Link to={"/dashboard"}>Forge</Link>
          </h1>
        </div>
        <div className="nav-container">
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </nav>
      <div className="login-container">
        <div className="login_card">
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
              <button type="submit" disabled={areInputsEmpty()}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
