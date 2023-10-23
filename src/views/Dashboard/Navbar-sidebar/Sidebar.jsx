import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import {
  MenuIcon,
  SidebarContent,
  SidebarItem,
  SidebarLink,
  SidebarWrapper,
} from "../../../components/Dashboard/Navbar/sidebarStyles";

import {
  Image,
  ContainerLogoSidebar,
  ContainerItenSidebar,
} from "../../../components/reusable/global";

import { faCarRear, faHome, faCog, faCreditCard, faUserCheck, faPaperPlane, faSignIn } from "@fortawesome/free-solid-svg-icons";

import { StyleSheetManager } from "styled-components";
import logo from "../../../assets/img/moveItLogo3.png";

const pathActivo = () => {
  let url = window.location.href;
  const arr = url.split('/')
  let ruta = arr[arr.length - 1];
  return ruta;
};

const Sidebar = ({ isOpen, setIsOpen, sesion }) => {
  const handleMenuItemClick = () => {
    // Cierra el Sidebar cuando se hace clic en un elemento del menú
    setIsOpen(true);
  };
  
  //para cerrar el Sidebar cuando se actualize la pagina
  useEffect(() => {
    setIsOpen(true);
    setActive('Home');
  }, []);
  
  const [isActive, setActive] = useState();
  
  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["isOpen"].includes(prop)}>
      <SidebarWrapper  isOpen={isOpen} >
        <SidebarContent>
          <ContainerItenSidebar>

            <ContainerLogoSidebar>
              <MenuIcon onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} />
              </MenuIcon>
              <Image src={logo} alt="Logo" isOpen={isOpen} />
            </ContainerLogoSidebar>

            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faHome} color= {pathActivo()=="home" ? "#8a2be2" : "white"}/>
              </div>
              <SidebarLink to="/dashboard/home"  onClick={handleMenuItemClick} isOpen={isOpen}>
                Home
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faCog} color= {pathActivo()=="admins" ? "#8a2be2" : "white"}/>
              </div>
              <SidebarLink to="/dashboard/admins" onClick={handleMenuItemClick} isOpen={isOpen} >
                Administradores
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faCreditCard} color= {pathActivo()=="drivers" ? "#8a2be2" : "white"}/>
              </div>
              <SidebarLink to="/dashboard/drivers" onClick={handleMenuItemClick} isOpen={isOpen}>
                Conductores
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faCarRear} color={pathActivo() == "cars" ? "#8a2be2" : "white"} />
              </div>
              <SidebarLink to="/dashboard/cars" onClick={handleMenuItemClick} isOpen={isOpen}>
                Vehículos
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faUserCheck} color={pathActivo() == "clients" ? "#8a2be2" : "white"} />
              </div>
              <SidebarLink to="/dashboard/clients" onClick={handleMenuItemClick} isOpen={isOpen}>
                Clientes
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faPaperPlane} color={pathActivo() == "trips" ? "#8a2be2" : "white"} />
              </div>
              <SidebarLink to="/dashboard/trips" onClick={handleMenuItemClick} isOpen={isOpen}>
                Viajes
              </SidebarLink>
            </SidebarItem>
            <SidebarItem>
              <div>
                <FontAwesomeIcon icon={faSignIn} />
              </div>
                <SidebarLink onClick={sesion} isOpen={isOpen}>
                  Cerrar sesión
                </SidebarLink>
            </SidebarItem>
          </ContainerItenSidebar>
        </SidebarContent>
      </SidebarWrapper>
    </StyleSheetManager>
  );
};

export default Sidebar;
