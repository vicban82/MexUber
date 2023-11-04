import { styled } from "styled-components";
import Modal from "react-modal";

export const ContainerModal = styled(Modal)`
  width: 70vh;
  height: 85vh;
  max-height: 530px;
  background-color: white;
  border-radius: 8px;
  padding: 20px 30px;
  font-size: 2.2vh;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
  
  @media (max-width: 768px) {
     //Mostrar el ícono de menú en pantallas pequeñas (como dispositivos móviles) 
     width: 40vh;
     font-size: 2.5vh;
  }

`;

export const ContainerScroll = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
    overflow-y: scroll;
    max-height: 72%;
    margin-top: 15px;
    //padding: 9px 13px 10px 0px;
    padding-right: 8px;
    width: 98%;
    margin-bottom: 4%;
    color: black;
    &::-webkit-scrollbar {
        background-color: #e9dada;
        width: 7px;
        height: 7px;
    }

  &::-webkit-scrollbar-thumb {
    background: #996699;
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
`;

export const SubmitBtn = styled.button`
  display: block;
  margin-left: auto;
  border: none;
  background-color: purple;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;

export const Cabezera = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: #e5e5e5;
  background-color: #333333;
  margin-bottom: 30px;
  width: 100%;
  height: 40px;
`;


export const TituloSeccion = styled.h2`
      text-align: center;
      color: black;
      //margin-bottom: 7px;
      margin-top: 0px;
  `;


export const SeccionConductor = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        grid-gap: 20px;
      }
  `;

export const PanelDatosDrive = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //padding-left: 5px;
      width: 60%;

  `;

export const PanelImg = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 5px;
      width: 40%;
  `;

export const SeccionLicencia = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -26px;

  `;

export const PanelDatosLic = styled.div`
    display: flex;
    flex-direction: row;
`;



export const PanelImgLic = styled.div`
    display: flex;
    flex-direction: row;
    grid-gap: 39px;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  `;

export const PanelImgDerecho = styled.div`

`;

export const PanelImgIsquirdo = styled.div`

  `;


export const SeccionAjustesApp = styled.div`

  `;


export const SeccionAccesoApp = styled.div`
      margin-top: -25px;

  `;


export const ContentItems = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
  `;


export const ContenDatos = styled.div`
      display: flex;
      flex-direction: row;
      //padding-left: 5px;
      grid-gap: 10px;
      width: 100%;
      word-break: break-word;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        grid-gap: 0px;
        align-items: center;
        width: 100%;
      }
  `;


export const ContainerImg = styled.div`
    //width:150px;
    //height:150px;
`;

export const ImgDriver = styled.img`
    object-fit: cover;
    width:100%;
    height:100%;
  `;

export const TextContent = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: start;
      text-align: start;
      word-break: break-word;
      margin-bottom: 15px;
      //margin-right: 10px;
      width: 50%;
      
      @media (max-width: 768px) {
        justify-content: center;
        text-align: center;
        width: 95%;
      }
  `;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: end;
  text-align: end;
  font-weight: bold;
  width: 50%;
  word-break: break-word;
  @media (max-width: 768px) {
        justify-content: center;
        text-align: center;
        width: 95%;
  }
`;

export const LabelImg = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  word-break: break-word;
  font-size: 2vh;

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
  outline: none;
  background: none;
  z-index: 1;
  padding-inline: 5%;
  box-sizing: border-box;

  
  &::placeholder {
    color: ${(props) => (props.color)};
  }


  ${props => {
    if (props.color != 'transparent') return `
        & + ${Label} {
          top: -7px;
          left: 3px;
          z-index: 10;
          font-size: 14px;
          font-weight: 600;
          color: purple;
        }`
  }}

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
  width: 52vh;
  height: 85vh;
  max-height: 530px;
  background-color: white;
  border-radius: 8px;
  padding: 20px 30px;
  font-size: 2vh;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
  
  @media (max-width: 768px) {
     //Mostrar el ícono de menú en pantallas pequeñas (como dispositivos móviles) 
     width: 40vh;
  }

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
    font-size: 16px;
    padding-left: 14px;
    height: 50px;

    &::placeholder {
    color: ${(props) => (props.color)};
  }

  &:focus + ${Label} {
    //top: -7px;
    //left: 3px;
    z-index: 10;
    font-size: 14px;
    font-weight: 600;
    color: purple;
  }

  &:focus {
    border: 2px solid purple;
    color: black
    
  }

  &:not(:placeholder-shown) + ${Label} {
    top: -7px;
    left: 3px;
    z-index: 10;
    font-size: 14px;
    font-weight: 600;
  }

  &:not(:empty) {
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
    position: relative;
    height: 65px;
    width: 100%;
    margin-bottom: 17px;
    flex-direction: column;
    justify-content: center;
    min-height: 50px;
    font-size: 2vh;

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

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
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
  outline: none;
  background: none;
  z-index: 1;
  resize: none;
  
  &::placeholder {
    color: ${(props) => (props.color)};
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