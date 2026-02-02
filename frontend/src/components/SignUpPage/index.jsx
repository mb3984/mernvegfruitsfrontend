import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

const API_BASE_URL = "https://mernvegfruitsbackend.onrender.com";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) return setErrorMessage("Name is required");
    if (!email.trim()) return setErrorMessage("Email is required");
    if (!validateEmail(email)) return setErrorMessage("Invalid email format");
    if (!password.trim()) return setErrorMessage("Password is required");
    if (!validatePassword(password))
      return setErrorMessage(
        "Password must contain uppercase, lowercase, number & special character",
      );

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors[0]);
        } else {
          setErrorMessage(data.message || "Registration failed");
          alert(data.message);
        }
        return;
      }

      navigate("/login");
      alert("user registered succesfully");
    } catch (error) {
      setErrorMessage("Server not reachable. Try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-bg">
      <form className="signup-card" onSubmit={onSubmitForm}>
        <h1 className="signup-heading">Sign Up</h1>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errorMessage && <p className="error-msg">{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
