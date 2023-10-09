import React, { useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faSignIn, faUserCheck, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { modelAdmins } from "../../../data/routeTitles";
import { cerrarSesion } from "../../../tools/switAlertSesion";

const ContFlexRowCenter = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 0px;
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
  width: 100%;
  padding: 5px;
  margin-right: 10px;
  padding-left: 15px;
  padding-right: 20%;
  border: none;
  background-color: #555;
  color: #fff;
  border-radius: 32px;
  height: 20px;
`;

const SearchIcon = styled.div`
  cursor: pointer;
  margin-left: -34px;
`;

// * Lista desplegable
const UserProfileButton = styled.div`
  display: flex;
  position: relative;
  //background-color: aqua;
  width: 33.33%;
  justify-content: flex-end;
  UserProfileButton:focus-visible {
  //border: 0px dashed crimson;
  outline: 0px;

}
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-right: 12px;
`;

const ButtonPerfil = styled(Button)`
  outline: none;
  //background-color: black;
`;

const Dropdown = styled.div`
  display: ${(props) => (props.isOpen === true ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  background-color: #f0f0f0;
  color: black;
  border: 1px solid #ccc;
  z-index: 1;
  margin-top: 56px;
  padding: 10px;
  margin-right: 25px;
  border-radius: 10px;
  height: 114px;

`;

const UserProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  //margin-right: 10px;
  object-fit: cover;
  border: outset;
`;

const UserProfileText = styled.div`
  /* Estilos para el texto del perfil, puedes personalizar según tu diseño */
  display: flex;
  width: 100%;
  flex-direction: column;
  white-space: break-word;
  font-size: small;
  text-overflow: clip;
  align-items: center;
  height: 70px;
  justify-content: space-between;;
`;

const ListItem = styled.div`
    display: flex;
    padding: 8px 12px;
    cursor: pointer;
    //margin-top: 20px;
    border-radius: 15px;
    justify-content: center;
    grid-gap: 8px;

  &:hover {
    background-color: #ff0000;
  }
`;
// * Lista desplegable
const MenuIcon = styled.div`
  cursor: pointer;
  display: block; /* El ícono de menú está oculto por defecto en pantallas grandes */
  font-size: 24px;
  width: 33.33%;
  @media (max-width: 768px) {
     //Mostrar el ícono de menú en pantallas pequeñas (como dispositivos móviles) 
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


const ContFlexRowCenter01 = styled(ContFlexRowCenter)`
    grid-gap: 10px;

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
{
/* -----------------------------------Buscar--------------------------------------- */}
        <SearchContainer>
          <SearchInput type="text" placeholder="Buscar..." />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </SearchContainer>
{/* -------------------------------Perfil de Usuario------------------------------ */}
      <UserProfileButton>
        <ButtonPerfil onClick={toggleProfile}>
          <UserProfileImage
            src="/../../../src/assets/img/photo_perfil.avif"  //"URL_DE_LA_IMAGEN" // Reemplaza con la URL de la imagen del usuario
            alt="IMG"
          />
        </ButtonPerfil>
        <Dropdown isOpen={isProfileOpen}>
            <UserProfileText>
            <ContFlexRowCenter01>
              <div>
                <FontAwesomeIcon icon={faUserCheck} />
              </div>
              <div>{fullName}</div>
            </ContFlexRowCenter01>
            <ContFlexRowCenter01>
              <div>
                <FontAwesomeIcon icon={faEnvelopeOpen} />
              </div>
              <div>{gmail}<hr /></div>
            </ContFlexRowCenter01>
            </UserProfileText>
            
          <ListItem onClick={handleCerrarSesion}>
            <div>
              <FontAwesomeIcon icon={faSignIn} />
            </div>
            <span>Cerrar sesión</span>
          </ListItem>
        </Dropdown>
      </UserProfileButton>
      </NavbarContainer>
    </StyleSheetManager>
  );
};

export default Navbar;
