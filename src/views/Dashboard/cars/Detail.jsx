import React, { useEffect, useState } from "react";
import { axiosDetailDriver } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
import Modal from "react-modal";
//import { loadImage } from "./loadImages";
Modal.setAppElement("#root");
import {
  ContainerModal,
  ContainerScroll,
  Cabezera,
  TituloSeccion,
  ButtonContainer,
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
  GrupoCheck,
  SeccionVehiculo,
  PanelVehiculoDerecho,
  PanelVehiculoIsq,
  SeccionConductor,
  PanelConductorDerecho,
  PanelConductorIsq,
  SeccionTarjeta,
} from "../../../components/Car/DetailsCars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

const SubmitBtnV1 = styled(SubmitBtn)`
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
      //loadImage(detailDriver, setFotoConductor, setFotoFront, setFotoBack);
    }
  }, [driverPicture, frontLicensePicture, backLicensePicture]);
  return (
    <>
      <td>
        {/* Button driver abre vista detalle del conductor */}
        <ButtonIconDriver onClick={() => setModalIsOpen(true)}>
          <FontAwesomeIcon icon={faEye} />
        </ButtonIconDriver>
        <ContainerModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Cabezera>
            <h2>Consulta de Vehiculo</h2>
          </Cabezera>

          <ContainerScroll>

            <SeccionVehiculo>
              {/* --------------------------------------------->Panel derecho */}
              <PanelVehiculoDerecho>
                <ContentItems>
                  <ContenDatos>
                    <Label>Marca: </Label>
                    <TextContent>{!detailDriver.name ? "Jose Manuel" : detailDriver.name}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Sub-marca: </Label>
                    <TextContent>{!detailDriver.lastName ? "Gonzalez Santiesteban" : detailDriver.lastName}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Modelo: </Label>
                    <TextContent>{!detailDriver.zipCode ? "82300" : detailDriver.zipCode}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Color: </Label>
                    <TextContent>{!detailDriver.state ? "AGUASCALIENTES" : detailDriver.state}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Placa: </Label>
                    <TextContent>{!detailDriver.city ? "Jesús María" : detailDriver.city}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Numero motor: </Label>
                    <TextContent>{!detailDriver.colonia ? "La Granjita" : detailDriver.colonia}</TextContent>
                  </ContenDatos>

                  

                </ContentItems>
              </PanelVehiculoDerecho>
              {/* --------------------------------------------->Panel isquierdo */}
              <PanelVehiculoIsq>
                <ContentItems>
                  <ContenDatos>
                    <Label>Propietario: </Label>
                    <TextContent>{!detailDriver.name ? "Nombre y Apellidos" : detailDriver.name}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Estado: </Label>
                    <TextContent>{!detailDriver.lastName ? "Nombre del Estado" : detailDriver.lastName}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Ciudad : </Label>
                    <TextContent>{!detailDriver.zipCode ? "Nombre Ciudad" : detailDriver.zipCode}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Colonia : </Label>
                    <TextContent>{!detailDriver.state ? "Nombre Colonia" : detailDriver.state}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Direccion : </Label>
                    <TextContent>{!detailDriver.city ? "Direccion Postal" : detailDriver.city}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Telefono : </Label>
                    <TextContent>{!detailDriver.colonia ? "123456789" : detailDriver.colonia}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Correo : </Label>
                    <TextContent>{!detailDriver.address ? "correo@gmail.com" : detailDriver.address}</TextContent>
                  </ContenDatos>

                  {/* <ContenDatos>
                    <Label>Teléf (Móvil): </Label>
                    <TextContent>{!detailDriver.contact ? "12345678958" : detailDriver.contact}</TextContent>
                  </ContenDatos>

                  <ContenDatos>
                    <Label>Email: </Label>
                    <TextContent>{!detailDriver.email ? "josemanuel@gmail.com" : detailDriver.email}</TextContent>
                  </ContenDatos> */}

                </ContentItems>
              </PanelVehiculoIsq>
              {/* -------------------------------------------------------> END */}
            </SeccionVehiculo>

            <TituloSeccion>
              <hr />
              Conductor
            </TituloSeccion>

            <SeccionConductor>
              <PanelConductorDerecho>
                <ContentItems>
                  <ContenDatos>
                    <Label>Conductor: </Label>
                    <TextContent>{!detailDriver.name ? "Nombre y Apellidos" : detailDriver.name}</TextContent>
                  </ContenDatos>
                </ContentItems>
              </PanelConductorDerecho>
              <PanelConductorIsq>
                <ContentItems>
                  <ContenDatos>
                    <Label>Es propietario ? : </Label>
                    <TextContent>{!detailDriver.name ? "Si o No" : detailDriver.name}</TextContent>
                  </ContenDatos>
                </ContentItems>
              </PanelConductorIsq>
            </SeccionConductor>

            <TituloSeccion>
              <hr />
              Tarjeta de circulacion
            </TituloSeccion>

            <SeccionTarjeta>
                  {/* --------------------------------------------- */}
                  <PanelDatosLic>
                    <ContentItems>
                      <ContenDatos>
                        <Label>Número de tarjeta: </Label>
                        <TextContent>{!detailDriver.driverLicenseNumber ? "AS3234-GHGFJHD21" : detailDriver.driverLicenseNumber}</TextContent>
                      </ContenDatos>
                    </ContentItems>
                  </PanelDatosLic>
                  {/* --------------------------------------------- */}
                  <PanelImgLic>
                    <PanelImgDerecho>
                      <TituloSeccion>
                        <LabelImg>Foto lic. (Anterior)</LabelImg>
                      </TituloSeccion>
                      <ImgDriver
                        src={!fotoFront ? "/src/assets/img/img.png" : fotoFront}
                        alt="Foto conductor"
                      />
                    </PanelImgDerecho>
                    <PanelImgIsquirdo>
                      <TituloSeccion>
                        <LabelImg>Foto lic. (Posterior)</LabelImg>
                      </TituloSeccion>
                      <ImgDriver
                        src={!fotoBack ? "/src/assets/img/img.png" : fotoBack}
                        alt="Foto conductor"
                      />
                    </PanelImgIsquirdo>
                  </PanelImgLic>
                  {/* --------------------------------------------- */}
            </SeccionTarjeta>
            <br />

 {/*            <TituloSeccion>
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

            </SeccionAccesoApp> */}

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


{/* <TituloSeccion>
              <hr />
              Conductor
            </TituloSeccion>

            <PanelConductor>
                  <PanelDatosLic>
                    <ContentItems>
                      <ContenDatos>
                        <Label>Número de licencia: </Label>
                        <TextContent>{!detailDriver.driverLicenseNumber ? "AS3234-GHGFJHD21" : detailDriver.driverLicenseNumber}</TextContent>
                      </ContenDatos>
                      <ContenDatos>
                        <Label>Estado licencia: </Label>
                        <TextContent>{!detailDriver.stateLicense ? "Michoacan" : detailDriver.stateLicense}</TextContent>
                      </ContenDatos>
                      <ContenDatos>
                        <Label>Tipo licencia: </Label>
                        <TextContent>{!detailDriver.typeLicense ? "tipo permitido" : detailDriver.typeLicense}</TextContent>
                      </ContenDatos>
                      <ContenDatos>
                        <Label>Vigencia de licencia: </Label>
                        <TextContent>{!detailDriver.dateLicense ? "01/01/2025" : detailDriver.dateLicense}</TextContent>
                      </ContenDatos>
                    </ContentItems>
                  </PanelDatosLic>
                  <PanelImgLic>
                    <PanelImgDerecho>
                      <TituloSeccion>
                        <LabelImg>Foto lic. (Anterior)</LabelImg>
                      </TituloSeccion>
                      <ImgDriver
                        src={!fotoFront ? "/src/assets/img/photo_perfil.avif" : fotoFront}
                        alt="Foto conductor"
                      />
                    </PanelImgDerecho>
                    <PanelImgIsquirdo>
                      <TituloSeccion>
                        <LabelImg>Foto lic. (Posterior)</LabelImg>
                      </TituloSeccion>
                      <ImgDriver
                        src={!fotoBack ? "/src/assets/img/photo_perfil.avif" : fotoBack}
                        alt="Foto conductor"
                      />
                    </PanelImgIsquirdo>
                  </PanelImgLic>
            </PanelConductor>

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

          </ContainerScroll >

  <ButtonContainer>
    <SubmitBtnV1
      onClick={() => {
        setModalIsOpen(false), closeModal();
      }}
    >
      Ok
    </SubmitBtnV1>
  </ButtonContainer> */}