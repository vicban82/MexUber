import React, { useCallback, useEffect, useMemo, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateDriver, validateUpDateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import { axiosDetailDriver, axiosGetDrivers, axiosPostDriver, axiosPutDriver } from "../../../hooks/drivers/crudDrivers";
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
import { Detail } from "./detail";

Modal.setAppElement("#root");

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
  tDriver,
  setTDriver,
  driver,
  setDriver,
  errorForm,
  setErrorForm, 
  limit, 
  setTotalPages, 
  setPage,
}) {
  const [detailDriver, setDetailDriver] = useState({});
  useEffect(() => {
    axiosDetailDriver(id, setDetailDriver, headers);
  }, [id]);
  // useEffect(() => {
  //   async function upDate() {
  //     const data = await axiosDetailDriver(id, setDetailDriver, headers);
  //     const update = {
  //       name: data.name,
  //       lastName: data.lastName,
  //       zipCode: data.zipCode,
  //       state: data.state,
  //       colonia: data.colonia,
  //       address: data.address,
  //       contact: data.contact,
  //       email: data.email,
  //       driverPicture: data.driverPicture,
  //       dateLicense: data.dateLicense,
  //       stateLicense: data.stateLicense,
  //       typeLicense: data.typeLicense,
  //       frontLicensePicture: data.frontLicensePicture,
  //       backLicensePicture: data.backLicensePicture,
  //       password: '',
  //       isActive: data.isActive,
  //       messageReasonInActive: data.messageReasonInActive,
  //       tokenNotification: data.tokenNotification,
  //       typePhone: data.typePhone,
  //       allServices: data.allServices,
  //       servicesLGBQT: data.servicesLGBQT,
  //       onlyWomenServices: data.onlyWomenServices,
  //     }
  //     console.log("update:", update)
  //     if (update) {
  //       setDriver(update)
  //     }
  //   }
  //   upDate()
  // }, [id]);
  // const [modifDriver, setModifDriver] = useState({});
  // console.log("detailDriver:", detailDriver)
  // console.log("id:", id)

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
  
  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  
  function handleChange(e) {
    const { name, value } = e.target;
    // console.log("name:", name)
    
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
          setSelectEstado(findState);
        }
        // * ------------ CIUDADES ------------
        const filterByState = memorySepomes.filter(el => {
          if (el.estado === value) {
            return el.ciudad
          }
        });
        const findCity = [...new Set(filterByState.map(el => el.ciudad))].filter(el => el !== undefined)
        if (findCity) {
          setSelectCiudad(findCity);
        }
        // * ------------ COLONIAS ------------
        const filterByCity = memorySepomes.filter(el => {
          if (el.ciudad === value) {
            return el.colonias
          }
        });
        const findColonia = [...new Set(filterByCity.map(el => el.colonias))].flat(1)
        if (findColonia) {
          setSelectColonias(findColonia);
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
      validateUpDateDriver({
        ...driver,
        [name]: value,
      }, selectImage)
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
      // localStorage.removeItem("Ciudades");
      // localStorage.removeItem("Colonias");
      setSelectEstado([]);
      setSelectCiudad([]);
      setSelectColonias([]);
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
      setDriver(prevState => ({
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
    console.log("file:", file)
    setSelectImage(file)
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

  function closeModal() {
    setModifDriver({
      name: detailDriver.name,
      lastName: detailDriver.lastName,
      zipCode: detailDriver.zipCode, // CODIGO POSTAL
      state: detailDriver.state, // ESTADO DE MEXICO
      city: detailDriver.city,
      colonia: detailDriver.colonia,
      address: detailDriver.address,
      contact: detailDriver.contact, // NUMERO DE CONTACTO DEL CONDUCTOR
      email: detailDriver.email,
      driverPicture: detailDriver.driverPicture, //* FOTO DEL CONDUCTOR
      //! DATOS DE LA LICENCIA DE CONDUCCION
      driverLicenseNumber: detailDriver.driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
      stateLicense: detailDriver.stateLicense, // ESTADO DE LA LICENCIA
      typeLicense: detailDriver.typeLicense, // TIPO LICENCIA
      dateLicense: detailDriver.dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
      frontLicensePicture: detailDriver.frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
      backLicensePicture: detailDriver.backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
      //! DATOS DE LA LICENCIA DE CONDUCCION
      //! AJUSTES DE LA APLICACION
      allServices: detailDriver.allServices, // TODOS
      servicesLGBQT: detailDriver.servicesLGBQT, // LGBQT+
      onlyWomenServices: detailDriver.onlyWomenServices, // MUJERES
      //! AJUSTES DE LA APLICACION
      //! ACCESO A LA APLICACION
      password: '',
      repeatPassword: '',
      isActive: detailDriver.isActive,
      messageReasonInActive: detailDriver.messageReasonInActive, // MENSAJE RASON INACTIVO
      //! ACCESO A LA APLICACION
      car: detailDriver.car || null,
      //! NO SE VALIDAN
      tokenNotification: detailDriver.tokenNotification,
      typePhone: detailDriver.typePhone,
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
      onlyWomenServices === 1)
    ) {
      if (passwordError && repeatPasswordError) {
        errorRegister(driver, errorForm);
      } else if (driverPictureError || frontLicensePictureError && backLicensePictureError) {
        errorRegister(driver, errorForm);
      } else if (stateLicenseError || typeLicenseError || dateLicenseError || frontLicensePictureError || backLicensePictureError) {
        errorRegister(driver, errorForm);
      } else if (messageReasonInActiveError) {
        errorRegister(driver, errorForm);
      } else {
        try {
          successRegister(driver);
          const currentDriver = await axiosPutDriver(id, driver, headers);
          
          // Actualiza la lista en el frontend
          setTDriver(prev => {
            // Reemplaza el driver editado en la lista por el nuevo driver devuelto por el backend
            const updatedTDrivers = prev.map(item => {
              if (item._id === id) {
                return  {
                  name: currentDriver.name,
                  lastName: currentDriver.lastName,
                  email: currentDriver.email,
                  contact: currentDriver.contact,
                  isActive: currentDriver.isActive,
                  car: currentDriver.car,
                }
              } else {
                return item;
              }
            });
            // const updatedTDrivers = prev.map(item => (item._id === id ? currentDriver : item));
            return updatedTDrivers;
          });
  
          // Cierra el modal después de guardar
          setModalIsOpen(false);
          // closeModal()

          // Establece la página en 1 después de agregar un elemento
          setPage(1);
        } catch (error) {
          console.error("Error al modificar el conductor:", error);
        }
      }
    } else  {
      errorRegister(driver, errorForm);
    }
  }

  return (
    <>
      <Detail id={id} />
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
              <h2>Modificar Conductor</h2>
            </FormHead>
            <br />
            <ContainerScroll>
              {/*//* INFORMACION DEL CONDUCTOR */}
              <TituloSeccion>
                Datos Personales
                <hr />
              </TituloSeccion>
              <GrupoInput>
                <InputContainer>
                  <Input
                    type="text"
                    name={"name"}
                    value={name}
                    // placeholder={detailDriver.name}
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
                    placeholder={detailDriver.lastName}
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
                    placeholder={detailDriver.zipCode}
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
                      <option>{!estado ? detailDriver.state : estado || "Selecciona"}</option>
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
                      <option>{detailDriver.state || "Selecciona"}</option>
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
                      <option>{detailDriver.city || "Selecciona"}</option>
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
                      <option>{detailDriver.colonia || "Selecciona"}</option>
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
                      <option>{detailDriver.colonia || "Selecciona"}</option>
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
                    type="text"
                    name={"address"}
                    placeholder={detailDriver.address}
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
                    placeholder={detailDriver.contact}
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
                    placeholder={detailDriver.email}
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
                    placeholder={detailDriver.driverLicenseNumber}
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
                    value={stateLicense}
                    onChange={handleChange}
                  >
                    <option>
                      {detailDriver.stateLicense || !driverLicenseNumber
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
                      {detailDriver.typeLicense || !driverLicenseNumber
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
                    placeholder={detailDriver.dateLicense}
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
                    placeholder={detailDriver.messageReasonInActive}
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
