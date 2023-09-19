import styled from "styled-components";

export const SidebarWrapper = styled.div`
  background-color: #333;
  color: #fff;
  width: 250px;
  height: 100%;
  position: fixed;
  left: ${(props) => (props.isOpen ? "0" : "-250px")};
  top: 0;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

export const SidebarContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 20px;
  text-align: center;
`;

export const SidebarItem = styled.li`
  margin-bottom: 15px;
`;

export const SidebarLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 18px;

  &:hover {
    color: #ff5733;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  display: block;

  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
  }
`;
