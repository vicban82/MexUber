import React, { useEffect, useState } from "react";
import { axiosDetailDriver } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
import Modal from "react-modal";
import { loadImage } from "./loadImages";
Modal.setAppElement("#root");
import {
  ContainerModal,
  ContainerScroll,
  Cabezera,
  TituloSeccion,
  ButtonContainer,
  SeccionConductor,
  PanelDatosDrive,
  PanelImg,
  ImgDriver,
  TextContent,
  ContainerImg,
  SeccionLicencia,
  PanelDatosLic,
  PanelImgLic,
  SeccionAjustesApp,
  SeccionAccesoApp,
  Label,
  ContenDatos,
  ContentItems,
  PanelImgDerecho,
  PanelImgIsquirdo,
  LabelImg,
  ButtonIconDriver,
  FormEdit,
  InputContainer,
  Input,
  SubmitBtn,
  InputCheck,
  LabelCheck,
  Titulo,
  Span,
  SelectContainer,
  Select,
  GrupoInput,
  GrupoSelect,
  GrupoImg,
  SubeImgContainer,
  SpanData,
  ImgSube,
  SubeContainerImg,
  GrupoCheck,
  CheckContainer,
  Textarea,
  TextareaContainer,
  GrupoInputPass,
} from "../../../components/reusable/Details";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

export const SubmitBtnV1 = styled(SubmitBtn)`
    width: 40%;
    margin-left: 0;
`;


export const Detail = (props) => {
  const { id } = props;
  const [detailDriver, setDetailDriver] = useState({});
  const { driverPicture, frontLicensePicture, backLicensePicture } = detailDriver;
  const [fotoConductor, setFotoConductor] = useState(null);
  const [fotoFront, setFotoFront] = useState(null);
  const [fotoBack, setFotoBack] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    axiosDetailDriver(id, setDetailDriver, headers);
  }, [id]);

  useEffect(() => {
    if (driverPicture || frontLicensePicture && backLicensePicture) {
      loadImage(detailDriver, setFotoConductor, setFotoFront, setFotoBack);
    }
  }, [driverPicture, frontLicensePicture, backLicensePicture]);
  return (
    <>
      <td>
        {/* Button driver abre vista detalle del conductor */}
        <ButtonIconDriver onClick={() => setModalIsOpen(true)}>
            <FontAwesomeIcon icon={faEye}/> 
        </ButtonIconDriver>
        <ContainerModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Cabezera>
            <h2>Consulta conductor</h2>
          </Cabezera>

          <ContainerScroll>

            <SeccionConductor>
              <PanelImg>

                <TituloSeccion>
                  <LabelImg>FOTO CONDUCTOR</LabelImg>
                </TituloSeccion>

                <ContainerImg>
                  <ImgDriver
                    //src={`data:image/png;base64,${detailDriver.driverPicture}`}
                    // src={`/images/${detailDriver.driverPicture}`}
                    src={"/src/assets/img/photo_perfil.avif"}
                    alt="Foto conductor"
                  //style={{ maxWidth: "200px" }}
                  />
                </ContainerImg>
              </PanelImg>

              <PanelDatosDrive>

                <ContentItems>
                  <ContenDatos>
                    <Label>Nombre: </Label>
                    <TextContent>Jose Manuel{detailDriver.name}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Apellidos: </Label>
                    <TextContent>Gonzalez Santiesteban{detailDriver.lastName}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Código Postal: </Label>
                    <TextContent>82300{detailDriver.zipCode}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Estado: </Label>
                    <TextContent>AGUASCALIENTES{detailDriver.state}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Ciudad: </Label>
                    <TextContent>Jesús María{detailDriver.city}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Colonia: </Label>
                    <TextContent>La Granjita{detailDriver.colonia}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Domicilio: </Label>
                    <TextContent>Calle Pepe Perez #2021 % 1ra y 3ra{detailDriver.address}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Teléf (Móvil): </Label>
                    <TextContent>12345678958{detailDriver.contact}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Email: </Label>
                    <TextContent>josemanuel@gmail.com{detailDriver.email}</TextContent>
                  </ContenDatos>

                </ContentItems>

              </PanelDatosDrive>
            </SeccionConductor>

            <TituloSeccion>
              <hr />
              Licencia de Conducir
            </TituloSeccion>

            <SeccionLicencia>
              <PanelDatosLic>

                <ContentItems>
                  <ContenDatos>
                    <Label>Número de licencia: </Label>
                    <TextContent>AS3234-GHGFJHD21{detailDriver.driverLicenseNumber}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Estado licencia: </Label>
                    <TextContent>Michoacan{detailDriver.stateLicense}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Tipo licencia: </Label>
                    <TextContent>tipo permitido{detailDriver.typeLicense}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Vigencia de licencia: </Label>
                    <TextContent>01/01/2025{detailDriver.dateLicense}</TextContent>
                  </ContenDatos>
                </ContentItems>

              </PanelDatosLic>

              <PanelImgLic>
                <PanelImgDerecho>

                  <TituloSeccion>
                    <LabelImg>Foto lic. (Anterior)</LabelImg>
                  </TituloSeccion>

                  <ImgDriver
                    //src={`data:image/png;base64,${detailDriver.driverPicture}`}
                    // src={`/images/${detailDriver.driverPicture}`}
                    src={"/src/assets/img/photo_perfil.avif"}
                    alt="Foto conductor"
                  //style={{ maxWidth: "200px" }}
                  />
                </PanelImgDerecho>
                <PanelImgIsquirdo>

                  <TituloSeccion>
                    <LabelImg>Foto lic. (Posterior)</LabelImg>
                  </TituloSeccion>

                  <ImgDriver
                    //src={`data:image/png;base64,${detailDriver.driverPicture}`}
                    // src={`/images/${detailDriver.driverPicture}`}
                    src={"/src/assets/img/photo_perfil.avif"}
                    alt="Foto conductor"
                  //style={{ maxWidth: "200px" }}
                  />
                </PanelImgIsquirdo>
              </PanelImgLic>

            </SeccionLicencia>

            <TituloSeccion>
              <hr />
              Ajustes de Aplicacion
            </TituloSeccion>

            <SeccionAjustesApp>

            <GrupoCheck>
              <p>Servicio para:</p>
              <InputCheck
                type="checkbox"
                disabled
                checked={detailDriver.allServices === 1}
              />
              Todos
              <InputCheck
                type="checkbox"
                disabled
                checked={detailDriver.servicesLGBQT === 1}
              />
              LGBTQ+
              <InputCheck
                type="checkbox"
                disabled
                checked={detailDriver.onlyWomenServices === 1}
              />
              Sólo mujeres
              </GrupoCheck>

            </SeccionAjustesApp>

            <TituloSeccion>
              <hr />
              Acceso a la aplicacion
            </TituloSeccion>

            <SeccionAccesoApp>

              <ContenDatos>
                <Label>Activo: </Label>
                <TextContent>
                  {detailDriver.isActive === 1 ? "Si" : "NO"}
                </TextContent>
              </ContenDatos>

              <ContenDatos>
                <Label>Motivo de bloqueo:{" "}</Label>
                <TextContent>
                  {detailDriver.messageReasonInActive?.length
                    ? detailDriver.messageReasonInActive
                    : "Sin comentarios"}
                </TextContent>

              </ContenDatos>

            </SeccionAccesoApp>

          </ContainerScroll>

          <ButtonContainer>
            <SubmitBtnV1
              onClick={() => {
                setModalIsOpen(false), closeModal();
              }}
            >
              Ok
            </SubmitBtnV1>
          </ButtonContainer>

        </ContainerModal>
      </td>
    </>
  );
};
