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
    // loadImage()

    if (driverPicture || frontLicensePicture && backLicensePicture) {
      loadImage(detailDriver, setFotoConductor, setFotoFront, setFotoBack);
    }
  }, [driverPicture, frontLicensePicture, backLicensePicture]);
  return (
    <>
      <td>
        <button onClick={() => setModalIsOpen(true)}>Ver</button>
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
                  <TextContent>Activo{detailDriver.stateLicense}</TextContent>
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
                Ajustas de Aplicacion
              </TituloSeccion>

              <SeccionAjustesApp></SeccionAjustesApp>

              <TituloSeccion>
                <hr />
                Acceso a la aplicacion
              </TituloSeccion>

              <SeccionAccesoApp></SeccionAccesoApp>

          </ContainerScroll>

          <ButtonContainer></ButtonContainer>

        </ContainerModal>
      </td>
    </>
  );
};
