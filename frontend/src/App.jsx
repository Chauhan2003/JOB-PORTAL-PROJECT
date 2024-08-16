import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      {/* <Navbar /> */}
      {/* <Login /> */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
};

export default App;
