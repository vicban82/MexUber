import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: ${(props) => (props.sidebarOpen ? "250px" : "0")};
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: ${(props) => (props.sidebarOpen ? "250px" : "0")};
`;

export const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

export const HamburgerButton = styled.div`
  cursor: pointer;

  .hamburger {
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 24px;
    margin: 6px 0;
    background-color: #333; /* Color de las barras */
    border-radius: 5px;
    transition: 0.4s;

    &.open {
      background-color: transparent; /* Cambia a transparente cuando se abre */
      .bar1 {
        transform: rotate(-45deg) translate(-5px, 6px);
      }
      .bar2 {
        opacity: 0;
      }
      .bar3 {
        transform: rotate(45deg) translate(-5px, -6px);
      }
    }

    .bar1,
    .bar2,
    .bar3 {
      width: 100%;
      height: 4px;
      margin: 3px 0;
      transition: 0.4s;
    }
  }
`;
export const NavButtonsContainer = styled.div`
  margin-top: 20px;
`;

export const NavButton = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
  margin-bottom: 5px; /* Margen inferior para separar los botones */

  &:hover {
    background-color: #555;
  }
`;
