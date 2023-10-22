import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import { axiosGetDrivers, axiosPostDriver } from "../../../hooks/drivers/crudDrivers";
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
  setPage
}) => {
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
    car,
  } = driver;
  // console.log("form driver:", driver)
  
  const memorySepomes = useMemo(() => sepomex, [sepomex])
  const memoryLicencias = useMemo(() => licencias, [licencias])
  
  function handleChange(e) {
    const { name, value } = e.target;
    // console.log("name:", name)
    let updatedDriver = {...driver}
    
    if (name === "zipCode" && value.length >= 5 || name === "state" || name === "city" || name === "colonia") {
      const sepomexData = memorySepomes.find(el => el.codigoPostal === value);
            
      if (sepomexData) {
        setZipcode(sepomexData.codigoPostal);
        setEstado(sepomexData.estado);
        setCiudad(sepomexData.ciudad);
        setColonias(sepomexData.colonias);
      } else {
        updatedDriver = {
          ...updatedDriver,
          state: "",
          city: "",
          colonia: "",
        }
        setDriver(updatedDriver)
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

    setDriver({
      ...driver,
      [name]: value,
    });
    setErrorForm(
      validateDriver({
        ...driver,
        [name]: value,
      }, codigoPostal, selectImage)
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
    if (typeof estado === "string" || typeof ciudad === "string") {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setDriver(prevState => ({
        ...prevState,
        state: estado,
        city: ciudad,
      }));
    }
  }, [estado, ciudad]);

  useEffect(() => {
    const validationErrors = validateDriver(driver, codigoPostal, selectImage);
    setErrorForm(validationErrors);
  }, []);

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
      allServices === 1 ||
      servicesLGBQT === 1 ||
      onlyWomenServices === 1 ||
      password &&
      repeatPassword
    ) {
      if (stateLicenseError || typeLicenseError || dateLicenseError || frontLicensePictureError || backLicensePictureError) {
        errorRegister(driver, errorForm);
      } else if (messageReasonInActiveError) {
        errorRegister(driver, errorForm);
      } else {
        try {
          successRegister(driver);
          const newDriver = await axiosPostDriver(driver, headers);
          setTDriver([...tDriver, newDriver]);

          await axiosGetDrivers(setTDriver, setTotalPages, headers, 1, limit)
  
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
      errorRegister(driver, errorForm);
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
        <TituloSeccion>Datos Personales<hr /></TituloSeccion>
        <GrupoInput>
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
              <Span>{nameError}</Span>
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
              <Span>{lastNameError}</Span>
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
              <Span>{zipCodeError}</Span>
            )}
          </InputContainer>
          </GrupoInput>

          <GrupoSelect>
          {typeof estado !== "string" ? null : (
            <InputContainer>
            <Label>{props.state}: </Label>
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
                <Span>{stateError}</Span>
              )}
            </InputContainer>
          )}
          {!Array.isArray(estado) ? null : (
            <InputContainer>
              <Label>{props.state}: </Label>
              <select
                disabled={false}
                name={"state"}
                value={state}
                onChange={handleChange}
              >
                <option>Selecciona</option>
                {estado.map((est, idx) => {
                  return (
                    <option key={idx} >
                      {est}
                    </option>
                  );
                })}
              </select>
              <br />
              {stateError && (
                <Span>{stateError}</Span>
              )}
            </InputContainer>
          )}

          {typeof ciudad !== "string" ? null : (
            <InputContainer>
              <Label>{props.city}: </Label>
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
                <Span>{cityError}</Span>
              )}
            </InputContainer>
          )}
          {!Array.isArray(ciudad) ? null : (
            <InputContainer>
              <Label>{props.city}: </Label>
              <select
                disabled={false}
                name={"city"}
                // value={city}
                value={typeof city === "string" && city}
                onChange={handleChange}
              >
                <option>Selecciona</option>
                {ciudad.map((cit, idx) => {
                  return (
                    <option key={idx} >
                      {cit}
                    </option>
                  );
                })}
              </select>
              <br />
              {cityError && (
                <Span>{cityError}</Span>
              )}
            </InputContainer>
          )}

          <SelectContainer>
            <Select
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
                  <option key={idx} >
                    {colonia}
                  </option>
                );
              })}
            </Select>
            {coloniaError && (
              <Span>{coloniaError}</Span>
            )}
          </SelectContainer>
          </GrupoSelect>

          <GrupoInput>
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
              <Span>{addressError}</Span>
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
              <Span>{contactError}</Span>
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
              <Span>{emailError}</Span>
            )}
          </InputContainer>
          </GrupoInput>

          <GrupoImg>
          <TituloSeccion><hr />Foto del Conductor</TituloSeccion>
          <SubeImgContainer>
            <div {...getDriverRootProps()} style={dropzoneContainerStyles}>
              <input {...getDriverInputProps()} />
              {driverPicture && <img
                src={`data:image/png;base64,${driverPicture}`}
                alt="Foto conductor" 
                style={{ maxWidth: '100px' }} 
                />}
              <p>Frente</p>
              <Label>{props.driverPicture}: </Label>
              <br />
              {driverPictureError && (
                <Span>{driverPictureError}</Span>
              )}
            </div>
          </SubeImgContainer>
          </GrupoImg>

          <GrupoInput>
          <TituloSeccion><hr />Licencia de conducir</TituloSeccion>
          
          <InputContainer>
            <Input
              type="text"
              name={"driverLicenseNumber"}
              value={driverLicenseNumber}
              placeholder="a"
              onChange={handleChange}
              />
            <Label>{props.driverLicenseNumber}: </Label>
            <br />
            {driverLicenseNumberError && (
              <Span>{driverLicenseNumberError}</Span>
            )}
          </InputContainer>
          </GrupoInput>

          <GrupoSelect>
          <SelectContainer>
            {/* <label>{props.stateLicense}: </label> */}
            <Select
              disabled={driverLicenseNumber ? false : true}
              name={"stateLicense"}
              value={stateLicense}
              onChange={handleChange}
            >
              <option>Estatus Licencia</option>
              {estados.length >= 1 && estados.map((estado, idx) => {
                return (
                  <option key={idx} value={estado}>
                    {estado}
                  </option>
                );
              })}
            </Select>
            {/* <br /> */}
            {stateLicenseError && (
              <Span>{stateLicenseError}</Span>
            )}
          </SelectContainer>

          <SelectContainer>
            {/* <label>{props.typeLicense}: </label> */}
            <Select
              disabled={driverLicenseNumber ? false : true}
              name={"typeLicense"}
              value={typeLicense}
              onChange={handleChange}
            >
              <option>Tipo de licencia</option>
              {licences.length >= 1 && licences.map((licencia, idx) => {
                return (
                  <option key={idx} value={licencia}>
                    {licencia}
                  </option>
                );
              })}
            </Select>
            {/* <br /> */}
            {typeLicenseError && (
              <Span>{typeLicenseError}</Span>
            )}
          </SelectContainer>
          </GrupoSelect>
          
            <GrupoInput>
              <InputContainer>
                <Input
                  disabled={driverLicenseNumber ? false : true}
                  type="date"
                  name={"dateLicense"}
                  value={dateLicense}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>{props.dateLicense}: </Label>
                {dateLicenseError && (
                  <SpanData>{dateLicenseError}</SpanData>
                )}
              </InputContainer>

              <TituloSeccion><hr />Foto de Licencia (Ambos lados)</TituloSeccion>
              {/* <SubeImgContainer> */}
              <SubeImgContainer style={pictureLicence}>
                {/* <label>Fotos licencia: </label> */}
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
                    <SubeContainerImg {...getFrontLicenseRootProps()} style={dropzoneContainerStyles} >
                      <ImgSube {...getFrontLicenseInputProps()} />
                      {frontLicensePicture && <img
                        src={`data:image/png;base64,${frontLicensePicture}`}
                        alt="Foto conductor"
                        style={{ maxWidth: '100px' }}
                      />}
                      Frente
                      {frontLicensePictureError && (
                        <Span>{frontLicensePictureError}</Span>
                      )}
                    </SubeContainerImg>
                    <SubeContainerImg {...getBackLicenseRootProps()} style={dropzoneContainerStyles} >
                      <ImgSube {...getBackLicenseInputProps()} />
                      {backLicensePicture && <img
                        src={`data:image/png;base64,${backLicensePicture}`}
                        alt="Foto conductor"
                        style={{ maxWidth: '100px' }}
                      />}
                      Atrás
                      {backLicensePictureError && (
                        <Span>{backLicensePictureError}</Span>
                      )}
                    </SubeContainerImg>
                  </>
                )}

              </SubeImgContainer>
            </GrupoInput>

            
              <TituloSeccion><hr />Ajustes en la aplicación</TituloSeccion>
              <GrupoCheck>
              <LabelCheck>{props.services}: </LabelCheck>
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
                {servicesError && (
                  <Span>{servicesError}</Span>
                )}

          <GrupoInputV1>
          <TituloSeccion><hr />Acceso a la aplicación</TituloSeccion>
          <InputContainerV1>
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
              <Span>{passwordError}</Span>
            )}
          </InputContainerV1>

          <InputContainerV1>
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
              <Span>{repeatPasswordError}</Span>
            )}
          </InputContainerV1>
          </GrupoInputV1>
          
          <GrupoCheck>
           <CheckContainer> 
            <LabelCheck>{props.isActive}: </LabelCheck>
            <InputCheckV1
              type="checkbox"
              name={"isActive"}
              checked={isActive === 1}
              onChange={handleCheckboxChange}
            />
            <br />
            {isActiveError && (
              <Span>{isActiveError}</Span>
            )}
          </CheckContainer>
          </GrupoCheck>
          
            <GrupoInput>
              <TextareaContainer>
                <Textarea
                  type="text"
                  name={"messageReasonInActive"}
                  value={messageReasonInActive}
                  placeholder="a"
                  maxLength={100}
                  disabled={isActive === 1}
                  onChange={handleChange}
                />
                <Label>{props.messageReasonInActive}: </Label>
              </TextareaContainer>
              {messageReasonInActiveError && (
                <Span>{messageReasonInActiveError}</Span>
              )}
            </GrupoInput>
            <br/>
            <br/>
        
        </ContainerScroll>
          <ButtonContainer>
            <SubmitBtn type="submit">Guardar</SubmitBtn>
            <SubmitBtn onClick={() => {
              setModalIsOpen(false), 
              closeModal()
            }}>Cancelar</SubmitBtn>
          </ButtonContainer>
          </FormEdit>
      </ContainerModal>
    </>
  );
};
