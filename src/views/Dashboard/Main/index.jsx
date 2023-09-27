import React, { useState } from "react";
import { Button } from "../../../components/Dashboard/styles";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState("main");
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };
  return (
    <div>
      <Button
        onClick={() => handleIconClick("home")}
        className={selectedIcon === "home" ? "active" : ""}
      >
        <Link to="/dashboard/home">Home</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("admins")}
        className={selectedIcon === "admins" ? "active" : ""}
      >
        <Link to="/dashboard/admins">Administradores</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("drivers")}
        className={selectedIcon === "drivers" ? "active" : ""}
      >
        <Link to="/dashboard/drivers">Conductores</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("cars")}
        className={selectedIcon === "cars" ? "active" : ""}
      >
        <Link to="/dashboard/cars">Vehículos</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("clients")}
        className={selectedIcon === "clients" ? "active" : ""}
      >
        <Link to="/dashboard/clients">Clientes</Link>
      </Button>
      <Button
        onClick={() => handleIconClick("trips")}
        className={selectedIcon === "trips" ? "active" : ""}
      >
        <Link to="/dashboard/trips">Viajes</Link>
      </Button>
    </div>
  );
};

export default MainDashboard;
