import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

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

const UserProfileButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
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

  return (
    <NavbarContainer>
      {/* Agrega el icono de menú de hamburguesa */}
      <MenuIcon onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </MenuIcon>
      {/* Agrega el componente Sidebar con el contenido */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <SearchContainer>
        <SearchInput type="text" placeholder="Buscar..." />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
      </SearchContainer>
      <UserProfileButton onClick={toggleProfile}>
        <UserProfileImage
          src="URL_DE_LA_IMAGEN" // Reemplaza con la URL de la imagen del usuario
          alt="User Profile"
        />
        <UserProfileText>
          Nombre de Usuario <br />
          Correo Electrónico
        </UserProfileText>

        {isProfileOpen ? (
          <div>
            <span>Cerrar sesión</span>
          </div>
        ) : null}
      </UserProfileButton>
    </NavbarContainer>
  );
};

export default Navbar;
