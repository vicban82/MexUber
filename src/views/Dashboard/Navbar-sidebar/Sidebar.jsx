import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  MenuIcon,
  SidebarContent,
  SidebarItem,
  SidebarLink,
  SidebarWrapper,
} from "../../../components/Dashboard/Navbar/sidebarStyles";
import { StyleSheetManager } from "styled-components";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleMenuItemClick = () => {
    // Cierra el Sidebar cuando se hace clic en un elemento del menú
    setIsOpen(false);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["isOpen"].includes(prop)}>
      <SidebarWrapper isOpen={isOpen.toString()}>
        <SidebarContent>
          <SidebarItem>
            <SidebarLink href="/dashboard" onClick={handleMenuItemClick}>
              Opción 1
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/opcion2" onClick={handleMenuItemClick}>
              Opción 2
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/dashboard/opcion3" onClick={handleMenuItemClick}>
              Opción 3
            </SidebarLink>
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
