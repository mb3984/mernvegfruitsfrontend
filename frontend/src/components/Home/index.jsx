import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("jwt_token");

    const timer = setTimeout(() => {
      if (!token) {
        navigate("/login");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }, 800); // small delay for smooth UX

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="home-loader-container">
      <div className="loader"></div>
      <h2 className="redirect-text">Redirecting...</h2>
      <p className="redirect-subtext">Please wait a moment</p>
    </div>
  );
};

export default Home;
