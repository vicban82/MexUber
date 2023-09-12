import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* Contenido del dashboard */}
      <h1>Welcome to the Dashboard!</h1>
      {/* Outlet para mostrar las rutas anidadas */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
