import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.div`
  background-color: #333;
  color: #fff;
  width: 250px;
  height: 100%;
  position: fixed;
  width: ${(props) => (props.isOpen === true ? "50px" : "-250px")};
  top: 0px;
  transition: width 0.1s ease-in-out;
  z-index: 1000;
`;


export const SidebarContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 0rem;
  text-align: center;
`;

export const SidebarItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 20px;
  max-height: 27px;
`;

export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  margin-left: 20px;
  visibility: ${(props) => (props.isOpen === true ? "hidden" : "visible")};
  color: ${(props) => (props.isOpen === true ? "#ff0000" : "#fff")};
  &:hover {
    color: #ff5733;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  display: block;
  font-size: 24px;
  margin-top: 15px;
  margin-right: 25px;
  /* @media (max-width: 768px) {
    display: block;
    font-size: 24px;
  } */
`;

export const ContentImgMenu = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
  margin-left: 19px;
  padding-right: 21px;
`;

