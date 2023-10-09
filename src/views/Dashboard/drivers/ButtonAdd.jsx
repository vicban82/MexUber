import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import { axiosPostDriver } from "../../../hooks/drivers/crudDrivers";
import {
  errorRegister,
  successRegister,
} from "../../../tools/driverAlerts/register";
import { axiosGetLicencias, axiosGetSepomex } from "../../../hooks/db/info";
import { useDropzone } from "react-dropzone";
import { props } from "./props";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

const dropzoneContainerStyles = {
  width: "200px", // Establece el ancho del contenedor
  height: "200px", // Establece la altura del contenedor
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const pictureLicence = {
  display: "flex",
};

export const ButtonAdd = ({
  tDriver,
  setTDriver,
  driver,
  setDriver,
  errorForm,
  setErrorForm,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sepomex, setSepomex] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [codigoPostal, setZipcode] = useState('');
  // console.log("ESTADO ZIPCODE:", codigoPostal)
  const [estados, setEstados] = useState('');
  // console.log("ESTADO ESTADOS:", estados)
  const [ciudades, setCiudades] = useState('');
  const [colonias, setColonias] = useState([]);
  // console.log("ESTADO COLONIAS:", colonias)
  const [value, setValue] = useState('');
  // console.log("ESTADO VALUE:", value)

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
  // console.log("driver:", driver)

  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  // console.log("memoryLicencias:", memoryLicencias)
  
  const filteredSepomex = memorySepomes.filter(el => el.codigoPostal === value);
  // console.log("filteredSepomex:", filteredSepomex)

  const filteredEstado = memoryLicencias.map(el => el.estado);
  // console.log("filteredEstado:", filteredEstado)
  const filteredLicencias = memoryLicencias.map(el => {
    // console.log("EL:", el.estado)
    // console.log("VALUE:", value)
    if (el.estado === value) {
      return el.tipoDeLicencias
    }
  }).flat(1).filter(el => el !== undefined);
  // console.log("filteredLicencias:", filteredLicencias)
  
  // ------------------------------------------------------------

  useEffect(() => {
    const codigoPostal = filteredSepomex.map(el => el.codigoPostal);
    // console.log("FIND ZIPCODE:", codigoPostal[0])
    const estado = filteredSepomex.map(el => el.estado);
    const ciudad = filteredSepomex.map(el => el.ciudad);
    const allColonias = filteredSepomex.map(el => el.colonias).flat(1);
    // console.log("FIND COLONIAS:", allColonias)

    setZipcode(codigoPostal[0]);
    setEstados(estado[0]);
    setCiudades(ciudad[0]);
    setColonias(allColonias);
  }, []);
  
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    
    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !driver[name] : value;
    setValue(value);

    setDriver({
      ...driver,
      [name]: newValue,
    });
    setErrorForm(
      validateDriver({
        ...driver,
        [name]: newValue,
      }, codigoPostal, colonias)
    );
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
  // console.log("errorForm:", errorForm)

  useEffect(() => {
    axiosGetSepomex(setSepomex);
    axiosGetLicencias(setLicencias);
  }, []);
  
  // const onDrop = useCallback((acceptedFiles) => {
  //   // Aquí puedes manejar los archivos aceptados, como enviarlos al servidor.
  //   console.log(acceptedFiles);
  // }, []);

  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: {
      "image/*": [".jpg", ".png"],
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
        setDriver({
          name: "",
          lastName: "",
          zipCode: "", // CODIGO POSTAL
          state: "", // ESTADO DE MEXICO
          city: "",
          colonia: "",
          address: "",
          contact: "", // NUMERO DE CONTACTO DEL CONDUCTOR
          email: "",
          driverPicture: "", //* FOTO DEL CONDUCTOR
          //! DATOS DE LA LICENCIA DE CONDUCCION
          driverLicenseNumber: "", //* NUMERO LICENCIA DEL CONDUCTOR
          stateLicense: "", // ESTADO DE LA LICENCIA
          typeLicense: "", // TIPO LICENCIA
          dateLicense: "", // FECHA - VIGENCIA DE LA LICENCIA
          frontLicensePicture: "", //* FOTO FRONTAL DE LA LICENCIA
          backLicensePicture: "", //* FOTO REVERSO DE LA LICENCIA
          //! DATOS DE LA LICENCIA DE CONDUCCION
          //! AJUSTES DE LA APLICACION
          services: "", // TODOS - LGBQT+ - MUJERES
          //! AJUSTES DE LA APLICACION
          //! ACCESO A LA APLICACION
          password: "",
          repeatPassword: "",
          isActive: 0 || 1,
          messageReasonInActive: "", // MENSAJE RASON INACTIVO
          //! ACCESO A LA APLICACION
          // car: "" || null,
        });
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
            <input
              type="text"
              name={"name"}
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.lastName}: </label>
            <input
              type="text"
              name={"lastName"}
              value={lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>{props.zipCode}: </label>
            <input
              type="text"
              name={"zipCode"}
              value={zipCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.state}: </label>
            <select
              disabled={true}
              name={"state"}
              value={state}
              onChange={handleChange}
            >
              <option>{estados || "Selecciona"}</option>
            </select>
          </div>
          <div>
            <label>{props.city}: </label>
            <select
              disabled={true}
              name={"city"}
              value={city}
              onChange={handleChange}
            >
              <option>{ciudades || "Selecciona"}</option>
            </select>
          </div>
          <div>
            <label>{props.colonia}: </label>
            <select disabled={zipCode || codigoPostal === zipCode ? false : true} >
              <option>
                Selecciona
              </option>
              {colonias.length >= 1 && colonias.map((colonia, idx) => {
                return (
                  <option key={idx} value={colonia}>
                    {colonia}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>{props.address}: </label>
            <input
              type="text"
              name={"address"}
              value={address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.contact}: </label>
            <input
              type="text"
              name={"contact"}
              value={contact}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.email}: </label>
            <input
              type="text"
              name={"email"}
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.driverPicture}: </label>
            <div {...getRootProps()} style={dropzoneContainerStyles}>
              <input
                {...getInputProps()}
                name={"driverPicture"}
                value={driverPicture}
                onChange={handleChange}
              />
              <p>Frente</p>
            </div>
          </div>
          <h2>Licencia de conducir</h2>
          <hr />
          <div>
            <label>{props.driverLicenseNumber}: </label>
            <input
              type="text"
              name={"driverLicenseNumber"}
              value={driverLicenseNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.stateLicense}: </label>
            <select
              disabled={driverLicenseNumber ? false : true}
              name={"stateLicense"}
              value={stateLicense}
              onChange={handleChange}
            >
              <option>Selecciona</option>
              {filteredEstado.length >= 1 && filteredEstado.map((estado, idx) => {
                // console.log("EL ESTADOS:", estado)
                return (
                  <option key={idx} value={estado}>
                    {estado}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>{props.typeLicense}: </label>
            <select
              disabled={driverLicenseNumber ? false : true}
              name={"typeLicense"}
              value={typeLicense}
              onChange={handleChange}
            >
              <option>Selecciona</option>
              {filteredLicencias.length >= 1 && filteredLicencias.map((licencia, idx) => {
                // console.log("EL LICENCIAS:", licencia)
                return (
                  <option key={idx} value={licencia}>
                    {licencia}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>{props.dateLicense}: </label>
            <input
              disabled={true}
              type="date"
              name={"dateLicense"}
              value={dateLicense}
              onChange={handleChange}
            />
          </div>
          <div>
            <div style={pictureLicence}>
              {/* <label>{props.frontLicensePicture}: </label> */}
              <label>Fotos licencia: </label>
              <br />
              <div {...getRootProps()} style={dropzoneContainerStyles}>
                <input
                  {...getInputProps()}
                  name={"frontLicensePicture"}
                  value={frontLicensePicture}
                  onChange={handleChange}
                  disabled={true}
                />
                <p>Frente</p>
              </div>
              {/* <label>{props.backLicensePicture}: </label> */}
              <div {...getRootProps()} style={dropzoneContainerStyles}>
                <input
                  {...getInputProps()}
                  name={"backLicensePicture"}
                  value={backLicensePicture}
                  onChange={handleChange}
                  disabled={true}
                />
                <p>Atrás</p>
              </div>
            </div>
          </div>
          <h2>Ajustes en la aplicación</h2>
          <hr />
          <div>
            <label>{props.services}: </label>
            <input
              type="checkbox"
              name={"services"}
              value={services}
              onChange={handleChange}
              checked={services}
            />
            TODOS
            <input
              type="checkbox"
              name={"services"}
              value={services}
              onChange={handleChange}
            />
            LGBTQ+
            <input
              type="checkbox"
              name={"services"}
              value={services}
              onChange={handleChange}
            />
            MUJERES
          </div>
          <h2>Acceso a la aplicación</h2>
          <hr />
          <div>
            <label>{props.password}: </label>
            <input
              type="password"
              name={"password"}
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.repeatPassword}: </label>
            <input
              type="password"
              name={"repeatPassword"}
              value={repeatPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>{props.isActive}: </label>
            <input
              type="checkbox"
              name={"isActive"}
              value={isActive}
              onChange={handleChange}
              checked={isActive}
            />
          </div>
          <div>
            <label>{props.messageReasonInActive}: </label>
            <input
              type="text"
              name={"messageReasonInActive"}
              value={messageReasonInActive}
              onChange={handleChange}
              disabled={true}
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
