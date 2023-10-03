import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosPostDriver } from "../../../hooks/drivers/crudDrivers";
import { errorRegister, successRegister } from "../../../tools/driverAlerts/register";
import { axiosGetSepomex } from "../../../hooks/db/info";
import { useDropzone } from 'react-dropzone';
import { props } from "./props";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

const dropzoneContainerStyles = {
  width: '200px', // Establece el ancho del contenedor
  height: '200px', // Establece la altura del contenedor
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const pictureLicence = {
  display: 'flex',
}

export const ButtonAdd = ({ tDriver, setTDriver, driver, setDriver, errorForm, setErrorForm }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sepomex, setSepomex] = useState([]);
  
  const {
    name,
    lastName,
    zipCode, // CODIGO POSTAL
    state, // ESTADO DE MEXICO
    city,
    colonia,
    address,
    contact, // NUMERO DE CONTACTO DEL CONDUCTOR
    email,
    driverPicture, //* FOTO DEL CONDUCTOR
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    tokenNotification, //? OPCIONAL
    typePhone, //? OPCIONAL iOS || Android
    services, // TODOS - LGBQT+ - MUJERES
    car,
  } = driver;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !driver[name] : value;

    setDriver({
      ...driver,
      [name]: newValue,
    });
    setErrorForm(
      validateAdmin({
        ...driver,
        [name]: newValue,
      })
    )
  }

  const {
    nameError,
    lastNameError,
    zipCodeError,
    stateError,
    cityError,
    coloniaError,
    addressError,
    contactError,
    emailError,
    driverPictureError,
    driverLicenseNumberError,
    dateLicenseError,
    stateLicenseError,
    typeLicenseError,
    frontLicensePictureError,
    backLicensePictureError,
    passwordError,
    repeatPasswordError,
    isActiveError,
    messageReasonInActiveError,
    servicesError,
  } = errorForm;

  useEffect(() => {
    axiosGetSepomex(setSepomex);
  }, []);

  const allZipCode = [...new Set(sepomex.map(el => el.zipCode))]; //* 31434
  // console.log("allZipCode:", allZipCode)

  const allState = [...new Set(sepomex.map(el => el.nameState))]; //* 32
  const listState = allState.map((state, idx) => {
    return (
      <option key={idx} >
        {state}
      </option>
    );
  });
  
  const allCity = [...new Set(sepomex.map(el => el.city))]; //* 2320
  const listCity = allCity.map((city, idx) => {
    return (
      <option key={idx} >
        {city}
      </option>
    );
  });
  
  // const allColonia = [...new Set(sepomex.map(el => el.neighborhood))]; //* 75752
  // const listColonia = allColonia.map((colonia, idx) => {
  //   return (
  //     <option key={idx} >
  //       {colonia}
  //     </option>
  //   );
  // });
  
  // const onDrop = useCallback((acceptedFiles) => {
  //   // Aquí puedes manejar los archivos aceptados, como enviarlos al servidor.
  //   console.log(acceptedFiles);
  // }, []);

  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: {
      'image/*': ['.jpg', '.png'],
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !zipCode ||
      !state ||
      !city ||
      !colonia ||
      !address ||
      !contact ||
      !email ||
      !driverPicture ||
      !driverLicenseNumber ||
      !dateLicense ||
      !stateLicense ||
      !typeLicense ||
      !frontLicensePicture ||
      !backLicensePicture ||
      !password ||
      !repeatPassword ||
      !isActive ||
      !messageReasonInActive ||
      !services
    ) {
      errorRegister(driver, errorForm);
    } else if (
      nameError ||
      lastNameError ||
      zipCodeError ||
      stateError ||
      cityError ||
      coloniaError ||
      addressError ||
      contactError ||
      emailError ||
      driverPictureError ||
      driverLicenseNumberError ||
      dateLicenseError ||
      stateLicenseError ||
      typeLicenseError ||
      frontLicensePictureError ||
      backLicensePictureError ||
      passwordError ||
      repeatPasswordError ||
      isActiveError ||
      messageReasonInActiveError ||
      servicesError
    ) {
      errorRegister(driver, errorForm);
    } else {
      try {
        successRegister(driver);
        const newDriver = await axiosPostDriver(driver, headers);
        setTDriver([...tDriver, newDriver]);
    
        // Cierra el modal después de guardar
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    }
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label>{props.name}: </label>
            <input type="text" name={"name"} value={name} onChange={handleChange} />
          </div>
          <div>
            <label>{props.lastName}: </label>
            <input type="text" name={"lastName"} value={lastName} onChange={handleChange} />
          </div>
          <div>
            <label>{props.zipCode}: </label>
            <input type="text" name={"zipCode"} value={zipCode} onChange={handleChange} />
          </div>
          <div>
            <label>{props.state}: </label>
            <select disabled={false} name={"state"} value={state} onChange={handleChange} >
              <option>
                Selecciona
              </option>
              {listState}
            </select>
          </div>
          <div>
            <label>{props.city}: </label>
            <select disabled={false} name={"city"} value={city} onChange={handleChange} >
              <option>
                Selecciona
              </option>
              {listCity}
            </select>
          </div>
          {/* <div>
            <label>{props.colonia}: </label>
            <select disabled={true} >
              <option>
                Selecciona
              </option>
              {listColonia}
            </select>
          </div> */}
          <div>
            <label>{props.address}: </label>
            <input type="text" name={"address"} value={address} onChange={handleChange} />
          </div>
          <div>
            <label>{props.contact}: </label>
            <input type="text" name={"contact"} value={contact} onChange={handleChange} />
          </div>
          <div>
            <label>{props.email}: </label>
            <input type="text" name={"email"} value={email} onChange={handleChange} />
          </div>
          <div>
            <label>{props.driverPicture}: </label>
            <div {...getRootProps()} style={dropzoneContainerStyles}>
              <input {...getInputProps()} name={"driverPicture"} value={driverPicture} onChange={handleChange}  />
            <p>Frente</p>
            </div>
          </div>
          <h2>Licencia de conducir</h2>
          <hr />
          <div>
            <label>{props.driverLicenseNumber}: </label>
            <input type="text" name={"driverLicenseNumber"} value={driverLicenseNumber} onChange={handleChange} />
          </div>
          <div>
            <label>{props.stateLicense}: </label>
            <select disabled={false} name={"stateLicense"} value={stateLicense} onChange={handleChange} >
              <option>
                Selecciona
              </option>
              {listState}
            </select>
          </div>
          <div>
            <label>{props.typeLicense}: </label>
            <select disabled={false} name={"typeLicense"} value={typeLicense} onChange={handleChange} >
              <option>
                Selecciona
              </option>
              {/* {listState} */}
            </select>
          </div>
          <div>
            <label>{props.dateLicense}: </label>
            <input type="date" name={"dateLicense"} value={dateLicense} onChange={handleChange} />
          </div>
          <div>
            <div style={pictureLicence}>
              {/* <label>{props.frontLicensePicture}: </label> */}
              <label>Fotos licencia: </label>
              <br />
              <div {...getRootProps()} style={dropzoneContainerStyles}>
                <input {...getInputProps()} name={"frontLicensePicture"} value={frontLicensePicture} onChange={handleChange} />
              <p>Frente</p>
              </div>
              {/* <label>{props.backLicensePicture}: </label> */}
              <div {...getRootProps()} style={dropzoneContainerStyles}>
                <input {...getInputProps()} name={"backLicensePicture"} value={backLicensePicture} onChange={handleChange} />
              <p>Atrás</p>
              </div>
            </div>
          </div>
          <h2>Ajustes en la aplicación</h2>
          <hr />
          <div>
            <label>{props.services}: </label>
            <input type="checkbox" name={"services"} value={services} onChange={handleChange} checked={services} />TODOS
            <input type="checkbox" name={"services"} value={services} onChange={handleChange} />LGBTQ+
            <input type="checkbox" name={"services"} value={services} onChange={handleChange} />MUJERES
          </div>
          <h2>Acceso a la aplicación</h2>
          <hr />
          <div>
            <label>{props.password}: </label>
            <input type="password" name={"password"} value={password} onChange={handleChange} />
          </div>
          <div>
            <label>{props.repeatPassword}: </label>
            <input type="password" name={"repeatPassword"} value={repeatPassword} onChange={handleChange} />
          </div>
          <div>
            <label>{props.isActive}: </label>
            <input
              type="checkbox" name={"isActive"} value={isActive} onChange={handleChange} checked={isActive}
            />
          </div>
          <div>
            <label>{props.messageReasonInActive}: </label>
            <input
              type="text" name={"messageReasonInActive"} value={messageReasonInActive} onChange={handleChange}
            />
          </div>
          
          <div>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
