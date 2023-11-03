import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import {
  axiosGetDrivers,
  axiosPostDriver,
} from "../../../hooks/drivers/crudDrivers";
import styled from "styled-components";
import {
  errorRegister,
  successRegister,
} from "../../../tools/driverAlerts/register";
import { axiosGetLicencias, axiosGetSepomex } from "../../../hooks/db/info";
import { useDropzone } from "react-dropzone";
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
  Titulo,
  Span,
  SelectContainer,
  Select,
  GrupoInput,
  GrupoSelect,
  GrupoImg,
  SubeImgContainer,
  TituloSeccion,
  SpanData,
  ImgSube,
  SubeContainerImg,
  GrupoCheck,
  CheckContainer,
  Textarea,
  TextareaContainer,
  GrupoInputPass,
} from "../../../components/reusable/FormularioModal";

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
  width: "50%", // Establece el ancho del contenedor
  height: "200px", // Establece la altura del contenedor
  border: "2px dashed #700202",
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
  limit,
  setTotalPages,
  setPage,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sepomex, setSepomex] = useState([]);
  const [licencias, setLicencias] = useState([]);
  //* IINFORMACION DEL VEHICULO
  const [marca, setMarca] = useState("" || []);
  const [submarca, setSubMarca] = useState("" || []);
  const [modelo, setModelo] = useState("" || []);
  const [color, setColor] = useState("" || []);
  const [[placa], setPlaca] = useState("" || []);
  const [[motor], setMotor] = useState("" || []);

  //* INFORMACION DEL CONDUCTOR
  const [codigoPostal, setZipcode] = useState("");
  const [estado, setEstado] = useState("" || []);
  const [ciudad, setCiudad] = useState("" || []);
  const [colonias, setColonias] = useState([]);
  //* INFORMACION DEL CONDUCTOR

  //* LICENCIA DE CONDUCIR
  const [estados, setEstados] = useState([]);
  const [licences, setLicences] = useState([]);
  //* LICENCIA DE CONDUCIR

  const [selectImage, setSelectImage] = useState({});

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

  const memorySepomes = useMemo(() => sepomex, [sepomex]);
  const memoryLicencias = useMemo(() => licencias, [licencias]);

  function handleChange(e) {
    const { name, value } = e.target;
    // console.log("name:", name)

    if (
      (name === "zipCode" && value.length >= 5) ||
      name === "state" ||
      name === "city" ||
      name === "colonia"
    ) {
      const sepomexData = memorySepomes.find((el) => el.codigoPostal === value);

      if (sepomexData) {
        setZipcode(sepomexData.codigoPostal);
        setEstado(sepomexData.estado);
        setCiudad(sepomexData.ciudad);
        setColonias(sepomexData.colonias);
      } else {
        // * ------------ ESTADOS ------------
        const findState = [...new Set(memorySepomes.map((el) => el.estado))];
        if (findState) {
          setEstado(findState);
        }
        // * ------------ CIUDADES ------------
        const filterByState = memorySepomes.filter((el) => {
          if (el.estado === value) {
            return el.ciudad;
          }
        });
        const findCity = [
          ...new Set(filterByState.map((el) => el.ciudad)),
        ].filter((el) => el !== undefined);
        if (findCity) {
          setCiudad(findCity);
        }
        // * ------------ COLONIAS ------------
        const filterByCity = memorySepomes.filter((el) => {
          if (el.ciudad === value) {
            return el.colonias;
          }
        });
        const findColonia = [
          ...new Set(filterByCity.map((el) => el.colonias)),
        ].flat(1);
        if (findColonia) {
          setColonias(findColonia);
        }
      }
    }

    if (name === "driverLicenseNumber") {
      const filteredEstado = memoryLicencias.map((el) => el.estado);
      setEstados(filteredEstado);
    }

    if (name === "stateLicense") {
      const filteredLicencias = memoryLicencias
        .map((el) => {
          if (el.estado === value) {
            return el.tipoDeLicencias;
          }
        })
        .flat(1)
        .filter((el) => el !== undefined);
      setLicences(filteredLicencias);
    }

    setDriver({
      ...driver,
      [name]: value,
    });
    setErrorForm(
      validateDriver(
        {
          ...driver,
          [name]: value,
        },
        selectImage
      )
    );
  }
  
  useEffect(() => {
    // SE RESETEAN LOS SIGUIENTES CAMPOS
    let updatedDriver = {...driver}
    if (zipCode.length <= 4) {
      setEstado("");
      setCiudad("");
      setColonias("");
      updatedDriver = {
        ...updatedDriver,
        state: "",
        city: "",
        colonia: "",
      }
    }

    setDriver(updatedDriver);
  }, [zipCode]);

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
    if (typeof estado === "string" || typeof ciudad === "string") {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setDriver((prevState) => ({
        ...prevState,
        state: estado,
        city: ciudad,
      }));
    }
  }, [estado, ciudad]);

  useEffect(() => {
    // Este codigo permite la sincronización de los mensajes de las imagenes
    const validationErrors = validateDriver(driver, selectImage);
    setErrorForm(validationErrors);
  }, [driver]);

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

  const onDriverPictureDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      convertAndSetImage(file, "driverPicture");
    }
  }, []);

  const onFrontLicensePictureDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "frontLicensePicture");
  }, []);

  const onBackLicensePictureDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "backLicensePicture");
  }, []);

  const convertAndSetImage = (file, fieldName) => {
    console.log("file:", file);
    setSelectImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      setDriver((prevState) => ({
        ...prevState,
        [fieldName]: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const {
    getRootProps: getDriverRootProps,
    getInputProps: getDriverInputProps,
  } = useDropzone({
    onDrop: onDriverPictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  const {
    getRootProps: getFrontLicenseRootProps,
    getInputProps: getFrontLicenseInputProps,
  } = useDropzone({
    onDrop: onFrontLicensePictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  const {
    getRootProps: getBackLicenseRootProps,
    getInputProps: getBackLicenseInputProps,
  } = useDropzone({
    onDrop: onBackLicensePictureDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  function closeModal() {
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
      car: "" || null,
      //! NO SE VALIDAN
      tokenNotification: "",
      typePhone: "",
      //! NO SE VALIDAN
    });
  }

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
      (allServices === 1 || servicesLGBQT === 1 || onlyWomenServices === 1) &&
      password &&
      repeatPassword
    ) {
      if (
        stateLicenseError ||
        typeLicenseError ||
        dateLicenseError ||
        frontLicensePictureError ||
        backLicensePictureError
      ) {
        errorRegister(driver, errorForm);
      } else if (messageReasonInActiveError) {
        errorRegister(driver, errorForm);
      } else {
        try {
          successRegister(driver);
          const newDriver = await axiosPostDriver(driver, headers);
          setTDriver([...tDriver, newDriver]);

          await axiosGetDrivers(setTDriver, setTotalPages, headers, 1, limit);

          // Cierra el modal después de guardar
          setModalIsOpen(false);
          closeModal();

          // Establece la página en 1 después de agregar un elemento
          setPage(1);
        } catch (error) {
          console.error("Error al guardar el automovíl:", error);
        }
      }
    } else {
      errorRegister(driver, errorForm);
    }
  }

  return (
    <>
      <Titulo>
        <div>
          <h2>
            Vehículos
            <br />
          </h2>
        </div>
        <ButtonV1 onClick={() => setModalIsOpen(true)}>Agregar</ButtonV1>
      </Titulo>
      <ContainerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <FormEdit onSubmit={handleSubmit}>
          <FormHead>
            <h2>Nuevo Vehículo</h2>
          </FormHead>
          <br />
          <ContainerScroll>

            <TituloSeccion>  {/* Tarjeta de circulacion */}
              Datos del Vehiculo
              <hr />
            </TituloSeccion>

            <GrupoSelect>
                {typeof estado !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      //disabled={true}
                      name={"marca"}
                      value={marca}
                      onChange={handleChange}
                    >
                      <option>{estado || "Selecciona"}</option>
                    </Select>
                    <Label>*Marca: </Label>
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                )}
                {!Array.isArray(estado) ? null : (
                  <SelectContainer>
                    <Select
                      disabled={false}
                      name={"state"}
                      value={state}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {marca.map((est, idx) => {
                        return <option key={idx}>{est}</option>;
                      })}
                    </Select>
                    <Label>*Marca: </Label>
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                )}

                {typeof submarca !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      name={"submarca"}
                      value={submarca}
                      onChange={handleChange}
                    >
                      <option>{submarca || "Selecciona"}</option>
                    </Select>
                    <Label>*Sub-Marca: </Label>
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}
                {!Array.isArray(submarca) ? null : (
                  <SelectContainer>

                    <Select
                      name={"submarca"}
                      value={submarca}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {submarca.map((cit, idx) => {
                        return <option key={idx}>{cit}</option>;
                      })}
                    </Select>
                    <Label>*Sub-Marca: </Label>
                    {/* <br /> */}
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}

                {typeof modelo !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      name={"modelo"}
                      value={modelo}
                      onChange={handleChange}
                    >
                      <option>{modelo || "Selecciona"}</option>
                    </Select>
                    <Label>*Modelo: </Label>
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}
                {!Array.isArray(modelo) ? null : (
                  <SelectContainer>

                    <Select
                      name={"modelo"}
                      value={modelo}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {modelo.map((cit, idx) => {
                        return <option key={idx}>{cit}</option>;
                      })}
                    </Select>
                    <Label>*Modelo: </Label>
                    {/* <br /> */}
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}

                {typeof color !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      name={"color"}
                      value={color}
                      onChange={handleChange}
                    >
                      <option>{color || "Selecciona"}</option>
                    </Select>
                    <Label>*Color: </Label>
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}
                {!Array.isArray(color) ? null : (
                  <SelectContainer>
                    <Select
                      name={"color"}
                      value={color}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {color.map((cit, idx) => {
                        return <option key={idx}>{cit}</option>;
                      })}
                    </Select>
                    <Label>*Color: </Label>
                    {/* <br /> */}
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}
            </GrupoSelect>

            <GrupoInput> {/* Placa y Motor */}
                <InputContainer>  {/* placa */}
                  <Input
                    color={"transparent"}
                    type="text"
                    name={"placa"}
                    value={placa}
                    placeholder="a"
                    onChange={handleChange}
                  />
                  <Label>*Placa: </Label>
                  <br />
                  {nameError && <Span>{nameError}</Span>}
                </InputContainer>

                <InputContainer>  {/* motor */}
                  <Input
                    color={"transparent"}
                    type="text"
                    name={"motor"}
                    value={motor}
                    placeholder="a"
                    onChange={handleChange}
                  />
                  <Label>*Número Motor: </Label>
                  <br />
                  {nameError && <Span>{nameError}</Span>}
                </InputContainer>
            </GrupoInput>

            <TituloSeccion>  {/* Tarjeta de circulacion */}
                  <hr />
                  Tarjeta de circulacion
            </TituloSeccion>

            <GrupoInput>
              <InputContainer> {/* Número de Tarjeta */}
                  <Input
                    color={"transparent"}
                    type="text"
                    name={"motor"}
                    value={motor}
                    placeholder="a"
                    onChange={handleChange}
                  />
                  <Label>*Número de Tarjeta: </Label>
                  <br />
                  {nameError && <Span>{nameError}</Span>}
              </InputContainer>
            </GrupoInput>


            <SubeImgContainer style={pictureLicence}> {/* Img delante y Atras */}
                <br />
                {!driverLicenseNumber ? (
                  <>
                    <div style={dropzoneContainerStyles}>
                      <p>Desabilitado</p>
                    </div>
                    <div style={dropzoneContainerStyles}>
                      <p>Desabilitado</p>
                    </div>
                  </>
                ) : (
                  <>
                    <SubeContainerImg
                      {...getFrontLicenseRootProps()}
                      style={dropzoneContainerStyles}
                    >
                      <ImgSube {...getFrontLicenseInputProps()} />
                      {frontLicensePicture && (
                        <img
                          src={`data:image/png;base64,${frontLicensePicture}`}
                          alt="Foto conductor"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                      Frente
                      {frontLicensePictureError && (
                        <Span>{frontLicensePictureError}</Span>
                      )}
                    </SubeContainerImg>
                    <SubeContainerImg
                      {...getBackLicenseRootProps()}
                      style={dropzoneContainerStyles}
                    >
                      <ImgSube {...getBackLicenseInputProps()} />
                      {backLicensePicture && (
                        <img
                          src={`data:image/png;base64,${backLicensePicture}`}
                          alt="Foto conductor"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                      Atrás
                      {backLicensePictureError && (
                        <Span>{backLicensePictureError}</Span>
                      )}
                    </SubeContainerImg>
                  </>
                )}
            </SubeImgContainer>

            <TituloSeccion>  {/* Conductor */}
                <hr />
                Conductor
            </TituloSeccion>

            <GrupoSelect> {/* Conductor Asignado */}
                {typeof estado !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      //disabled={true}
                      name={"marca"}
                      value={state}
                      onChange={handleChange}
                    >
                      <option>{estado || "Selecciona"}</option>
                    </Select>
                    <Label>*Conductor Asignado: </Label>
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                )}
                {!Array.isArray(estado) ? null : (
                  <SelectContainer>
                    <Select
                      disabled={false}
                      name={"state"}
                      value={state}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {estado.map((est, idx) => {
                        return <option key={idx}>{est}</option>;
                      })}
                    </Select>
                    <Label>*Conductor Asignado: </Label>
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                )}
            </GrupoSelect>

            <GrupoCheck> {/* Es el propietario? */}

                <label>Es el propietario?</label>
                <InputCheck
                  type="checkbox"
                  name="servicesLGBQT"
                  checked={servicesLGBQT === 1}
                  //disabled={allServices === 1 ? true : false}
                  onChange={handleCheckboxChange}
                />
                SI
                <InputCheck
                  type="checkbox"
                  name="onlyWomenServices"
                  checked={onlyWomenServices === 1}
                  //disabled={allServices === 1 ? true : false}
                  onChange={handleCheckboxChange}
                />
                NO
            </GrupoCheck>
            {servicesError && <Span>{servicesError}</Span>}

            <TituloSeccion>  {/* Propietario */}
                <hr />
                Propietario
            </TituloSeccion>

            <GrupoInput> {/* Propietario */}
              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"name"}
                  value={name}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Nombre(s): </Label>
                <br />
                {nameError && <Span>{nameError}</Span>}
              </InputContainer>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"lastName"}
                  placeholder="a"
                  value={lastName}
                  onChange={handleChange}
                />
                <Label>*Apellidos: </Label>
                <br />
                {lastNameError && <Span>{lastNameError}</Span>}
              </InputContainer>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"zipCode"}
                  placeholder="a"
                  value={zipCode}
                  onChange={handleChange}
                />
                <Label>*Código postal: </Label>
                <br />
                {zipCodeError && <Span>{zipCodeError}</Span>}
              </InputContainer>
            </GrupoInput>

            <GrupoSelect> {/* Estado, Ciudad y Colonia */}
              {typeof estado !== "string" ? null : (
                <SelectContainer>
                  <Select
                    //disabled={true}
                    name={"marca"}
                    value={state}
                    onChange={handleChange}
                  >
                    <option>{estado || "Selecciona"}</option>
                  </Select>
                  <Label>*Estado: </Label>
                  {stateError && <Span>{stateError}</Span>}
                </SelectContainer>
              )}
              {!Array.isArray(estado) ? null : (
                <SelectContainer>
                  <Select
                    disabled={false}
                    name={"state"}
                    value={state}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {estado.map((est, idx) => {
                      return <option key={idx}>{est}</option>;
                    })}
                  </Select>
                  <Label>*Estado: </Label>
                  {stateError && <Span>{stateError}</Span>}
                </SelectContainer>
              )}

              {typeof ciudad !== "string" ? null : (
                <SelectContainer>

                  <Select
                    disabled={true}
                    name={"city"}
                    value={city}
                    onChange={handleChange}
                  >
                    <option>{ciudad || "Selecciona"}</option>
                  </Select>
                  <Label>*Ciudad: </Label>
                  {cityError && <Span>{cityError}</Span>}
                </SelectContainer>
              )}
              {!Array.isArray(ciudad) ? null : (
                <SelectContainer>

                  <Select
                    disabled={false}
                    name={"city"}
                    value={city}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {ciudad.map((cit, idx) => {
                      return <option key={idx}>{cit}</option>;
                    })}
                  </Select>
                  <Label>*Ciudad: </Label>
                  {/* <br /> */}
                  {cityError && <Span>{cityError}</Span>}
                </SelectContainer>
              )}

              <SelectContainer>

                <Select
                  disabled={zipCode || codigoPostal === zipCode ? false : true}
                  name={"colonia"}
                  value={colonia}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {colonias.length >= 1 &&
                    colonias.map((colonia, idx) => {
                      return (
                        <option key={idx} value={colonia}>
                          {colonia}
                        </option>
                      );
                    })}
                </Select>
                <Label>*Colonia: </Label>
                {coloniaError && <Span>{coloniaError}</Span>}
              </SelectContainer>
            </GrupoSelect>

            <GrupoInput> {/* Domicilio, Telefono y Email */}
              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"address"}
                  placeholder="a"
                  value={address}
                  onChange={handleChange}
                />
                <Label>*Domicilio: </Label>
                <br />
                {addressError && <Span>{addressError}</Span>}
              </InputContainer>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"contact"}
                  value={contact}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Teléfono (Móvil): </Label>
                <br />
                {contactError && <Span>{contactError}</Span>}
              </InputContainer>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"email"}
                  value={email}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Correo electrónico: </Label>
                <br />
                {emailError && <Span>{emailError}</Span>}
              </InputContainer>
            </GrupoInput>
            
            <br />
            <br />
          </ContainerScroll>

          <ButtonContainer>
            <SubmitBtn type="submit">Guardar</SubmitBtn>
            <SubmitBtn
              onClick={() => {
                setModalIsOpen(false), closeModal();
              }}
            >
              Cancelar
            </SubmitBtn>
          </ButtonContainer>
        </FormEdit>
      </ContainerModal>
    </>
  );
};