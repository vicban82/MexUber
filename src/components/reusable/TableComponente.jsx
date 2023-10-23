import styled from 'styled-components';
import { props } from '../../views/Dashboard/admin/props';

export const ContainerTabla = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;

  @media (max-width: 900px) {
        max-width: 95vmin;
        margin-left: 20px;
        margin-right: 20px;
        background-color: aqua;
    }
`;

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) => 'message' !== prop,
})`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #b8860b;
  min-width: 885px;
  
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
    word-break:break-all;
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
    width: 100%;
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
    }
  }
  tbody {
    display: flex;
    overflow: auto;
    width: 100%;
    max-height: 260px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
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