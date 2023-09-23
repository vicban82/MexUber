import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  MenuIcon,
  SidebarContent,
  SidebarItem,
  SidebarLink,
  SidebarSession,
  SidebarWrapper,
} from "../../../components/Dashboard/Navbar/sidebarStyles";
import { StyleSheetManager } from "styled-components";

const Sidebar = ({ isOpen, setIsOpen, sesion }) => {
  const handleMenuItemClick = () => {
    // Cierra el Sidebar cuando se hace clic en un elemento del menú
    setIsOpen(false);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["isOpen"].includes(prop)}>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarContent>
          <SidebarItem>
            <SidebarLink href="/dashboard/home" onClick={handleMenuItemClick}>
              Home
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/admins" onClick={handleMenuItemClick}>
              Administradores
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/drivers" onClick={handleMenuItemClick}>
              Conductores
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/cars" onClick={handleMenuItemClick}>
              Vehículos
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/clients" onClick={handleMenuItemClick}>
              Clientes
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/trips" onClick={handleMenuItemClick}>
              Viajes
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarSession onClick={sesion}>
              Cerrar sesión
            </SidebarSession>
          </SidebarItem>
          <MenuIcon onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </MenuIcon>
        </SidebarContent>
      </SidebarWrapper>
    </StyleSheetManager>
  );
};

export default Sidebar;
