import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/reusable/Header";
import Login from "../views/Login/Login";
import Dashboard from "../views/Dashboard";
import MainDashboard from "../views/Dashboard/Main";
import Admins from "../views/Dashboard/admin";

export default function MainRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<MainDashboard />} />
          <Route path="admins" element={<Admins />} />
          <Route path="drivers" element={<Admins />} />
          <Route path="cars" element={<Admins />} />
          <Route path="clients" element={<Admins />} />
          <Route path="trips" element={<Admins />} />
        </Route>
      </Routes>
    </Router>
  );
}
