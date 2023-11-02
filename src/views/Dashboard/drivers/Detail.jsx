import React, { useEffect, useState } from "react";
import { axiosDetailDriver } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
import Modal from "react-modal";
import { loadImage } from "./loadImages";
Modal.setAppElement("#root");

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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h2>Consulta conductor</h2>
          <hr />
          <img
            src={fotoConductor}
            alt="Foto conductor"
            style={{ maxWidth: "200px" }}
          />
          <p>Nombre: {detailDriver.name}</p>
          <p>Apellidos: {detailDriver.lastName}</p>
          <p>Código Postal: {detailDriver.zipCode}</p>
          <p>Estado: {detailDriver.state}</p>
          <p>Ciudad: {detailDriver.city}</p>
          <p>Colonia: {detailDriver.colonia}</p>
          <p>Domicilio: {detailDriver.address}</p>
          <p>Teléfono (Móvil): {detailDriver.contact}</p>
          <p>Correo electrónico: {detailDriver.email}</p>
          <h2>Licencia de conducir</h2>
          <hr />
          {!detailDriver.driverLicenseNumber ? (
            <div>
              <p>Sin información de momento</p>
            </div>
          ) : (
            <div>
              <p>Número de licencia: {detailDriver.driverLicenseNumber}</p>
              <p>Estado licencia: {detailDriver.stateLicense}</p>
              <p>Tipo licencia: {detailDriver.typeLicense}</p>
              <p>Vigencia de licencia: {detailDriver.dateLicense}</p>
              <p>Fotos licencia:</p>
              <img
                src={fotoFront}
                alt="Foto frontal de la licencia"
                style={{ maxWidth: "200px" }}
              />
              <img
                src={fotoBack}
                alt="Foto reverso de la licencia"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
          <h2>Ajuste en la aplicación</h2>
          <hr />
          <p>Servicio para:</p>
          <input
            type="checkbox"
            disabled
            checked={detailDriver.allServices === 1}
          />
          Todos
          <input
            type="checkbox"
            disabled
            checked={detailDriver.servicesLGBQT === 1}
          />
          LGBTQ+
          <input
            type="checkbox"
            disabled
            checked={detailDriver.onlyWomenServices === 1}
          />
          Sólo mujeres
          <h2>Acceso a la aplicación</h2>
          <hr />
          <p>Activo: {detailDriver.isActive === 1 ? "Si" : "NO"}</p>
          <p>
            Motivo de bloqueo:{" "}
            {detailDriver.messageReasonInActive?.length
              ? detailDriver.messageReasonInActive
              : "Sin comentarios"}
          </p>
        </Modal>
      </td>
    </>
  );
};
