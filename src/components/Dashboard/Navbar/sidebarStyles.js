import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.div`
  background-color: var(--color-navbar-background);
  color: var(-color-ico);
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
  color: var(--color-ico);
  font-size: 18px;
  margin-left: 20px;
  visibility: ${(props) => (props.isOpen === true ? "hidden" : "visible")};
  color: ${(props) => (props.isOpen === true ? "var(--color-morado)" : "var(-color-ico)")};
  &:hover {
    color: var(--color-morado);
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  display: block;
  font-size: 24px;
  margin-top: 15px;
  margin-right: 25px;
`;

export const ContentImgMenu = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
  margin-left: 19px;
  padding-right: 21px;
`;

