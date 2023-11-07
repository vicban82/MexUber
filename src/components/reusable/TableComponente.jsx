import styled from 'styled-components';
import { props } from '../../views/Dashboard/admin/props';

export const ContainerTabla = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;
  

  @media (max-width: 900px) {
        width: 70vh;
    }
  
  @media (max-width: 430px) 
  {
        width: 40vh;
  }
`;

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) => 'message' !== prop,
})`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #b8860b;
  min-width: 890px;
  font-size: 2.2vh;

  @media (max-width: 430px) 
  {
        font-size: 1.7vh;
  }
  
  th { 
    text-decoration: underline; 
    display: flex;
    justify-content: center;
    max-width: ${(props) => (props.maxwidth)};
    min-width: ${(props) => (props.minwidth)};

  }

  th, td {
    text-align: left;
    display: flex;
    justify-content: center;
    max-width: ${(props) => (props.maxwidth)};
    min-width: ${(props) => (props.minwidth)};
    word-break: break-all;
    text-align: center;
  }

  visibility: ${(props) => (props.isOpen === true ? "hidden" : "visible")};
  
  td:nth-child(1), th:nth-child(1) { min-width: ${(props) => (props.minwidth)}; } //16%
  td:nth-child(1), th:nth-child(1) { max-width: ${(props) => (props.maxwidth)}; } //16%
  td:nth-child(2), th:nth-child(2) { min-width: ${(props) => (props.minwidth)}; }
  td:nth-child(2), th:nth-child(2) { max-width: ${(props) => (props.maxwidth)}; }
  td:nth-child(3), th:nth-child(3) { width: ${(props) => (props.width)}; }
  td:nth-child(3), th:nth-child(3) { max-width: ${(props) => (props.maxwidth)}; }
  td:nth-child(3), th:nth-child(3) { min-width: ${(props) => (props.minwidth)}; }

  thead {
    display: flex;
    //width: 100vh;
    justify-content: space-around;
    background-color: #333;
    color: #FDFDFD;
    height: 40px;
    tr {
      display: flex;
      width: 100%;
      height: 40px;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      padding-right: 3px;
    }
  }
  tbody {
    display: flex;
    overflow: auto;
    max-height: 260px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ffffff;
      transition: 0.5s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #4a47f1;
      transition: 0.5s;
    }


    tr {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      
    }

    tr:nth-child(even) {
      background-color: #5f5a5a;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }
  }
`;