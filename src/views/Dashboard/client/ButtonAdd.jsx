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
  color: var(--color-morado);
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--background-color-buttonV1);
  cursor: pointer;
  transition: border-color 0.25s;
`;

const dropzoneContainerStyles = {
  width: "50%", // Establece el ancho del contenedor
  //height: "200px", // Establece la altura del contenedor
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
  //* INFORMACION DEL CONDUCTOR
  const [codigoPostal, setZipcode] = useState("");
  const [estado, setEstado] = useState("");
  const [selectEstado, setSelectEstado] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [selectCiudad, setSelectCiudad] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [selectColonias, setSelectColonias] = useState([]);
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
          setSelectEstado(findState);
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
          localStorage.setItem("Ciudades", JSON.stringify(findCity));
          const ciudades = JSON.parse(localStorage.getItem("Ciudades"));
          setSelectCiudad(ciudades);
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
          localStorage.setItem("Colonias", JSON.stringify(findColonia));
          const colonias = JSON.parse(localStorage.getItem("Colonias"));
          setSelectColonias(colonias);
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
      setZipcode("");
      setEstado("");
      setCiudad("");
      setColonias("");
      localStorage.removeItem("Ciudades");
      localStorage.removeItem("Colonias");
      setSelectEstado([]);
      // setSelectCiudad([]);
      // setSelectColonias([]);
      updatedDriver = {
        ...updatedDriver,
        state: "",
        city: "",
        colonia: "",
      }
    }
    if (driverLicenseNumber.length <= 4) {
      updatedDriver = {
        ...updatedDriver,
        stateLicense: "",
        typeLicense: "",
        dateLicense: "",
        frontLicensePicture: "",
        backLicensePicture: "",
      }
    }

    setDriver(updatedDriver);
  }, [zipCode, driverLicenseNumber]);

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
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      convertAndSetImage(file, "frontLicensePicture");
    }
  }, []);

  const onBackLicensePictureDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      convertAndSetImage(file, "backLicensePicture");
    }
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
          await axiosPostDriver(driver, headers);
          // setTDriver([...tDriver, newDriver]);

          await axiosGetDrivers(setTDriver, setTotalPages, headers, 1, limit);

          // Cierra el modal después de guardar
          setModalIsOpen(false);
          closeModal();

          // Establece la página en 1 después de agregar un elemento
          setPage(1);
        } catch (error) {
          console.error("Error al guardar el admin:", error);
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
            Clientes
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
            <h2>Nuevo Conductor</h2>
          </FormHead>
          <br />
          <ContainerScroll>
            {/*//* INFORMACION DEL CONDUCTOR */}
            <TituloSeccion>
              <hr />
              Datos Personales
            </TituloSeccion>
            <GrupoInput>
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

            <GrupoSelect>
              {codigoPostal ? (
                <SelectContainer>
                  <Select 
                    disabled={true}
                    name={"state"}
                    value={state}
                    onChange={handleChange}
                  >
                    <option>{estado || "Selecciona"}</option>
                  </Select>
                  <Label>*Estado: </Label>
                  {stateError && <Span>{stateError}</Span>}
                </SelectContainer>
              ) : (
                <SelectContainer>
                  <Select
                    disabled={zipCode.length <= 4 ? true : false}
                    name={"state"}
                    value={state}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {selectEstado.map((est, idx) => {
                      return <option key={idx}>{est}</option>;
                    })}
                  </Select>
                  <Label>*Estado: </Label>
                  {stateError && <Span>{stateError}</Span>}
                </SelectContainer>
              )}

              {codigoPostal ? (
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
              ) : (
                <SelectContainer>
                  <Select
                    disabled={zipCode.length <= 4 ? true : false}
                    name={"city"}
                    value={city}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {selectCiudad.map((cit, idx) => {
                      return <option key={idx}>{cit}</option>;
                    })}
                  </Select>
                  <Label>*Ciudad: </Label>
                  {cityError && <Span>{cityError}</Span>}
                </SelectContainer>
              )}

              {codigoPostal ? (
                <SelectContainer>
                  <Select
                    disabled={zipCode.length <= 4 || !state || !city ? true : false}
                    name={"colonia"}
                    value={colonia}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {colonias.length >= 1 &&
                      colonias.map((colonia, idx) => {
                        return (
                          <option key={idx} >
                            {colonia}
                          </option>
                        );
                      })}
                  </Select>
                  <Label>*Colonia: </Label>
                  {coloniaError && <Span>{coloniaError}</Span>}
                </SelectContainer>
              ) : (
                <SelectContainer>
                  <Select
                    disabled={zipCode.length <= 4 || !state || !city ? true : false}
                    name={"colonia"}
                    value={colonia}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {selectColonias.length >= 1 &&
                      selectColonias.map((colonia, idx) => {
                        return (
                          <option key={idx} >
                            {colonia}
                          </option>
                        );
                      })}
                  </Select>
                  <Label>*Colonia: </Label>
                  {coloniaError && <Span>{coloniaError}</Span>}
                </SelectContainer>
              )}
            </GrupoSelect>

            <GrupoInput>
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

            <GrupoImg>
              <TituloSeccion>
                <hr />
                Foto del Conductor
              </TituloSeccion>
              <SubeImgContainer>
                <div {...getDriverRootProps()} style={dropzoneContainerStyles}>
                  <input {...getDriverInputProps()} />
                  {driverPicture && (
                    <img
                      src={`data:image/png;base64,${driverPicture}`}
                      alt="Foto conductor"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                  <p>Frente</p>
                  <br />
                  {driverPictureError && <Span>{driverPictureError}</Span>}
                </div>
              </SubeImgContainer>
            </GrupoImg>

            <GrupoInput>
              <TituloSeccion>
                <hr />
                Licencia de conducir
              </TituloSeccion>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="text"
                  name={"driverLicenseNumber"}
                  value={driverLicenseNumber}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>Número de licencia: </Label>
                <br />
                {driverLicenseNumberError && (
                  <Span>{driverLicenseNumberError}</Span>
                )}
              </InputContainer>
            </GrupoInput>

            <GrupoSelect>
              <SelectContainer>
                <Select
                  disabled={driverLicenseNumber ? false : true}
                  name={"stateLicense"}
                  //placeholder="dsdsd"
                  value={stateLicense}
                  onChange={handleChange}
                >
                  <option>
                    {!driverLicenseNumber
                      ? "Estato de la Licencia"
                      : "*Estato de la Licencia"}
                  </option>
                  {estados.length >= 1 &&
                    estados.map((estado, idx) => {
                      return (
                        <option key={idx} value={estado}>
                          {estado}
                        </option>
                      );
                    })}
                </Select>
                {stateLicenseError && <Span>{stateLicenseError}</Span>}
              </SelectContainer>

              <SelectContainer>
                <Select
                  disabled={driverLicenseNumber ? false : true}
                  name={"typeLicense"}
                  value={typeLicense}
                  onChange={handleChange}
                >
                  <option>
                    {!driverLicenseNumber
                      ? "Tipo de licencia"
                      : "*Tipo de licencia"}
                  </option>
                  {licences.length >= 1 &&
                    licences.map((licencia, idx) => {
                      return (
                        <option key={idx} value={licencia}>
                          {licencia}
                        </option>
                      );
                    })}
                </Select>
                {typeLicenseError && <Span>{typeLicenseError}</Span>}
              </SelectContainer>
            </GrupoSelect>

            <GrupoInput>
              <InputContainer>
                <Input
                  color={"transparent"}
                  disabled={driverLicenseNumber ? false : true}
                  type="date"
                  name={"dateLicense"}
                  value={dateLicense}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>
                  {!driverLicenseNumber
                    ? "Vigencia de licencia: "
                    : "*Vigencia de licencia: "}
                </Label>
                {dateLicenseError && <SpanData>{dateLicenseError}</SpanData>}
              </InputContainer>

              <TituloSeccion>
                <hr />
                {!driverLicenseNumber
                  ? "Foto de Licencia (Ambos lados)"
                  : "*Foto de Licencia (Ambos lados)"}
              </TituloSeccion>
              <SubeImgContainer style={pictureLicence}>
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
            </GrupoInput>

            <TituloSeccion>
              <hr />
              <LabelCheck>Servicio para...</LabelCheck>
            </TituloSeccion>
            <GrupoCheck>
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
              Sólo mujeres
            </GrupoCheck>
            {servicesError && <Span>{servicesError}</Span>}

            <GrupoInput>
              <TituloSeccion>
                <hr />
                Acceso a la aplicación
              </TituloSeccion>
              <InputContainer>
                <Input
                  color={"transparent"}
                  type="password"
                  name={"password"}
                  value={password}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Contraseña: </Label>
                <br />
                {passwordError && <Span>{passwordError}</Span>}
              </InputContainer>

              <InputContainer>
                <Input
                  color={"transparent"}
                  type="password"
                  name={"repeatPassword"}
                  value={repeatPassword}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Repetir contraseña: </Label>
                <br />
                {repeatPasswordError && <Span>{repeatPasswordError}</Span>}
              </InputContainer>
            </GrupoInput>

            <GrupoCheck>
              <CheckContainer>
                <LabelCheck>Activo: </LabelCheck>
                <InputCheck
                  type="checkbox"
                  name={"isActive"}
                  checked={isActive === 1}
                  onChange={handleCheckboxChange}
                />
                <br />
                {isActiveError && <Span>{isActiveError}</Span>}
              </CheckContainer>
            </GrupoCheck>

            <GrupoInput>
              <TextareaContainer>
                <Textarea
                  color={"transparent"}
                  type="text"
                  name={"messageReasonInActive"}
                  value={messageReasonInActive}
                  placeholder="a"
                  maxLength={100}
                  disabled={isActive === 1}
                  onChange={handleChange}
                />
                <Label>Motivo de bloqueo: </Label>
              </TextareaContainer>
              {messageReasonInActiveError && (
                <Span>{messageReasonInActiveError}</Span>
              )}
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
