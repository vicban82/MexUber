import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';

import {
  MenuIcon,
  SidebarContent,
  SidebarItem,
  SidebarLink,
  SidebarSession,
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


const Sidebar = ({ isOpen, setIsOpen, sesion }) => {
  const handleMenuItemClick = () => {
    // Cierra el Sidebar cuando se hace clic en un elemento del menú
    setIsOpen(false);
  };
  
  useEffect(() => {
    setIsOpen(true)
  }, []);

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
              <FontAwesomeIcon icon={faHome} />
            </div>
            <SidebarLink href="/dashboard/home" onClick={handleMenuItemClick} isOpen={isOpen}>
              Home
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faCog} /> 
            </div>
            <SidebarLink href="/dashboard/admins" onClick={handleMenuItemClick} isOpen={isOpen}>
              Administradores
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <SidebarLink href="/dashboard/drivers" onClick={handleMenuItemClick} isOpen={isOpen}>
              Conductores
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faCarRear} /> 
            </div>
            <SidebarLink href="/dashboard/cars" onClick={handleMenuItemClick} isOpen={isOpen}>
              Vehículos
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faUserCheck} />
            </div>
            <SidebarLink href="/dashboard/clients" onClick={handleMenuItemClick} isOpen={isOpen}>
              Clientes
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <SidebarLink href="/dashboard/trips" onClick={handleMenuItemClick} isOpen={isOpen}>
              Viajes
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <div>
              <FontAwesomeIcon icon={faSignIn} />
            </div>
            <SidebarSession onClick={sesion}>
            <SidebarLink onClick={handleMenuItemClick} isOpen={isOpen}>
              Cerrar sesión
            </SidebarLink>
            </SidebarSession>
          </SidebarItem>
        </ContainerItenSidebar>
        </SidebarContent>
      </SidebarWrapper>
    </StyleSheetManager>
  );
};

export default Sidebar;
