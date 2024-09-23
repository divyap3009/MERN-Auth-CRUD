import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/create");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    // console.log(formData);
    try {
      const response = await fetch("https://mern-auth-crud-api.vercel.app/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        // console.log(result);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        navigate("/create");
      } else {
        setError(result.msg);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-header">Login</h2>

        {error && <p className="errors-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:*
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:*
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Now
        </button>

        <span className="login-prompt">
          Does't have an account ?{" "}
          <Link to="/signup" className="login-link">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
