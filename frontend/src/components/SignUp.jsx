import React, { useEffect, useState } from "react";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/create");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { name, email, age, password } = formData;
    if (!name || !email || !age || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
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
      console.log("Signup error", error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleClick}>
        <h2 className="signup-header">Sign Up</h2>

        {error && <p className="errors-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:*
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
          <label htmlFor="age" className="form-label">
            Age:*
          </label>
          <input
            type="number"
            name="age"
            className="form-input"
            placeholder="Enter your age"
            value={formData.age}
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
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
