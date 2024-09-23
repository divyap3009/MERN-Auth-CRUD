import React, { useState, useEffect } from "react";
import "../css/Read.css";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/read");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/post/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const result = await response.json();
      setData(data.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-2">
        <h2 className="text-center">All Data</h2>
        <div className="card-container">
          {data.length > 0 ? (
            data.map((ele) => (
              <div key={ele._id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <div className="button-container">
                    <button
                      className="card-link delete-button"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/update/${ele._id}`} className="card-link">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-container">
              <p className="no-data">No data available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Read;
