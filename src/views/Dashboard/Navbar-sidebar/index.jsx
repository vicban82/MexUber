import React, { useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { modelAdmins } from "../../../data/routeTitles";
import { cerrarSesion } from "../../../tools/switAlertSesion";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  width: 100%;
  position: fixed; /* Fijar el Navbar en la parte superior de la pantalla */
  top: 0; /* Colocar el Navbar en la parte superior de la pantalla */
  z-index: 1000; /* Asegurarse de que esté por encima de otros elementos */
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 5px;
  margin-right: 10px;
  border: none;
  background-color: #555;
  color: #fff;
`;

const SearchIcon = styled.div`
  cursor: pointer;
`;

// * Lista desplegable
const UserProfileButton = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const Dropdown = styled.div`
  display: ${(props) => (props.isOpen === true ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f0f0f0;
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 150px;
`;

const UserProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserProfileText = styled.span`
  /* Estilos para el texto del perfil, puedes personalizar según tu diseño */
`;

const ListItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;
// * Lista desplegable
const MenuIcon = styled.div`
  cursor: pointer;
  display: block; /* El ícono de menú está oculto por defecto en pantallas grandes */

  @media (max-width: 768px) {
    /* Mostrar el ícono de menú en pantallas pequeñas (como dispositivos móviles) */
    display: block;
    font-size: 24px;
  }
`;
const LogoutButton = styled.button`
  display: block;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fullName = `${modelAdmins[0].name} ${modelAdmins[0].lastName}`;
  const gmail = modelAdmins[0].email;

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    localStorage.removeItem("tokenAdmin");
  };
  
  return (
    <StyleSheetManager shouldForwardProp={(prop) => !["isOpen"].includes(prop)}>
      <NavbarContainer>
        {/* Agrega el icono de menú de hamburguesa */}
        <MenuIcon onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </MenuIcon>
        {/* Agrega el componente Sidebar con el contenido */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} sesion={handleCerrarSesion} />
        <SearchContainer>
          <SearchInput type="text" placeholder="Buscar..." />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </SearchContainer>
        <UserProfileButton>
        <Button onClick={toggleProfile}>
          <UserProfileImage
            src="URL_DE_LA_IMAGEN" // Reemplaza con la URL de la imagen del usuario
            alt="User Profile"
          />
        </Button>
        <Dropdown isOpen={isProfileOpen}>
          <UserProfileText>
            {fullName} <br />
            {gmail}
          </UserProfileText>
          <ListItem onClick={handleCerrarSesion}>
            <span>Cerrar sesión</span>
          </ListItem>
        </Dropdown>
      </UserProfileButton>
      </NavbarContainer>
    </StyleSheetManager>
  );
};

export default Navbar;
