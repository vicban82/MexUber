import { styled } from "styled-components";
import Modal from "react-modal";

export const ContainerModal = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85vh;
    max-height: 530px;
    width: 55vh;
    justify-content: center;
    align-content: center;

`;

export const ContainerScroll = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
    overflow-y: scroll;
    max-height: 72%;
    padding: 9px 13px 10px 0px;
    width: 100%;
    margin-bottom: 4%;
    //color: black;
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
  height: 8%;
  //padding-top: 13px;
`;

export const SubmitBtn = styled.button`
  display: block;
  margin-left: auto;
  //padding: 15px 30px;
  border: none;
  background-color: purple;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  //margin-top: 5px;
  width: 100%;
  height: 100%;

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
    display: flex;
    position: relative;
    height: 50px;
    width: 100%;
    margin-bottom: 17px;
    flex-direction: column;
    justify-content: center;
    grid-gap: 62px;
    min-height: 50px;
    max-height: 50px;
    font-size: 2vh;
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
  font-size: 2vh;
  z-index: 0;
`;

export const Input = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 95%;
  width: 100%;
  border: 1px solid #73809d;
  color: black;
  border-radius: 7px;
  font-size: 14px;
  //padding: 0 20px;
  outline: none;
  background: none;
  z-index: 1;
  padding-inline: 5%;
  box-sizing: border-box;

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
  width: 55vh;
  height: 85vh;
  max-height: 530px;
  background-color: white;
  border-radius: 8px;
  padding: 20px 30px;
  font-size: 2vh;
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
  margin-top: 5px;
`;

export const LabelCheck = styled.label`
  color: black;
  font-weight: bold;
  padding-left: 8px;
  font-size: 2vh;
`;

export const Titulo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: -75px;
  //padding: 5px 5px;
  //padding: 15px 7% 1px 7%;
  height: 50px;
  width: 100%;
  @media (max-width: 768px) {
     //Mostrar el ícono de menú en pantallas pequeñas (como dispositivos móviles) 
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 128px;
    margin-top: -117px;
  }
`;


export const Span = styled.span`
    color: red;

  `;


export const Select = styled.select`
    width: 100%;
    height: 100%;
    margin-left: 3px;
    border-radius: 6px;
    border: 1px solid #73809d;
    background-color: transparent;
    color: #a7b4d2;
    //border-color: #73809d;
    font-size: 16px;
    padding-left: 14px;
    height: 50px;
    //font-weight: 600;

    &::placeholder {
    color: transparent;
  }

  
  &:focus {
    border: 1px solid purple;
    color: black;
  }

  &::-ms-ticks-after {
    border: 1px solid purple;
    color: black;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }

`;

export const SelectContainer = styled.div`
      display: flex;
      flex-direction: column;
      height: 75px;

    `;

export const GrupoInput = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 27px;
`;

export const GrupoSelect = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    grid-gap: 27px;
    //grid-gap: 27px;
`;

export const GrupoImg = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 27px;
`;


export const SubeImgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: black;
    width: 100%;
`;

export const TituloSeccion = styled.h2`
    text-align: center;
    color: black;
    margin-bottom: 0px;
    margin-top: 0px;
`;

export const SpanData = styled.span`
    margin-top: 107px;
    color: red;
`;

export const ImgSube = styled.input`
  border-color: red;
`;

export const SubeContainerImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const GrupoCheck = styled.div`
    display: flex;
    flex-direction: row;
    color: black;
    align-items: center;
    justify-content: center;
    grid-gap: 13px;
    width: 100%;
    font-size: 2vh;
`;

export const CheckContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: black;
    align-items: center;
    grid-gap: 13px;
`;

export const Textarea = styled.textarea`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 96%;
  padding-top: 16px;
  padding-left: 13px;
  height: 70px;
  border: 1px solid #73809d;
  color: black;
  border-radius: 7px;
  font-size: 16px;
  //padding: 0 20px;
  outline: none;
  background: none;
  z-index: 1;
  resize: none;
  
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

export const TextareaContainer = styled.div`
    display: flex;
    position: relative;
    height: 50px;
    width: 100%;
    margin-bottom: 17px;
    flex-direction: column;
    justify-content: center;
    grid-gap: 62px;
    min-height: 50px;
    max-height: 50px;
 
`;

export const InputContainerPass = styled(InputContainer)`
  grid-gap: 89px;
  margin-bottom: 40px;
`;

export const GrupoInputPass = styled(GrupoInput)`
  grid-gap: 60px;
`;