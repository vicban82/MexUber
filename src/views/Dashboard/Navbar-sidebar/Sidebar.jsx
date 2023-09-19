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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleMenuItemClick = () => {
    // Cierra el Sidebar cuando se hace clic en un elemento del menú
    setIsOpen(false);
  };

  return (
    <SidebarWrapper isOpen={isOpen}>
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
  );
};

export default Sidebar;
