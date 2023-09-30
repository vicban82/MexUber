import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  border: solid red 3px;
  margin: 12rem 0 46rem 24rem;
`;

export const SidebarContainer = styled.div`
  width: ${(props) => (props.sidebarOpen ? "250px" : "0")};
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
  margin-top: 160px;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  padding-top: 2rem;
  background-color: #3d3e47;
  color: white;
  border: none;
  cursor: pointer;
  width: 170px;
  height: 10rem;
  border-radius: 20px;
 
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

export const ContainerCard = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-content: space-around;
  gap: 30px;
  margin-left: 100px;
  margin-right: 90px;
  max-width: 760px;
`;

export const Card = styled.div`
  display: flex;
  flex: auto;
  justify-content: center;
  flex-grow: 4;
  flex-direction: column;
  border-radius: 5px 5px 5px 5px;
  padding: 2px 16px;
  padding-top: 15px;
  min-width: 5rem;
  min-height: 5rem;
  max-width: 10rem;
  max-height: 10rem;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-color: darkmagenta;
  /* On mouse-over, add a deeper shadow */
  .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

export const TextCard = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
  flex-direction: row;
`;
