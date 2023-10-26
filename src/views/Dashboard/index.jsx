import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import {
  ContentContainer,
} from "../../components/Dashboard/styles";
import Navbar from "./Navbar-sidebar";
import { Container } from "../../components/reusable/global";
import { tokenAdmin } from "../../tools/accessToken";

const Dashboard = () => {
  return (
    <>
      {tokenAdmin === null ? (
        <Container>
          <h2>Acceso denegado</h2>
        </Container>
      ) : (
        <div>
          <Navbar />
          <Container>
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          </Container>
        </div>
      )}
    </>
  );
}

//Dasboart sin token
//  const Dashboard = () => {
//    return (
//      <>
//        <Navbar />
//        <Container>
//          {/* Contenedor del contenido */}
//          <ContentContainer>
//            {/* Outlet para mostrar las rutas anidadas */}
//            <Outlet />
//          </ContentContainer>
//        </Container>
//      </>
//    );
//  }

export default Dashboard;
