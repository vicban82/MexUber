import { styled } from "styled-components";

export const RememberUserLabel = styled.label`
  color: #009579;
  cursor: pointer;
  margin: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

export const RememberUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const RememberUserCheckbox = styled.input`
  margin: 0 auto;
`;
