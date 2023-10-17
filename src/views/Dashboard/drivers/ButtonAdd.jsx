import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import { axiosPostDriver } from "../../../hooks/drivers/crudDrivers";
import styled from 'styled-components';
import {
  errorRegister,
  successRegister,
} from "../../../tools/driverAlerts/register";
import { axiosGetLicencias, axiosGetSepomex } from "../../../hooks/db/info";
import { useDropzone } from "react-dropzone";
import { props } from "./props";
import { 
  ContainerModal,
  ContainerScroll,
  FormHead,
  FormEdit,
  InputContainer,
  Label,
  Input,
  SubmitBtn,
  ButtonContainer,
  InputCheck,
  LabelCheck,
  Titulo
 } from "../../../components/reusable/FormularioModalDriver";

Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

const ButtonV1 = styled.button`
  color: #646cff;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
`;

const dropzoneContainerStyles = {
  width: "200px", // Establece el ancho del contenedor
  height: "200px", // Establece la altura del contenedor
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
  // console.log("estado:",typeof estado)
  // console.log("estado:",typeof estado)
  // const [selectEstado, setSelectEstado] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [colonias, setColonias] = useState([]);
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
    //! DATOS DE LA LICENCIA DE CONDUCCION
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    //! DATOS DE LA LICENCIA DE CONDUCCION
    //! AJUSTES DE LA APLICACION
    allServices, // TODOS
    servicesLGBQT, // LGBQT+
    onlyWomenServices, // MUJERES
    //! AJUSTES DE LA APLICACION
    //! ACCESO A LA APLICACION
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    //! ACCESO A LA APLICACION
    car,
  } = driver;
  // console.log("form driver:", driver)
  
  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  
  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "zipCode" && value.length >= 5 || name === "state" || name === "city" || name === "colonia") {
      const sepomexData = memorySepomes.find(el => el.codigoPostal === value);
            
      if (sepomexData) {
        setZipcode(sepomexData.codigoPostal);
        setEstado(sepomexData.estado);
        setCiudad(sepomexData.ciudad);
        setColonias(sepomexData.colonias);
      } else {
        // * ------------ ESTADOS ------------
        const findState = [...new Set(memorySepomes.map(el => el.estado))]
        // console.log("findState:", findState)
        if (findState) {
          setEstado(findState);
        }
        const filterByState = memorySepomes.filter(el => {
          if (el.estado === value) {
            // console.log("value:", value)
            return el.ciudad
          }
        });
        // * ------------ CIUDADES ------------
        // console.log("filterByState:", filterByState)
        const findCity = [...new Set(filterByState.map(el => el.ciudad))].filter(el => el !== undefined)
        // console.log("findCity:", findCity)
        if (findCity) {
          setCiudad(findCity);
        }
        // * ------------ COLONIAS ------------
        const filterByCity = memorySepomes.filter(el => {
          if (el.ciudad === value) {
            // console.log("value:", value)
            return el.colonias
          }
        });
        // console.log("filterByCity:", filterByCity)
        const findColonia = [...new Set(filterByCity.map(el => el.colonias))].flat(1)
        // console.log("findColonia:", findColonia)
        if (findColonia) {
          setColonias(findColonia);
        }
      }
    }

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
      [name]: value,
    });
    setErrorForm(
      validateDriver({
        ...driver,
        [name]: value,
      }, codigoPostal, estado, ciudad, colonias, licences)
    );
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let updatedDriver = { ...driver };

    if (name === "isActive") {
      updatedDriver.isActive = checked ? 1 : 0;
      // Resetear el campo messageReasonInActive si isActive se vuelve a bloquear
      if (updatedDriver.isActive === 1) {
        updatedDriver.messageReasonInActive = "";
      }
    } else if (name === "allServices" && checked) {
      // Si allServices es seleccionado, desmarca los otros checkboxes
      updatedDriver = {
        ...updatedDriver,
        allServices: 1,
        servicesLGBQT: 0,
        onlyWomenServices: 0,
      };
    } else {
      // Si otros checkboxes son seleccionados, actualiza el checkbox correspondiente
      updatedDriver[name] = checked ? 1 : 0;

      // Si allServices estaba seleccionado, desmárcalo
      if (updatedDriver.allServices === 1) {
        updatedDriver.allServices = 0;
      }
    }

    setDriver(updatedDriver);
  };

  useEffect(() => {
    // Actualizar los valores del formulario cuando estado o ciudad cambien
    if (estado || ciudad) {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setDriver(prevState => ({
        ...prevState,
        state: estado,
        city: ciudad,
      }));
    }
  }, [estado, ciudad]);

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
    stateLicenseError,
    typeLicenseError,
    dateLicenseError,
    frontLicensePictureError,
    backLicensePictureError,
    servicesError,
    passwordError,
    repeatPasswordError,
    isActiveError,
    messageReasonInActiveError,
  } = errorForm;
  // console.log("errorForm:", errorForm)

  useEffect(() => {
    axiosGetSepomex(setSepomex);
    axiosGetLicencias(setLicencias);
  }, []);

  const onDriverPictureDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "driverPicture");
  }, []);
  
  const onFrontLicensePictureDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "frontLicensePicture");
  }, []);
  
  const onBackLicensePictureDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "backLicensePicture");
  }, []);
  
  const convertAndSetImage = (file, fieldName) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setDriver(prevState => ({
        ...prevState,
        [fieldName]: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps: getDriverRootProps, getInputProps: getDriverInputProps } = useDropzone({
    onDrop: onDriverPictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
     'image/*': ['.jpg', '.png'],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });
  
  const { getRootProps: getFrontLicenseRootProps, getInputProps: getFrontLicenseInputProps } = useDropzone({
    onDrop: onFrontLicensePictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
     'image/*': ['.jpg', '.png'],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });
  
  const { getRootProps: getBackLicenseRootProps, getInputProps: getBackLicenseInputProps } = useDropzone({
    onDrop: onBackLicensePictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
     'image/*': ['.jpg', '.png'],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      name &&
      lastName &&
      zipCode &&
      state &&
      city &&
      colonia &&
      address &&
      contact &&
      email &&
      driverPicture &&
      driverLicenseNumber &&
      stateLicense &&
      typeLicense &&
      dateLicense &&
      frontLicensePicture &&
      backLicensePicture &&
      allServices &&
      servicesLGBQT &&
      onlyWomenServices &&
      password &&
      repeatPassword &&
      isActive &&
      messageReasonInActive
    ) {
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
          allServices: 1, // TODOS
          servicesLGBQT: 0, // LGBQT+
          onlyWomenServices: 0, // MUJERES
          //! AJUSTES DE LA APLICACION
          //! ACCESO A LA APLICACION
          password: "",
          repeatPassword: "",
          isActive: 1,
          messageReasonInActive: "", // MENSAJE RASON INACTIVO
          //! ACCESO A LA APLICACION
          // car: "" || null,
        });
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    } else  {
      // console.log("form driver:")
      errorRegister(driver);
    }
  }

  return (
    <>
      <Titulo>
        <div><h2>Conductores<br /></h2></div>
        <ButtonV1 onClick={() => setModalIsOpen(true)}>Agregar</ButtonV1>
      </Titulo>
      <ContainerModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <FormEdit onSubmit={handleSubmit}>
        <FormHead><h2>Nuevo Conductor</h2></FormHead>
        <br />
        <ContainerScroll>
          {/*//* INFORMACION DEL CONDUCTOR */}
          <InputContainer>
            <Input
              type="text"
              name={"name"}
              value={name}
              placeholder="a"
              onChange={handleChange}
            />
            <Label>{props.name}: </Label>
            <br />
            {nameError && (
              <span>{nameError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"lastName"}
              placeholder="a"
              value={lastName}
              onChange={handleChange}
            />
            <Label>{props.lastName}: </Label>
            <br />
            {lastNameError && (
              <span>{lastNameError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"zipCode"}
              placeholder="a"
              value={zipCode}
              onChange={handleChange}
            />
            <Label>{props.zipCode}: </Label>
            <br />
            {zipCodeError && (
              <span>{zipCodeError}</span>
            )}
          </InputContainer>

          {typeof estado !== "string" ? null : (
            <InputContainer>
              <select
                disabled={true}
                name={"state"}
                value={state}
                onChange={handleChange}
              >
                <option>{estado || "Selecciona"}</option>
              </select>
              <br />
              {stateError && (
                <span>{stateError}</span>
              )}
              <label>{props.state}: </label>
            </InputContainer>
          )}
          {!Array.isArray(estado) ? null : (
            <InputContainer>
              <select
                disabled={false}
                name={"state"}
                // value={state}
                onChange={handleChange}
              >
                <option>Selecciona</option>
                {estado.map((est, idx) => {
                  // console.log("EL EST:", est)
                  return (
                    // <option key={idx} value={est} >
                    <option key={idx} >
                      {est}
                    </option>
                  );
                })}
              </select>
              <br />
              {stateError && (
                <span>{stateError}</span>
              )}
              <label>{props.state}: </label>
            </InputContainer>
          )}

          {/* <InputContainer>
            <select
              disabled={true}
              name={"state"}
              value={state}
              onChange={handleChange}
            >
              <option>{estado || "Selecciona"}</option>
            </select>
            <br />
            {stateError && (
              <span>{stateError}</span>
            )}
            <label>{props.state}: </label>
          </InputContainer> */}

          {typeof ciudad !== "string" ? null : (
            <InputContainer>
              <label>{props.city}: </label>
              <select
                disabled={true}
                name={"city"}
                value={city}
                onChange={handleChange}
              >
                <option>{ciudad || "Selecciona"}</option>
              </select>
              <br />
              {cityError && (
                <span>{cityError}</span>
              )}
            </InputContainer>
          )}
          {!Array.isArray(ciudad) ? null : (
            <InputContainer>
              <label>{props.city}: </label>
              <select
                disabled={false}
                name={"city"}
                // value={city}
                onChange={handleChange}
              >
                <option>Selecciona</option>
                {ciudad.map((cit, idx) => {
                  return (
                    // <option key={idx} value={cit} >
                    <option key={idx} value={cit} >
                      {cit}
                    </option>
                  );
                })}
              </select>
              <br />
              {cityError && (
                <span>{cityError}</span>
              )}
            </InputContainer>
          )}

          {/* <InputContainer>
            <label>{props.city}: </label>
            <select
              disabled={true}
              name={"city"}
              value={city}
              onChange={handleChange}
            >
              <option>{ciudad || "Selecciona"}</option>
            </select>
            <br />
            {cityError && (
              <span>{cityError}</span>
            )}
          </InputContainer> */}

          <InputContainer>
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
            <br />
            {coloniaError && (
              <span>{coloniaError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"address"}
              placeholder="a"
              value={address}
              onChange={handleChange}
            />
            <Label>{props.address}: </Label>
            <br />
            {addressError && (
              <span>{addressError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"contact"}
              value={contact}
              placeholder="a"
              onChange={handleChange}
            />
            <Label>{props.contact}: </Label>
            <br />
            {contactError && (
              <span>{contactError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"email"}
              value={email}
              placeholder="a"
              onChange={handleChange}
            />
            <Label>{props.email}: </Label>
            <br />
            {emailError && (
              <span>{emailError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <div {...getDriverRootProps()} style={dropzoneContainerStyles}>
              <Input {...getDriverInputProps()} />
              {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
              {driverPicture && <img
                src={`data:image/png;base64,${driverPicture}`}
                alt="Foto conductor" 
                style={{ maxWidth: '100px' }} 
                />}
              <p>Frente</p>
              <Label>{props.driverPicture}: </Label>
              <br />
              {driverPictureError && (
                <span>{driverPictureError}</span>
              )}
            </div>
          </InputContainer>

          <h2>Licencia de conducir</h2>
          <hr />
          <InputContainer>
            <label>{props.driverLicenseNumber}: </label>
            {/* //! DE 5 A 10 CARACTERES Y PUEDE SER ALFANUMERICO */}
            <Input
              type="text"
              name={"driverLicenseNumber"}
              value={driverLicenseNumber}
              placeholder="a"
              onChange={handleChange}
            />
            <br />
            {driverLicenseNumberError && (
              <span>{driverLicenseNumberError}</span>
            )}
          </InputContainer>

          <InputContainer>
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
            <br />
            {stateLicenseError && (
              <span>{stateLicenseError}</span>
            )}
          </InputContainer>

          <InputContainer>
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
            <br />
            {typeLicenseError && (
              <span>{typeLicenseError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <label>{props.dateLicense}: </label>
            <Input
              disabled={driverLicenseNumber ? false : true}
              type="date"
              name={"dateLicense"}
              value={dateLicense}
              onChange={handleChange}
            />
            <br />
            {dateLicenseError && (
              <span>{dateLicenseError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <div style={pictureLicence}>
              <label>Fotos licencia: </label>
              <br />
              {!driverLicenseNumber ? (
                <>
                  <div style={dropzoneContainerStyles} >
                    <p>Desabilitado</p>
                  </div>
                  <div style={dropzoneContainerStyles} >
                    <p>Desabilitado</p>
                  </div>
                </>
              ) : (
                <>
                  <InputContainer {...getFrontLicenseRootProps()} style={dropzoneContainerStyles} >
                    <Input {...getFrontLicenseInputProps()} />
                    {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
                    {frontLicensePicture && <img
                      src={`data:image/png;base64,${frontLicensePicture}`}
                      alt="Foto conductor"
                      style={{ maxWidth: '100px' }}
                    />}
                    <p>Frente</p>
                    <br />
                    {frontLicensePictureError && (
                      <span>{frontLicensePictureError}</span>
                    )}
                  </InputContainer>
                  <InputContainer {...getBackLicenseRootProps()} style={dropzoneContainerStyles} >
                    <Input {...getBackLicenseInputProps()} />
                    {/* //* SE VISUALIZA LA IMAGEN EN FORMATE BASE 64 */}
                    {backLicensePicture && <img
                      src={`data:image/png;base64,${backLicensePicture}`}
                      alt="Foto conductor"
                      style={{ maxWidth: '100px' }}
                    />}
                    <p>Atrás</p>
                    <br />
                    {backLicensePictureError && (
                      <span>{backLicensePictureError}</span>
                    )}
                  </InputContainer>
                </>
              )}
              
            </div>
          </InputContainer>

          <h2>Ajustes en la aplicación</h2>
          <hr />
          <InputContainer>
            <InputCheck
              type="checkbox"
              name="allServices"
              checked={allServices === 1}
              onChange={handleCheckboxChange}
            />
            Todos
            <InputCheck
              type="checkbox"
              name="servicesLGBQT"
              checked={servicesLGBQT === 1}
              disabled={allServices === 1 ? true : false}
              onChange={handleCheckboxChange}
            />
            LGBTQ+
            <InputCheck
              type="checkbox"
              name="onlyWomenServices"
              checked={onlyWomenServices === 1}
              disabled={allServices === 1 ? true : false}
              onChange={handleCheckboxChange}
            />
            <LabelCheck>{props.services}: </LabelCheck>
            Sólo mujeres
            <br />
            {servicesError && (
              <span>{servicesError}</span>
            )}
          </InputContainer>

          <h2>Acceso a la aplicación</h2>
          <hr />
          <InputContainer>
            <Input
              type="password"
              name={"password"}
              value={password}
              placeholder="a"
              onChange={handleChange}
              />
            <Label>{props.password}: </Label>
            <br />
            {passwordError && (
              <span>{passwordError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              name={"repeatPassword"}
              value={repeatPassword}
              placeholder="a"
              onChange={handleChange}
            />
            <Label>{props.repeatPassword}: </Label>
            <br />
            {repeatPasswordError && (
              <span>{repeatPasswordError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <label>{props.isActive}: </label>
            <InputCheck
              type="checkbox"
              name={"isActive"}
              checked={isActive === 1}
              onChange={handleCheckboxChange}
            />
            <br />
            {isActiveError && (
              <span>{isActiveError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <label>{props.messageReasonInActive}: </label>
            {/* //! MAXIMO 10 CARACTERES */}
            <textarea
              type="text"
              name={"messageReasonInActive"}
              value={messageReasonInActive}
              maxLength={100}
              disabled={isActive === 1}
              onChange={handleChange}
            />
            <br />
            {messageReasonInActiveError && (
              <span>{messageReasonInActiveError}</span>
            )}
          </InputContainer>
        </ContainerScroll>
          <ButtonContainer>
            <SubmitBtn onClick={() => setModalIsOpen(false)}>Cancelar</SubmitBtn>
            <SubmitBtn type="submit">Guardar</SubmitBtn>
          </ButtonContainer>
          </FormEdit>
      </ContainerModal>
    </>
  );
};
