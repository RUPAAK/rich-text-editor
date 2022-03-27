import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Editor from "./screen/Editor";
import Authenticated from "./Global/Authenticated";
import LoginScreen from "./screen/Login";
import Home from "./screen/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticated>
              <Editor />
            </Authenticated>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
