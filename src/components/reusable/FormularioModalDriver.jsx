import { styled } from "styled-components";
import Modal from "react-modal";

export const ContainerModal = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
    justify-content: center;
    align-content: center;
    margin-top: 60px;
    //overflow-y: scroll;
    //color: black;
    //max-width: 400px;
    //margin: 100px 30% 80% 35%;
`;

export const ContainerScroll = styled.div`
    overflow-y: scroll;
    max-height: 400px;
    padding: 9px 13px 10px 0px;
    //scrollbar-color: #007 #bada55;
    &::-webkit-scrollbar {
        background-color: #e9dada;
    }

    &::-webkit-scrollbar {  
    width: 7px;
    height: 7px;
    }

    &::-webkit-scrollbar-thumb {
    background: #996699;
    //border: 3px solid red;
    border-radius: 5px;
    transition: 0.5s;
    }

&::-webkit-scrollbar-track {
    background: #ddd7d7;
    border-left: 1px solid $dark-blue-o-20;
    border-radius: 2px;
}

&::-webkit-scrollbar-track:hover {
    background: #cab7b7;
}

&::-webkit-scrollbar-track:active {
    background: #ddc3c3;
}

`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  grid-gap: 20px;
  padding-top: 13px;
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
  //margin-top: 5px;
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
  color: #e5e5e5;
  background-color: #333333;
  width: 100%;
  height: 40px;
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

  &:not(:placeholder-shown)+ ${Label} {
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
  //height: 100%;
  width: 100%;
  max-width: 400px;
  background-color: white;
  //width: 400px;
  border-radius: 8px;
  padding: 20px 40px;
  height: 566px;
  box-shadow: 0 10px 25px rgba(92, 99, 105, .2);

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

export const Titulo = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 5px;
    padding: 15px 7% 1px 7%;
    justify-content: space-between;
    margin-top: -75px;
    height: 50px;
    align-items: center;
`;