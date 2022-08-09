
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import authFunction from "./hoc/auth";

export default function App() {
  return (
  <BrowserRouter>
    <div>
    <Routes>
          <Route path="/" element={ authFunction(LandingPage, null) } />
          <Route path="/login" element={ authFunction(LoginPage,false)} />
          <Route path="/register" element={ authFunction(RegisterPage,false) } />
        </Routes>
    </div>
  </BrowserRouter>
  );
}