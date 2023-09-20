import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Container,
  ContentContainer,
} from "../../components/Dashboard/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar-sidebar";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* Contenedor del contenido */}
        <ContentContainer>
          {/* Outlet para mostrar las rutas anidadas */}
          <Outlet />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Dashboard;
