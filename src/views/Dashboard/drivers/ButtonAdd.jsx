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
  //* INFORMACION DEL CONDUCTOR
  const [codigoPostal, setZipcode] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [colonias, setColonias] = useState([]);
  const [foto, setFoto] = useState('');
  const [fotoFront, setFotoFront] = useState('');
  const [fotoBack, setFotoBack] = useState('');
  //* INFORMACION DEL CONDUCTOR

  //* LICENCIA DE CONDUCIR
  const [estados, setEstados] = useState([]);
  const [licences, setLicences] = useState([]);
  //* LICENCIA DE CONDUCIR

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
  // console.log("form driver:", driver)

  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  
  function handleChange(e) {
    const { name, value, type } = e.target;
    
    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !driver[name] : value;
    // console.log("name:", name)
    // console.log("value:", value)
    // console.log("foto:", foto)
    // console.log("e.target.value:", e.target.value)
    
    if (name === "zipCode") {
      const sepomexData = memorySepomes.find(el => el.codigoPostal === value);
      if (sepomexData) {
        setZipcode(sepomexData.codigoPostal);
        setEstado(sepomexData.estado);
        setCiudad(sepomexData.ciudad);
        setColonias(sepomexData.colonias);
      }
    }
    
    // Actualiza el estado de la foto si el nombre es driverPicture
    // if (name === "driverPicture") {
    //   setFoto(URL.createObjectURL(newValue)); // Crea una URL para mostrar la imagen
    // }

    if (name === "driverLicenseNumber") {
      const filteredEstado = memoryLicencias.map(el => el.estado);
      setEstados(filteredEstado);
    }

    if (name === "stateLicense") {
      const filteredLicencias = memoryLicencias.map(el => {
        if (el.estado === value) {
          return el.tipoDeLicencias;
        }
      }).flat(1).filter(el => el !== undefined);
      setLicences(filteredLicencias);
    }

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

  useEffect(() => {
    // Actualizar los valores del formulario cuando estado o ciudad cambien
    if (estado || ciudad || foto) {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setDriver(prevState => ({
        ...prevState,
        state: estado,
        city: ciudad,
        driverPicture: foto,
      }));
    }
  }, [estado, ciudad, foto]);

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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    // Convertir la imagen a base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setFoto(base64String)
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1
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
          {/*//* INFORMACION DEL CONDUCTOR */}
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
              <option>{estado || "Selecciona"}</option>
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
              <option>{ciudad || "Selecciona"}</option>
            </select>
          </div>
          <div>
            <label>{props.colonia}: </label>
            <select
              disabled={zipCode || codigoPostal === zipCode ? false : true}
              name={"colonia"}
              value={colonia}
              onChange={handleChange}
            >
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
              <input {...getInputProps()} />
              {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
              {foto && <img
                src={`data:image/png;base64,${foto}`}
                alt="Foto conductor" 
                style={{ maxWidth: '100px' }} 
              />}
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
              {estados.length >= 1 && estados.map((estado, idx) => {
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
              {licences.length >= 1 && licences.map((licencia, idx) => {
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
                <input {...getInputProps()} />
                {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
                {foto && <img
                  src={`data:image/png;base64,${foto}`}
                  alt="Foto conductor" 
                  style={{ maxWidth: '100px' }} 
                />}
                <p>Frente</p>
              </div>
              {/* <label>{props.backLicensePicture}: </label> */}
              <div {...getRootProps()} style={dropzoneContainerStyles}>
                <input {...getInputProps()} />
                {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
                {foto && <img
                  src={`data:image/png;base64,${foto}`}
                  alt="Foto conductor" 
                  style={{ maxWidth: '100px' }} 
                />}
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
