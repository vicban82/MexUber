import { styled } from "styled-components";
import Modal from "react-modal";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-left: 50px;
`;

export const Checkbox = styled.input`
  display: none;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  padding: 0 auto;
  margin-top: 100px;
`;

export const Image = styled.img`
  width: 150px; /* Ajusta el tamaño de la imagen según tus necesidades */
  height: auto;
  margin-top: 10px;
  @media only screen and (max-width: 600px) and (max-width: 1565px) {
    visibility: ${(props) => (props.isOpen === true ? "hidden" : "visible")};
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Agrega un margen superior para separar el botón de otros contenidos */
`;

export const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--background-color-line); /* Puedes ajustar el color según tus preferencias */
  margin: 20px 0;
`;

export const Header = styled.header`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: -2.5rem;
  color: var(--color-header);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  height: 60px;
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  &::placeholder {
    font-size: 16px; /* Tamaño de fuente del placeholder */
    padding: 0; /* Elimina el relleno del placeholder */
    color: var(--color-placeholder); /* Color del texto del placeholder */
    left: 40px;
  }
  &:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const ShowIcon = styled.span`
  position: absolute;
  top: 40%;
  right: 3%; /* Colocar el ícono 10px a la derecha del borde derecho del Input */
  transform: translateY(-50%); /* Centrar verticalmente el ícono */
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;

export const ContainerForm = styled.div`
  padding: 2rem;
`;

export const InputButton = styled.input`
  width: 100%;
  color: var(--color-ico);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: auto;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: 0.4s;
  text-decoration: none;
  &:hover {
    background: #006653;
  }
`;

export const ContainerLogoSidebar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 6px;
`;

export const ContainerItenSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: top;
  background: transparent;
  margin: 0 auto;
  padding: 0 auto;
  margin-top: 0px;
  min-height: 10px;
  margin-bottom: 30px;
`;

export const ContainerLogin = styled.div`
  background-color: transparent;
  margin-top: 10px;

`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  grid-gap: 25px;
`;
