import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import validator from "validator";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://memory-forge-be.onrender.com/auth/register",
        {
          username,
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Server responded with non-2xx status code
        console.error("Registration failed:", error.response.data);
        setErrors(error.response.data.errors || [error.response.data.error]);
      } else if (error.request) {
        // Request made but no response received
        console.error("No response received:", error.request);
        setErrors(["No response received from the server"]);
      } else {
        // Something else went wrong
        console.error("Error while making request:", error.message);
        setErrors(["An error occurred while making the request"]);
      }
    }
  };

  const areAllInputsEmpty = () => {
    return (
      username.trim() === "" || email.trim() === "" || password.trim() === ""
    );
  };

  return (
    <div>
      <nav className="nav_bar">
        <div className="memory-forge-logo-register">
          <h1 className="memory">
            <a>Memory</a>
          </h1>
          <h1 className="forge">
            <a>Forge</a>
          </h1>
        </div>
        <div className="nav-container">
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
      <div className="login-container">
        <div className="login_card">
          <h2>Register</h2>
          <div className="login-form">
            <form className="form-for-login" onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={areAllInputsEmpty() || !validator.isEmail(email)}
              >
                Register
              </button>
            </form>
            {errors.length > 0 && (
              <div>
                <ul className="error_ul">
                  {errors.map((error, index) => (
                    <li key={index}>{error.msg || error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
