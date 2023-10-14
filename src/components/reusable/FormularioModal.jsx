import { styled } from "styled-components";
import Modal from "react-modal";

export const ContainerModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  justify-content: center;
  align-content: center;
  max-width: 400px;
  margin: 100px 30% 80% 35%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  grid-gap: 20px;
`;

export const SubmitBtn = styled.button`
  display: block;
  margin-left: auto;
  padding: 15px 30px;
  border: none;
  background-color: purple;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;
  width: 100%;
  height: 48px;

  /*   &:hover {
    background-color: #9867C5;
    //transform: translateY(-2px);
  } */
`;

export const FormHead = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: #000000;
  width: 100%;
  height: 34px;
`;

export const InputContainer = styled.div`
  position: relative;
  height: 50px;
  width: 90%;
  margin-bottom: 17px;
`;

export const Label = styled.label`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 0 4px;
  background-color: white;
  color: #a7acb5;
  font-size: 16px;
  transition: 0.5s;
  z-index: 0;
`;

export const Input = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  border: 1px solid #c6d0e5;
  color: black;
  border-radius: 7px;
  font-size: 16px;
  padding: 0 20px;
  outline: none;
  background: none;
  z-index: 1;

  &::placeholder {
    color: transparent;
  }

  &:focus + ${Label} {
    top: -7px;
    left: 3px;
    z-index: 10;
    font-size: 14px;
    font-weight: 600;
    color: purple;
  }

  &:focus {
    border: 2px solid purple;
  }

  &:not(:placeholder-shown) + ${Label} {
    top: -7px;
    left: 3px;
    z-index: 10;
    font-size: 14px;
    font-weight: 600;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }
`;

export const FormEdit = styled.form`
  height: 100%;
  width: 100%;
  max-width: 400px;
  background-color: white;
  //width: 400px;
  border-radius: 8px;
  padding: 20px 40px;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);

  .title {
    font-size: 50px;
    margin-bottom: 50px;
  }
`;

export const InputCheck = styled.input`
  margin-top: 12px;
  width: 18px;
  height: 18px;
`;

export const LabelCheck = styled.label`
  color: black;
  font-weight: bold;
  padding-left: 8px;
  font-size: 18px;
`;
