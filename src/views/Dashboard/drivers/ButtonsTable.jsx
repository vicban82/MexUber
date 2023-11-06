import React, { useCallback, useEffect, useMemo, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import {
  validateDriver,
  validateUpDateDriver,
} from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import {
  axiosDetailDriver,
  axiosGetDrivers,
  axiosPostDriver,
  axiosPutDriver,
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
} from "../../../components/reusable/FormularioModal";
import { Detail } from "./Detail";
import { loadImage } from "./loadImages";
/* import { errorUpDate, successUpDate } from "../../../tools/driverAlerts/upDate"; */

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
  width: "50%", // Establece el ancho del contenedor
  //height: '200px', // Establece la altura del contenedor
  border: "2px dashed #700202",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const pictureLicence = {
  display: "flex",
};

const Img = styled.img`
  height: 32px;
  border-radius: 5px;
  size: 5px;
  transition: border-radius 0.5s;
  &:hover {
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
  const [fotoConductor, setFotoConductor] = useState(null);
  // console.log("detailDriver:", detailDriver)
  const [fotoFront, setFotoFront] = useState(null);
  const [fotoBack, setFotoBack] = useState(null);

  useEffect(() => {
    // console.log("id:", id)
    setUpdateForm({
      name: detailDriver.name || "",
      lastName: detailDriver.lastName || "",
      zipCode: detailDriver.zipCode || "", // CODIGO POSTAL
      state: detailDriver.state || "", // ESTADO DE MEXICO
      city: detailDriver.city || "",
      colonia: detailDriver.colonia || "",
      address: detailDriver.address || "",
      contact: detailDriver.contact || "", // NUMERO DE CONTACTO DEL CONDUCTOR
      email: detailDriver.email || "",
      driverPicture: detailDriver.driverPicture || "", //? FOTO DEL CONDUCTOR
      //! DATOS DE LA LICENCIA DE CONDUCCION
      driverLicenseNumber: detailDriver.driverLicenseNumber || "", //* NUMERO LICENCIA DEL CONDUCTOR
      stateLicense: detailDriver.stateLicense || "", // ESTADO DE LA LICENCIA
      typeLicense: detailDriver.typeLicense || "", // TIPO LICENCIA
      dateLicense: detailDriver.dateLicense || "", // FECHA - VIGENCIA DE LA LICENCIA
      frontLicensePicture: detailDriver.frontLicensePicture || "", //? FOTO FRONTAL DE LA LICENCIA
      backLicensePicture: detailDriver.backLicensePicture || "", //? FOTO REVERSO DE LA LICENCIA
      //! DATOS DE LA LICENCIA DE CONDUCCION
      //! AJUSTES DE LA APLICACION
      allServices: detailDriver.allServices || 1, // TODOS
      servicesLGBQT: detailDriver.servicesLGBQT || 0, // LGBQT+
      onlyWomenServices: detailDriver.onlyWomenServices || 0, // MUJERES
      //! AJUSTES DE LA APLICACION
      //! ACCESO A LA APLICACION
      password: "",
      repeatPassword: "",
      isActive: detailDriver.isActive || 1,
      messageReasonInActive: detailDriver.messageReasonInActive || "", // MENSAJE RASON INACTIVO
      //! ACCESO A LA APLICACION
      car: detailDriver.car || null,
      //! NO SE VALIDAN
      tokenNotification: detailDriver.tokenNotification || "",
      typePhone: detailDriver.typePhone || "",
      //! NO SE VALIDAN
    });
  }, [detailDriver]);

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

  const [upDateForm, setUpdateForm] = useState({
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
  // console.log("update driver:", upDateForm);

  useEffect(() => {
    // Con este codigo pre-visualizo las imagenes guardadas
    if (
      detailDriver.driverPicture ||
      (detailDriver.frontLicensePicture && detailDriver.backLicensePicture)
    ) {
      loadImage(detailDriver, setFotoConductor, setFotoFront, setFotoBack);
    }
  }, [detailDriver.driverPicture, detailDriver.frontLicensePicture, detailDriver.backLicensePicture]);

  const memorySepomes = useMemo(() => sepomex, [sepomex]);
  const memoryLicencias = useMemo(() => licencias, [licencias]);

  /* const prevColonias = memorySepomes.find((el) => el.ciudad === upDateForm?.city) eliminado*/

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
          setSelectCiudad(findCity);
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
          setSelectColonias(findColonia);
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

    setUpdateForm({
      ...upDateForm,
      [name]: value,
    });
    setErrorForm(
      validateUpDateDriver(
        {
          ...upDateForm,
          [name]: value,
        },
        selectImage
      )
    );
  }

  useEffect(() => {
    // SE RESETEAN LOS SIGUIENTES CAMPOS
    let updatedDriver = { ...upDateForm };
    if (upDateForm.zipCode.length <= 4) {
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
      };
    }
    if (upDateForm.driverLicenseNumber.length <= 4) {
      updatedDriver = {
        ...updatedDriver,
        stateLicense: "",
        typeLicense: "",
        dateLicense: "",
        frontLicensePicture: "",
        backLicensePicture: "",
      };
    }

    setUpdateForm(updatedDriver);
  }, [detailDriver.zipCode, detailDriver.driverLicenseNumber]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let updatedDriver = { ...upDateForm };

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

    setUpdateForm(updatedDriver);
  };

  useEffect(() => {
    // Actualizar los valores del formulario cuando estado o ciudad cambien
    if (estado || ciudad) {
      // ACTUALIZAMOS EL FORMULARIO CON LOS CAMPOS QUE SE AUTOCOMPLETAN
      setUpdateForm((prevState) => ({
        ...prevState,
        state: estado,
        city: ciudad,
      }));
    }
  }, [estado, ciudad]);

  useEffect(() => {
    // Este codigo permite la sincronización de los mensajes de las imagenes
    const validationErrors = validateUpDateDriver(upDateForm, selectImage);
    setErrorForm(validationErrors);
  }, [upDateForm]);

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
      setUpdateForm((prevState) => ({
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      upDateForm.name ||
      upDateForm.lastName ||
      upDateForm.zipCode ||
      upDateForm.state ||
      upDateForm.city ||
      upDateForm.colonia ||
      upDateForm.address ||
      upDateForm.contact ||
      upDateForm.email ||
      upDateForm.allServices === 1 ||
      upDateForm.servicesLGBQT === 1 ||
      upDateForm.onlyWomenServices === 1
    ) {
      if (passwordError && repeatPasswordError) {
        errorRegister(upDateForm, errorForm);
      } else if (
        driverPictureError ||
        (frontLicensePictureError && backLicensePictureError)
      ) {
        errorRegister(upDateForm, errorForm);
      } else if (
        stateLicenseError ||
        typeLicenseError ||
        dateLicenseError ||
        frontLicensePictureError ||
        backLicensePictureError
      ) {
        errorRegister(upDateForm, errorForm);
      } else if (messageReasonInActiveError) {
        errorRegister(upDateForm, errorForm);
      } else {
        try {
          successRegister(upDateForm);
          const currentDriver = await axiosPutDriver(id, upDateForm, headers);

          // Actualiza la lista en el frontend
          setTDriver((prev) => {
            // Reemplaza el upDateForm editado en la lista por el nuevo upDateForm devuelto por el backend
            const updatedTDrivers = prev.map((item) =>
              item._id === id ? currentDriver : item
            );
            return updatedTDrivers;
          });

          // Cierra el modal después de guardar
          setModalIsOpen(false);

          // Establece la página en 1 después de agregar un elemento
          // setPage(1);
        } catch (error) {
          console.error("Error al modificar el conductor:", error);
        }
      }
    } else {
      errorRegister(upDateForm, errorForm);
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
                    value={upDateForm.name}
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
                    value={upDateForm.lastName}
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
                    value={upDateForm.zipCode}
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
                      value={upDateForm.state}
                      onChange={handleChange}
                    >
                      <option>
                        {!estado ? detailDriver.state : estado || "Selecciona"}
                      </option>
                    </Select>
                    <Label>*Estado: </Label>
                    {stateError && <Span>{stateError}</Span>}
                  </SelectContainer>
                ) : (
                  <SelectContainer>
                    <Select
                      disabled={upDateForm.zipCode.length <= 4 ? true : false}
                      name={"state"}
                      value={upDateForm.state}
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
                      value={upDateForm.city}
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
                      disabled={upDateForm.zipCode.length <= 4 ? true : false}
                      name={"city"}
                      value={upDateForm.city}
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
                      disabled={!upDateForm.city ? true : false}
                      name={"colonia"}
                      value={upDateForm.colonia}
                      onChange={handleChange}
                    >
                      <option>{detailDriver.colonia || "Selecciona"}</option>
                      {colonias.length >= 1 &&
                        colonias.map((colonia, idx) => {
                          return <option key={idx}>{colonia}</option>;
                        })}
                    </Select>
                    <Label>*Colonia: </Label>
                    {coloniaError && <Span>{coloniaError}</Span>}
                  </SelectContainer>
                ) : (
                  <SelectContainer>
                    <Select
                      disabled={!upDateForm.city ? true : false}
                      name={"colonia"}
                      value={upDateForm.colonia}
                      onChange={handleChange}
                    >
                      <option>{detailDriver.colonia || "Selecciona"}</option>
                      {selectColonias.length >= 1 &&
                        selectColonias.map((colonia, idx) => {
                          return <option key={idx}>{colonia}</option>;
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
                    value={upDateForm.address}
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
                    value={upDateForm.contact}
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
                    value={upDateForm.email}
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
                    {upDateForm.driverPicture && (
                      <img
                        src={fotoConductor}
                        alt="Foto conductor"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                    <p>Frente</p>
                    <br />
                    {driverPictureError && <Span>{driverPictureError}</Span>}
                  </div>
                  {/* <img
                    src={fotoConductor}
                    alt="Foto conductor"
                    style={{ maxWidth: "100px" }}
                  /> */}
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
                    value={upDateForm.driverLicenseNumber}
                    onChange={handleChange}
                  />
                  <Label>Número de licencia: </Label>
                  <br />
                  {driverLicenseNumberError && (
                    <Span>{driverLicenseNumberError}</Span>
                  )}
                </InputContainer>
              </GrupoInput>

              {!upDateForm.driverLicenseNumber ? null : (
                <>
                  <GrupoSelect>
                    <SelectContainer>
                      <Select
                        disabled={upDateForm.driverLicenseNumber ? false : true}
                        name={"stateLicense"}
                        value={upDateForm.stateLicense}
                        onChange={handleChange}
                      >
                        <option>
                          {detailDriver.stateLicense ||
                            "*Estato de la Licencia"}
                        </option>
                        {estados.length >= 1 &&
                          estados.map((estado, idx) => {
                            return (
                              <option key={idx} value={upDateForm.estado}>
                                {estado}
                              </option>
                            );
                          })}
                      </Select>
                      {stateLicenseError && <Span>{stateLicenseError}</Span>}
                    </SelectContainer>
                    <SelectContainer>
                      <Select
                        disabled={upDateForm.driverLicenseNumber ? false : true}
                        name={"typeLicense"}
                        value={upDateForm.typeLicense}
                        onChange={handleChange}
                      >
                        <option>
                          {detailDriver.typeLicense || "*Tipo de licencia"}
                        </option>
                        {licences.length >= 1 &&
                          licences.map((licencia, idx) => {
                            return (
                              <option key={idx} value={upDateForm.licencia}>
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
                        disabled={upDateForm.driverLicenseNumber ? false : true}
                        type="date"
                        name={"dateLicense"}
                        value={upDateForm.dateLicense}
                        onChange={handleChange}
                      />
                      <Label>*Vigencia de licencia</Label>
                      {dateLicenseError && (
                        <SpanData>{dateLicenseError}</SpanData>
                      )}
                    </InputContainer>
                    <TituloSeccion>
                      <hr />
                      *Foto de Licencia (Ambos lados)
                    </TituloSeccion>
                    <SubeImgContainer style={pictureLicence}>
                      <br />
                      {/* {fotoFront === null && fotoBack === null ? (
                        <> */}
                          <SubeContainerImg
                            {...getFrontLicenseRootProps()}
                            style={dropzoneContainerStyles}
                          >
                            <ImgSube {...getFrontLicenseInputProps()} />
                            {upDateForm.frontLicensePicture && (
                              <img
                                src={`data:image/png;base64,${upDateForm.frontLicensePicture}`}
                                alt="Foto frontal de la licencia"
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
                            {upDateForm.backLicensePicture && (
                              <img
                                src={`data:image/png;base64,${upDateForm.backLicensePicture}`}
                                alt="Foto reverso de la licencia"
                                style={{ maxWidth: "100px" }}
                              />
                            )}
                            Atrás
                            {backLicensePictureError && (
                              <Span>{backLicensePictureError}</Span>
                            )}
                          </SubeContainerImg>
                      {/*   </> */}
                      {/* ) : (
                        <> */}
                          <SubeContainerImg
                            {...getFrontLicenseRootProps()}
                            style={dropzoneContainerStyles}
                          >
                            <ImgSube {...getFrontLicenseInputProps()} />
                            {![".jpg", ".jpeg", ".png"].some(el => upDateForm.frontLicensePicture.includes(el)) && (
                              <img
                                src={fotoFront}
                                alt="Foto frontal de la licencia"
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
                            {upDateForm.backLicensePicture && (
                              <img
                                src={fotoBack}
                                alt="Foto reverso de la licencia"
                                style={{ maxWidth: "100px" }}
                              />
                            )}
                            Atrás
                            {backLicensePictureError && (
                              <Span>{backLicensePictureError}</Span>
                            )}
                          </SubeContainerImg>
                     {/*    </> */}
                    {/*   )} */}
                    </SubeImgContainer>
                  </GrupoInput>
                </>
              )}

              <TituloSeccion>
                <hr />
                Ajustes en la aplicación
              </TituloSeccion>
              <GrupoCheck>
                <LabelCheck>Servicio para: </LabelCheck>
                <InputCheck
                  type="checkbox"
                  name="allServices"
                  checked={upDateForm.allServices === 1}
                  onChange={handleCheckboxChange}
                />
                Todos
                <InputCheck
                  type="checkbox"
                  name="servicesLGBQT"
                  checked={upDateForm.servicesLGBQT === 1}
                  disabled={upDateForm.allServices === 1 ? true : false}
                  onChange={handleCheckboxChange}
                />
                LGBTQ+
                <InputCheck
                  type="checkbox"
                  name="onlyWomenServices"
                  checked={upDateForm.onlyWomenServices === 1}
                  disabled={upDateForm.allServices === 1 ? true : false}
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
                    value={upDateForm.password}
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
                    value={upDateForm.repeatPassword}
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
                    checked={upDateForm.isActive === 1}
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
                    value={upDateForm.messageReasonInActive}
                    maxLength={100}
                    disabled={detailDriver.isActive === 1}
                    onChange={handleChange}
                  />
                  <Label>Motivo de bloqueo: </Label>
                </TextareaContainer>
                {messageReasonInActiveError && (
                  <Span>{messageReasonInActiveError}</Span>
                )}
              </GrupoInput>
              <br />
            </ContainerScroll>
            <ButtonContainer>
              <SubmitBtn type="submit">Guardar</SubmitBtn>
              <SubmitBtn
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
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
