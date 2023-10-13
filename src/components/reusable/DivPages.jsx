import { styled } from "styled-components";
import { SubmitBtn } from "../reusable/FormularioModal";

// CONTENEDOR PAGINADO
export const ContentPages = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivGrupPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    border: solid;
    border-radius: 12px;
    border-color: #383739;
    flex-direction: row;
    //padding: 4px 3px 9px 3px;
`;

export const PageButton = styled(SubmitBtn)`
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

export const DivButtonPages = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivPages = styled.div`
  display: flex;
  justify-content: center;
`;
