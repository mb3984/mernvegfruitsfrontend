import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Import CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, showSubmitError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitSuccess = (data) => {
    // Store JWT token
    localStorage.setItem("jwt_token", data.token);

    // Store user role
    localStorage.setItem("userRole", data.role);

    // Store full user object
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    );
    if (data.role === "admin") {
      navigate("/admin-dashboard");
    }

    navigate("/home");
    alert("user login succesfully");
  };

  const onSubmitFailure = () => {
    showSubmitError(true);
  };

  const validateFields = () => {
    let valid = true;

    if (email.trim() === "") {
      setEmailError("*Required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("*Required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://mernvegfruitsbackend.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data);
      } else {
        onSubmitFailure();
      }
    } catch (error) {
      console.error("Login error:", error);
      onSubmitFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <form className="card-container" onSubmit={onSubmitForm}>
        <h1 className="heading">Login</h1>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-msg">{emailError}</p>}

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {passwordError && <p className="error-msg">{passwordError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {submitError && <p className="error-msg">*Invalid credentials</p>}

        <p className="signup-text">Don't have an account?</p>
        <Link to="/">
          <button type="button" className="signup-btn">
            SignUp
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
