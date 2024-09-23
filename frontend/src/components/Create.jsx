import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/Create.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, age } = formData;
      if (!name || !email || !age) {
        setError("All fields are required");
        return;
      }

      const response = await fetch("http://localhost:5000/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log(result);
        navigate("/all");
      } else {
        setError(result.msg);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="create-form-container" onSubmit={handleSubmit}>
        <h1 className="create-form-header">Fill the form</h1>

        {error && <p className="err-message">{error}</p>}

        <div className="create-form-group">
          <label htmlFor="name" className="create-form-label">
            Name:*
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="create-form-input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="email" className="create-form-label">
            Email:*
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="create-form-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="age" className="create-form-label">
            Age:*
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="create-form-input"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-submit-btn">
          Submit Now
        </button>
      </form>
    </div>
  );
};

export default Create;
