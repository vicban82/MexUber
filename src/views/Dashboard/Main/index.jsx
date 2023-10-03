import React, { useState } from "react";
import { Button, ContainerCard, TextCard } from "../../../components/Dashboard/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarRear, faHome, faCog, faCreditCard, faUserCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MainDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState("main");
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);

  };
  return (

    <ContainerCard>
    <Button 
    onClick={() => handleIconClick("home")}
    className={selectedIcon === "home" ? "active" : ""}>
      <FontAwesomeIcon icon={faHome} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/home">Home</Link> 
      </TextCard>
    </Button>

    <Button 
    onClick={() => handleIconClick("admins")}
    className={selectedIcon === "admins" ? "active" : ""}>
      <FontAwesomeIcon icon={faCog} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/admins">Administradores</Link> 
      </TextCard>
    </Button>

    <Button 
    onClick={() => handleIconClick("drivers")}
    className={selectedIcon === "drivers" ? "active" : ""}>
      <FontAwesomeIcon icon={faCreditCard} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/drivers">Conductores</Link> 
      </TextCard>
    </Button>

    <Button 
    onClick={() => handleIconClick("cars")}
    className={selectedIcon === "cars" ? "active" : ""}>
      <FontAwesomeIcon icon={faCarRear} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/cars">Vehículos</Link> 
      </TextCard>
    </Button>

    <Button 
    onClick={() => handleIconClick("clients")}
    className={selectedIcon === "clients" ? "active" : ""}>
      <FontAwesomeIcon icon={faUserCheck} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/clients">Clientes</Link> 
      </TextCard>
    </Button>
    
    <Button 
    onClick={() => handleIconClick("trips")}
    className={selectedIcon === "trips" ? "active" : ""}>
      <FontAwesomeIcon icon={faPaperPlane} className="fa-2x" /> 
      <TextCard>    
        <Link to="/dashboard/trips">Viajes</Link> 
      </TextCard>
    </Button>

    </ContainerCard>

  );
};

export default MainDashboard;
