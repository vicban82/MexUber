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
