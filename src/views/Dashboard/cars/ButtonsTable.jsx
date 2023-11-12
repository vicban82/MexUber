import React, { useCallback, useEffect, useMemo, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import { axiosGetDrivers, axiosPostDriver, axiosPutDriver } from "../../../hooks/drivers/crudDrivers";
import styled from 'styled-components';
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
  TextareaContainer
} from "../../../components/reusable/FormularioModal";

Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

const GrupoInputV1 = styled(GrupoInput)`
  grid-gap: 60px;
`;

const InputContainerV1 = styled(InputContainer)`
  grid-gap: 89px;
`;

const InputCheckV1 = styled(InputCheck)`
  margin-top: 5px;
`;

const dropzoneContainerStyles = {
  width: '50%', // Establece el ancho del contenedor
  //height: '200px', // Establece la altura del contenedor
  border: '2px dashed #700202',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const pictureLicence = {
  display: "flex",
};

const Img = styled.img`
  height: 32px;
  border-radius: 5px;
  size: 5px;
  transition: border-radius 0.5s;
  &:hover{
    border-radius: 25px;
    transition: border-radius 0.5s;
  }
`;

export function ButtonsTable({
  id,
  tCar,
  setTCar,
  car,
  setCar,
  errorForm,
  setErrorForm, 
  limit, 
  setTotalPages, 
  setPage,
}) {
  const currentDriver = tCar.find((item) => item._id === id);
  const [modifDriver, setModifDriver] = useState({});
  // console.log("currentDriver:", currentDriver)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sepomex, setSepomex] = useState([]);
  const [licencias, setLicencias] = useState([]);
  //* INFORMACION DEL CONDUCTOR
  const [codigoPostal, setZipcode] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
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
    // car,
  } = car;
  // console.log("form car:", car)
  
  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  
  function handleChange(e) {
    const { name, value } = e.target;
    // console.log("name:", name)
    let updatedDriver = {...car}
    
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
        if (findState) {
          setEstado(findState);
        }
        // * ------------ CIUDADES ------------
        const filterByState = memorySepomes.filter(el => {
          if (el.estado === value) {
            return el.ciudad
          }
        });
        const findCity = [...new Set(filterByState.map(el => el.ciudad))].filter(el => el !== undefined)
        if (findCity) {
          setCiudad(findCity);
        }
        // * ------------ COLONIAS ------------
        const filterByCity = memorySepomes.filter(el => {
          if (el.ciudad === value) {
            return el.colonias
          }
        });
        const findColonia = [...new Set(filterByCity.map(el => el.colonias))].flat(1)
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

    setCar({
      ...car,
      [name]: value,
    });
    setErrorForm(
      validateDriver({
        ...car,
        [name]: value,
      }, selectImage)
    );
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let updatedDriver = { ...car };

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

    setCar(updatedDriver);
  };

  useEffect(() => {
    // Actualizar los valores del formulario cuando estado o ciudad cambien
    if (typeof estado === "string" || typeof ciudad === "string") {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setCar(prevState => ({
        ...prevState,
        state: estado,
        city: ciudad,
      }));
    }
  }, [estado, ciudad]);

  useEffect(() => {
    // Este codigo permite la sincronización de los mensajes de las imagenes
    const validationErrors = validateDriver(car, selectImage);
    setErrorForm(validationErrors);
  }, [car]);

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
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      convertAndSetImage(file, "driverPicture");
    }
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
    console.log("file:", file)
    setSelectImage(file)
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setCar(prevState => ({
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

  function closeModal() {
    setModifDriver({
      name: currentDriver.name,
      lastName: currentDriver.lastName,
      zipCode: currentDriver.zipCode, // CODIGO POSTAL
      state: currentDriver.state, // ESTADO DE MEXICO
      city: currentDriver.city,
      colonia: currentDriver.colonia,
      address: currentDriver.address,
      contact: currentDriver.contact, // NUMERO DE CONTACTO DEL CONDUCTOR
      email: currentDriver.email,
      driverPicture: currentDriver.driverPicture, //* FOTO DEL CONDUCTOR
      //! DATOS DE LA LICENCIA DE CONDUCCION
      driverLicenseNumber: currentDriver.driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
      stateLicense: currentDriver.stateLicense, // ESTADO DE LA LICENCIA
      typeLicense: currentDriver.typeLicense, // TIPO LICENCIA
      dateLicense: currentDriver.dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
      frontLicensePicture: currentDriver.frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
      backLicensePicture: currentDriver.backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
      //! DATOS DE LA LICENCIA DE CONDUCCION
      //! AJUSTES DE LA APLICACION
      allServices: currentDriver.allServices, // TODOS
      servicesLGBQT: currentDriver.servicesLGBQT, // LGBQT+
      onlyWomenServices: currentDriver.onlyWomenServices, // MUJERES
      //! AJUSTES DE LA APLICACION
      //! ACCESO A LA APLICACION
      password: '',
      repeatPassword: '',
      isActive: currentDriver.isActive,
      messageReasonInActive: currentDriver.messageReasonInActive, // MENSAJE RASON INACTIVO
      //! ACCESO A LA APLICACION
      car: currentDriver.car || null,
      //! NO SE VALIDAN
      tokenNotification: currentDriver.tokenNotification,
      typePhone: currentDriver.typePhone,
      //! NO SE VALIDAN
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      name ||
      lastName ||
      zipCode ||
      state ||
      city ||
      colonia ||
      address ||
      contact ||
      email ||
      (allServices === 1 ||
      servicesLGBQT === 1 ||
      onlyWomenServices === 1) ||
      password ||
      repeatPassword
    ) {
      if (passwordError && repeatPasswordError) {
        errorRegister(car, errorForm);
      } else if (driverPictureError || frontLicensePictureError && backLicensePictureError) {
        errorRegister(car, errorForm);
      } else if (stateLicenseError || typeLicenseError || dateLicenseError || frontLicensePictureError || backLicensePictureError) {
        errorRegister(car, errorForm);
      } else if (messageReasonInActiveError) {
        errorRegister(car, errorForm);
      } else {
        try {
          successRegister(car);
          const newDriver = await axiosPutDriver(id, car, headers);
          setTCar([...tCar, newDriver]);

          await axiosGetDrivers(setTCar, setTotalPages, headers, 1, limit)
  
          // Cierra el modal después de guardar
          setModalIsOpen(false);
          closeModal()

          // Establece la página en 1 después de agregar un elemento
          setPage(1);
        } catch (error) {
          console.error("Error al guardar el admin:", error);
        }
      }
    } else  {
      errorRegister(car, errorForm);
    }
  }

  return (
    <>
      <td>
        {/* The button to open modal */}
        <button onClick={() => setModalIsOpen(true)}>
          <Img src={editIcon} alt="Edición" />
        </button>

        {/* Modal */}
        <ContainerModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <FormEdit onSubmit={handleSubmit}>
            <FormHead>
              <h2>Modificar Vehiculo</h2>
            </FormHead>
            <br />
            <ContainerScroll>
{/*               <TituloSeccion>
                <hr />
                Datos Personales
              </TituloSeccion> */}
              <GrupoInput>
                <InputContainer>
                  <Input
                    type="text"
                    name={"name"}
                    value={name}
                    placeholder={currentDriver.name}
                    onChange={handleChange}
                  />
                  <Label>*Nombre(s): </Label>
                  <br />
                  {nameError && <Span>{nameError}</Span>}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"lastName"}
                    placeholder={currentDriver.lastName}
                    value={lastName}
                    onChange={handleChange}
                  />
                  <Label>*Apellidos: </Label>
                  <br />
                  {lastNameError && <Span>{lastNameError}</Span>}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"zipCode"}
                    placeholder={currentDriver.zipCode}
                    value={zipCode}
                    onChange={handleChange}
                  />
                  <Label>*Código postal: </Label>
                  <br />
                  {zipCodeError && <Span>{zipCodeError}</Span>}
                </InputContainer>
              </GrupoInput>

              <GrupoSelect>
                {typeof estado !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      disabled={true}
                      name={"state"}
                      placeholder={currentDriver.state}
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
                      placeholder={currentDriver.state}
                      value={state}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {estado.map((est, idx) => {
                        return <option key={idx}>{est}</option>;
                      })}
                    </Select>
                    <Label>*Estado: </Label>
                    {/* <br /> */}
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                )}

                {typeof ciudad !== "string" ? null : (
                  <SelectContainer>
                    <Select
                      disabled={true}
                      name={"city"}
                      // placeholder={currentDriver.city}
                      value={city}
                      onChange={handleChange}
                    >
                      <option>{currentDriver.city || "Selecciona"}</option>
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
                      placeholder={currentDriver.city}
                      //value={city}
                      value={typeof city === "string" && city}
                      onChange={handleChange}
                    >
                      <option>Selecciona</option>
                      {ciudad.map((cit, idx) => {
                        return <option key={idx}>{cit}</option>;
                      })}
                    </Select>
                    <Label>*Ciudad: </Label>
                    {cityError && <Span>{cityError}</Span>}
                  </SelectContainer>
                )}
                <SelectContainer>
                  <Select
                    disabled={
                      zipCode || codigoPostal === zipCode ? false : true
                    }
                    name={"colonia"}
                    placeholder={currentDriver.colonia}
                    value={colonia}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {colonias.length >= 1 &&
                      colonias.map((colonia, idx) => {
                        return <option key={idx}>{colonia}</option>;
                      })}
                  </Select>
                  <Label>*Colonia: </Label>
                  {coloniaError && <Span>{coloniaError}</Span>}
                </SelectContainer>
              </GrupoSelect>

              <GrupoInput>
                <InputContainer>
                  <Input
                    type="text"
                    name={"address"}
                    placeholder={currentDriver.address}
                    value={address}
                    onChange={handleChange}
                  />
                  <Label>*Domicilio: </Label>
                  <br />
                  {addressError && <Span>{addressError}</Span>}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"contact"}
                    placeholder={currentDriver.contact}
                    value={contact}
                    onChange={handleChange}
                  />
                  <Label>*Teléfono (Móvil): </Label>
                  <br />
                  {contactError && <Span>{contactError}</Span>}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"email"}
                    placeholder={currentDriver.email}
                    value={email}
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
                  <div
                    {...getDriverRootProps()}
                    style={dropzoneContainerStyles}
                  >
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
                    type="text"
                    name={"driverLicenseNumber"}
                    placeholder={currentDriver.driverLicenseNumber}
                    value={driverLicenseNumber}
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
                    placeholder={currentDriver.stateLicense}
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
                    placeholder={currentDriver.typeLicense}
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
                    disabled={driverLicenseNumber ? false : true}
                    type="date"
                    name={"dateLicense"}
                    value={dateLicense}
                    placeholder={currentDriver.dateLicense}
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
                          <Img
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
                Ajustes en la aplicación
              </TituloSeccion>
              <GrupoCheck>
                <LabelCheck>Servicio para: </LabelCheck>
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

              <GrupoInputV1>
                <TituloSeccion>
                  <hr />
                  Acceso a la aplicación
                </TituloSeccion>
                <InputContainerV1>
                  <Input
                    type="password"
                    name={"password"}
                    value={password}
                    onChange={handleChange}
                  />
                  <Label>Contraseña: </Label>
                  <br />
                  {passwordError && <Span>{passwordError}</Span>}
                </InputContainerV1>

                <InputContainerV1>
                  <Input
                    type="password"
                    name={"repeatPassword"}
                    value={repeatPassword}
                    onChange={handleChange}
                  />
                  <Label>Repetir contraseña: </Label>
                  <br />
                  {repeatPasswordError && <Span>{repeatPasswordError}</Span>}
                </InputContainerV1>
              </GrupoInputV1>

              <GrupoCheck>
                <CheckContainer>
                  <LabelCheck>Activo: </LabelCheck>
                  <InputCheckV1
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
                    type="text"
                    name={"messageReasonInActive"}
                    value={messageReasonInActive}
                    placeholder={currentDriver.messageReasonInActive}
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
              <SubmitBtn onClick={() => {
                setModalIsOpen(false);
                closeModal();
              }}>
                Cancelar
              </SubmitBtn>
            </ButtonContainer>
          </FormEdit>
        </ContainerModal>
        <button onClick={() => handleDelete(id)}>
          <Img src={deleteIcon} alt="Delete" />
        </button>
      </td>
    </>
  );
}
