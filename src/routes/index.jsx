import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/reusable/Header";
import Login from "../views/Login/Login";
import Dashboard from "../views/Dashboard";
import MainDashboard from "../views/Dashboard/Main";
import Admins from "../views/Dashboard/admin";
import { Drivers } from "../views/Dashboard/drivers";
import { Cars } from "../views/Dashboard/cars";
//import { Card } from "../components/Dashboard/styles";

export default function MainRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<MainDashboard />} />
          <Route path="admins" element={<Admins />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="cars" element={<Cars/>} />
          <Route path="clients" element={<Admins />} />
          <Route path="trips" element={<Admins />} />
        </Route>
      </Routes>
    </Router>
  );
}
