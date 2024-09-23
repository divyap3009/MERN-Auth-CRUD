import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";
import Update from "./components/Update.jsx";

// if the user is loign then it should show all routes otherwise it shoud show only login and signup routes
const ProtectedRoute = ({ element }) => {
  const user = localStorage.getItem("user");

  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
        <Route path="/all" element={<ProtectedRoute element={<Read />} />} />
        <Route path="/update/:id" element={<ProtectedRoute element={<Update/>}/>}/>
      </Routes>
    </div>
  );
};

export default App;
