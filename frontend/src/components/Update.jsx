import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Get single user data
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/post/singlepost/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch user data");
      }
      
      setName(result.user.name);
      setAge(result.user.age);
      setEmail(result.user.email);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user:", err.message);
    }
  };

  // Send updated user to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/post/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update user");
      }

      navigate("/all");
    } catch (err) {
      setError(err.message);
      console.error("Error updating user:", err.message);
    }
  };

  useEffect(() => {
    getSingleUser(); 
  }, []);

  return (
    <div>
      <Navbar />
      <form className="create-form-container" onSubmit={handleUpdate}>
        <h1 className="create-form-header">Edit the Data</h1>

        {error && <div className="error">{error}</div>}
        <div className="create-form-group">
          <label htmlFor="name" className="create-form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="create-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="email" className="create-form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="create-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="age" className="create-form-label">
            Age:
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="create-form-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="create-submit-btn">
          Submit Now
        </button>
      </form>
    </div>
  );
};

export default Update;
