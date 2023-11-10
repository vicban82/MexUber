import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { validateDriver } from "../../../validations/drivers";
import { headers } from "../../../tools/accessToken";
import {
  // axiosGetDrivers,
  axiosPostDriver,
} from "../../../hooks/drivers/crudDrivers";
import styled from "styled-components";
import {
  errorRegister,
  successRegister,
} from "../../../tools/driverAlerts/register";
import {
  axiosGetMarcas,
  axiosGetSepomex,
  axiosGetSubMarcas,
} from "../../../hooks/db/info";
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
import { axiosDetailDriver, axiosGetDrivers, obtenerAnios } from "./function";
import {colors} from "./colores"

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
  border: "2px dashed var(--border-dropzoneContainerStyles)",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const pictureLicence = {
  display: "flex",
};

export const ButtonAdd = ({
  tCar,
  setTCar,
  car,
  setCar,
  errorForm,
  setErrorForm,
  limit,
  setTotalPages,
  setPage,
}) => {
  const formCar = { ...car };
  const errorFormCar = { ...errorForm };
  console.log("formCar:", formCar)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  //* INFORMACION DEL VEHICULO
  const tipoDeVehiculo = [
    "Motocicleta", "Automovil",
  ];
  const [marcas, setMarca] = useState([]);
  const [subMarcas, setSubMarca] = useState([]);
  const [selectSubMarcas, setSelectSubMarca] = useState([]);
  const modelo = obtenerAnios();
  //* INFORMACION DEL VEHICULO
  
  //* TARJETA DE CIRCULACION
  const [selectImage, setSelectImage] = useState({});
  //* TARJETA DE CIRCULACION
  
  //* RELACION CONDUCTOR
  const [conductores, setCondurtores] = useState([]);
  // console.log("conductores:", conductores)
  const [detailDriver, setDetailDriver] = useState({});
  // console.log("detailDriver:", detailDriver)
  const [value, setValue] = useState("");
  // console.log("value:", value)
  const [name, setName] = useState("");
  //* RELACION CONDUCTOR

  //* INFORMACION DEL CONDUCTOR
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  // console.log("apellido:", apellido)
  const [codigoPostal, setCodigoPostal] = useState("");
  // console.log("codigoPostal:", codigoPostal)
  const [estado, setEstado] = useState("");
  // console.log("estado:", estado)
  const [selectEstado, setSelectEstado] = useState([]);
  const [ciudad, setCiudad] = useState("");
  // console.log("selectColonia:", selectColonia)
  const [selectCiudad, setSelectCiudad] = useState([]);
  const [colonia, setColonia] = useState("");
  const [selectColonia, setSelectColonia] = useState([]);
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  //* INFORMACION DEL CONDUCTOR
  
  //* INFO DB
  const [sepomex, setSepomex] = useState([]);
  // console.log("sepomex:", sepomex)
  //* INFO DB

  // * ------------ ESTADOS ------------
  const byState = [...new Set(sepomex.map((el) => el.estado))];
  // console.log("byState:", byState)

  // * ------------ CIUDADES ------------
  const filterByState = sepomex.filter((el) => {
    if (el.estado === formCar.state) {
      return el.ciudad;
    }
  });
  // console.log("formCar - zipCode:", formCar.zipCode)
  
  const byCity = [...new Set(filterByState.map((el) => el.ciudad))]
  // console.log("byCity:", byCity)

  // * ------------ COLONIAS ------------
  const filterByCity = sepomex.filter((el) => {
    if (el.ciudad === formCar.city) {
      return el.colonias;
    }
  });
  const byColonia = [...new Set(filterByCity.map((el) => el.colonias))].flat(1);
  // console.log("byColonia:", byColonia)

  function handleChange(e) {
    const { name, value, type, } = e.target;
    // console.log("name:", name)
    // console.log("value:", value)
    
    if (name === "make") {
      const findById = marcas.find(el => {
        if (el.marca === value) {
          return el.marcaId;
        }
      })
      const filterSubMarcas = subMarcas.filter(el => el.idMarca === findById.marcaId);
      setSelectSubMarca(filterSubMarcas)
    }
    if (name === "driver") {
      // console.log("value:", value)
      setValue(value)
    }
    
    if (type === 'radio') {
      setCar((prevCar) => ({
        ...prevCar,
        [name]: parseInt(value, 10),
      }));
    } else {
      setCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    }

    if (
      name === "zipCode" ||
      name === "state" ||
      name === "city" ||
      name === "colonia"
    ) {
      const sepomexData = sepomex.find((el) => el.codigoPostal === value);

      if (sepomexData) {
        setCodigoPostal(sepomexData.codigoPostal);
        setEstado(sepomexData.estado);
        setCiudad(sepomexData.ciudad);
        setSelectColonia(sepomexData.colonias);
      } else {
        // Seteo todos los value del combo "zipCode"
        // console.log("value:", value)
        setValue(value)
        setName(name)
      }
      //* SE GUARDA EL "ESTADO" Y LA "CIUDAD" SI EL CP EXISTE EN LA DB
      if (codigoPostal) {
        setCar((prevState) => ({
          ...prevState,
          state: estado,
          city: ciudad,
        }))
      }
    }

    // setCar({
    //   ...car,
    //   [name]: value,
    // });
    // setErrorForm(
    //   validateDriver(
    //     {
    //       ...car,
    //       [name]: value,
    //     },
    //   )
    // );
  }

  useEffect(() => {
    // Este codigo me sirve para autocompletar todos los campos en relacion al conductor
    if (nombre || apellido || codigoPostal || estado || ciudad || selectColonia || domicilio || telefono || email) {
      setCar((prevState) => ({
        ...prevState,
        name: nombre,
        lastName: apellido,
        zipCode: codigoPostal,
        state: estado,
        city: ciudad,
        colonia: selectColonia,
        address: domicilio,
        contact: telefono,
        email: email,
      }))
    }
  }, [nombre, apellido, codigoPostal, estado, ciudad, selectColonia, domicilio, telefono, email]);

  useEffect(() => {
    axiosGetMarcas(setMarca);
    axiosGetSubMarcas(setSubMarca);
    axiosGetDrivers(setCondurtores, headers);
    axiosGetSepomex(setSepomex);
    const findById = conductores.find(el => el._id === value)
    // console.log("id:", findById?._id)
    if (findById) {
      axiosDetailDriver(findById._id, setDetailDriver, headers)
    } 
  }, [value]);

  useEffect(() => {
    // Este codigo me sirve para autocompleta o resetear la seccion de propietario
    let updateFormCar = { ...formCar }
    if (formCar.driverIsOwner === 1) {
      // console.log("formCar.driverIsOwner:", formCar.driverIsOwner)
      setNombre(detailDriver.name)
      setApellido(detailDriver.lastName)
      setCodigoPostal(detailDriver.zipCode)
      setEstado(detailDriver.state)
      setCiudad(detailDriver.city)
      setColonia(detailDriver.colonia)
      setDomicilio(detailDriver.address)
      setTelefono(detailDriver.contact)
      setEmail(detailDriver.email)
    } else {
      // console.log("formCar.driverIsOwner:", formCar.driverIsOwner)
      setNombre("")
      setApellido("")
      setCodigoPostal("")
      setEstado("")
      setCiudad("")
      setColonia("")
      setDomicilio("")
      setTelefono("")
      setEmail("")
      updateFormCar = {
        ...car,
        name: "",
        lastName: "",
        zipCode: "",
        state: "",
        city: "",
        colonia: "",
        address: "",
        contact: "",
        email: "",
      };
    }
    setCar(updateFormCar)
  }, [formCar.driverIsOwner]);

  useEffect(() => {
    // Este codigo resetea los ultimos campos si se cambia de conductor
    let updateFormCar = { ...formCar }
    setNombre("")
    setApellido("")
    setCodigoPostal("")
    setEstado("")
    setCiudad("")
    setColonia("")
    setDomicilio("")
    setTelefono("")
    setEmail("")
    updateFormCar = {
      ...car,
      driverIsOwner: 0,
      name: "",
      lastName: "",
      zipCode: "",
      state: "",
      city: "",
      colonia: "",
      address: "",
      contact: "",
      email: "",
    };
    setCar(updateFormCar)
  }, [formCar.driver]);

  useEffect(() => {
    let updateFormCar = { ...formCar }
    if (formCar.zipCode.length <= 4) {
      // SE RESETEAN LOS CAMPOS AL CAMBIAR DE CODIGO POSTAL
      setCodigoPostal("")
      setEstado("");
      setCiudad("");
      setColonia("");
      updateFormCar = {
        ...updateFormCar,
        state: "",
        city: "",
        colonia: "",
      }
    }
    if (name === "state") {
      // SE RESETEAN LOS CAMPOS SI CAMBIA DE ESTADO
      updateFormCar = {
        ...updateFormCar,
        city: "",
        colonia: "",
      }
    }
    if (name === "city") {
      // SE RESETEAN LOS CAMPOS SI CAMBIA DE CIUDAD
      updateFormCar = {
        ...updateFormCar,
        colonia: "",
      }
    }
    setCar(updateFormCar)
  }, [formCar.zipCode, formCar.state, formCar.city]);

  const onFrontImageTrafficDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "frontImageTraffic");
  };

  const onBackImageTrafficDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    convertAndSetImage(file, "backImageTraffic");
  };

  const convertAndSetImage = (file, fieldName) => {
    console.log("file:", file);
    setSelectImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      setCar((prevState) => ({
        ...prevState,
        [fieldName]: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const {
    getRootProps: getFrontImageRootProps,
    getInputProps: getFrontImageInputProps,
  } = useDropzone({
    onDrop: onFrontImageTrafficDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  const {
    getRootProps: getBackImageRootProps,
    getInputProps: getBackImageInputProps,
  } = useDropzone({
    onDrop: onBackImageTrafficDrop,
    // FORMATOS DE IMAGEN PERMITIDA
    accept: {
      "image/*": [".jpg", ".png"],
    },
    maxFiles: 1, // ARCHIVOS PERMITIDOS
  });

  function closeModal() {
    setCar({
      name: "", // Nombre del propietario
      lastName: "", // Apellido del propietario
      address: "", // Dirección del propietario
      city: "", // Ciudad del propietario
      state: "", // Estado del propietario
      zipCode: "", // Código postal del propietario
      contact: "", // Telefono del propietario
      email: "", // Correo electrónico del propietario

      make: "", // MARCA DEL VEHICULO
      subMake: "", // SUB-MARCA DEL VEHICULO
      model: "",
      colors: "",
      plates: "", // PLACAS DEL VEHICULO
      numberMotor: "", // NUMERO DE MOTOR
      trafficCardNumber: "", // NUMERO TARGETA DE CIRCULACION
      frontImageTraffic: "", // Imagen de la tarjeta de circulación de frente
      backImageTraffic: "", // Imagen de la tarjeta de circulación por atrás
      driver: "" || null, //* RELACION CONDUCTOR
      driverIsOwner: "", // Chofer es el propietario
      owner: "" || null, //* RELACION CHOFER
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      formCar.make &&
      formCar.subMake &&
      formCar.model &&
      formCar.colors &&
      formCar.plates &&
      formCar.numberMotor &&
      formCar.trafficCardNumber &&
      formCar.frontImageTraffic &&
      formCar.backImageTraffic &&
      formCar.driver &&
      formCar.driverIsOwner &&
      formCar.owner
    ) {
      if (
        // stateLicenseError ||
        // typeLicenseError ||
        // dateLicenseError ||
        // frontLicensePictureError ||
        errorFormCar.backLicensePictureError
      ) {
        errorRegister(driver, errorForm);
      } else {
        try {
          successRegister(driver);
          const newDriver = await axiosPostDriver(driver, headers);
          setTDriver([...tDriver, newDriver]);

          // await axiosGetDrivers(setTDriver, setTotalPages, headers, 1, limit);

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
            <TituloSeccion>
              {/* Tarjeta de circulacion */}
              Datos del Vehiculo
              <hr />
              Datos del Vehiculo
            </TituloSeccion>

            <GrupoSelect>

              <SelectContainer>
                <Select
                  name={"typeOfVehicle"}
                  value={formCar.typeOfVehicle}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {tipoDeVehiculo.map((el, idx) => {
                    return <option key={idx}>{el}</option>;
                  })}
                </Select>
                <Label>*Tipo de vehículo: </Label>
                {errorFormCar.typeOfVehicle && <Span>{errorFormCar.typeOfVehicle}</Span>}
              </SelectContainer>

              <SelectContainer>
                <Select
                  name={"make"}
                  value={formCar.make}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {marcas.length &&
                    marcas.map((el, idx) => {
                      return <option key={idx}>{el.marca}</option>;
                    })}
                </Select>
                <Label>*Marca: </Label>
                {errorFormCar.make && <Span>{errorFormCar.make}</Span>}
              </SelectContainer>

              <SelectContainer>
                <Select
                  name={"subMake"}
                  value={formCar.subMake}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {selectSubMarcas.length &&
                    selectSubMarcas.map((el, idx) => {
                      return <option key={idx}>{el.subMarca}</option>;
                    })}
                </Select>
                <Label>*Sub-Marca: </Label>
                {errorFormCar.subMake && <Span>{errorFormCar.subMake}</Span>}
              </SelectContainer>

              <SelectContainer>
                <Select
                  name={"model"}
                  value={formCar.model}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {modelo.length &&
                    modelo.map((mol, idx) => {
                      return <option key={idx}>{mol}</option>;
                    })}
                </Select>
                <Label>*Modelo: </Label>
                {errorFormCar.model && <Span>{errorFormCar.model}</Span>}
              </SelectContainer>

              <SelectContainer>
                <Select
                  name={"color"}
                  value={formCar.color}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {colors.length &&
                    colors.map((el, idx) => {
                      return <option key={idx}>{el.descripcion}</option>;
                    })}
                </Select>
                <Label>*Color: </Label>
                {errorFormCar.color && <Span>{errorFormCar.color}</Span>}
              </SelectContainer>
            </GrupoSelect>

            <GrupoInput>
              {/* Placa y Motor */}
              <InputContainer>
                {/* placa */}
                <Input
                  color={"transparent"}
                  type="text"
                  name={"plates"}
                  value={formCar.plates}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Placa: </Label>
                <br />
                {errorFormCar.plates && <Span>{errorFormCar.plates}</Span>}
              </InputContainer>
              <InputContainer>
                {/* motor */}
                <Input
                  color={"transparent"}
                  type="text"
                  name={"numberMotor"}
                  value={formCar.numberMotor}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Número Motor: </Label>
                <br />
                {errorFormCar.numberMotor && (
                  <Span>{errorFormCar.numberMotor}</Span>
                )}
              </InputContainer>
            </GrupoInput>

            <TituloSeccion>
              {/* Tarjeta de circulacion */}
              <hr />
              Tarjeta de circulacion
            </TituloSeccion>

            <GrupoInput>
              <InputContainer>
                {/* Número de Tarjeta */}
                <Input
                  color={"transparent"}
                  type="text"
                  name={"trafficCardNumber"}
                  value={formCar.trafficCardNumber}
                  placeholder="a"
                  onChange={handleChange}
                />
                <Label>*Número de Tarjeta: </Label>
                <br />
                {errorFormCar.trafficCardNumber && (
                  <Span>{errorFormCar.trafficCardNumber}</Span>
                )}
              </InputContainer>
            </GrupoInput>

            <SubeImgContainer style={pictureLicence}>
              {/* Img delante y Atras */}
              <br />
              <SubeContainerImg
                {...getFrontImageRootProps()}
                style={dropzoneContainerStyles}
              >
                <ImgSube {...getFrontImageInputProps()} />
                {formCar.frontImageTraffic && (
                  <img
                    src={`data:image/png;base64,${formCar.frontImageTraffic}`}
                    alt="Foto conductor"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                Frente
                {errorFormCar.frontImageTraffic && (
                  <Span>{errorFormCar.frontImageTraffic}</Span>
                )}
              </SubeContainerImg>
              <SubeContainerImg
                {...getBackImageRootProps()}
                style={dropzoneContainerStyles}
              >
                <ImgSube {...getBackImageInputProps()} />
                {formCar.backImageTraffic && (
                  <img
                    src={`data:image/png;base64,${formCar.backImageTraffic}`}
                    alt="Foto conductor"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                Atrás
                {errorFormCar.backImageTraffic && (
                  <Span>{errorFormCar.backImageTraffic}</Span>
                )}
              </SubeContainerImg>
            </SubeImgContainer>

            <TituloSeccion>
              {/* Conductor */}
              <hr />
              Conductor
            </TituloSeccion>

            <GrupoSelect>
              {/* Conductor Asignado */}
              <SelectContainer>
                <Select
                  name={"driver"}
                  // value={formCar.driver}
                  onChange={handleChange}
                >
                  <option>Selecciona</option>
                  {conductores.length &&
                    conductores.map((conductor, idx) => {
                      return <option key={idx} value={conductor._id}>{`${conductor.name} ${conductor.lastName}`}</option>;
                    })}
                </Select>
                <Label>*Conductor Asignado: </Label>
                {errorFormCar.driver && <Span>{errorFormCar.driver}</Span>}
              </SelectContainer>
            </GrupoSelect>

            <GrupoCheck>
              {/* Es el propietario? */}
              <label>Es el propietario?</label>
              <InputCheck
                type="radio"
                name="driverIsOwner"
                value={"1"}
                checked={formCar.driverIsOwner === 1}
                onChange={handleChange}
              />
              SI
              <InputCheck
                type="radio"
                name="driverIsOwner"
                value={"0"}
                checked={formCar.driverIsOwner === 0}
                onChange={handleChange}
              />
              NO
            </GrupoCheck>
            {errorFormCar.driverIsOwner && (
              <Span>{errorFormCar.driverIsOwner}</Span>
            )}

            <TituloSeccion>
              {/* Propietario */}
              <hr />
              Propietario
            </TituloSeccion>

            {formCar.driverIsOwner === 1 ? (
              <>
                <GrupoInput>
                  {/* Propietario */}
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"name"}
                      value={formCar.name}
                      placeholder="a"
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{"*Nombre(s): "}</Label>
                    <br />
                    {errorFormCar.name && <Span>{errorFormCar.name}</Span>}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"lastName"}
                      placeholder="a"
                      value={formCar.lastName}
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{"*Apellidos: "}</Label>
                    <br />
                    {errorFormCar.lastName && (
                      <Span>{errorFormCar.lastName}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"zipCode"}
                      placeholder="a"
                      value={formCar.zipCode}
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{`*Código postal: `}</Label>
                    <br />
                    {errorFormCar.zipCode && (
                      <Span>{errorFormCar.zipCode}</Span>
                    )}
                  </InputContainer>
                </GrupoInput>
                <GrupoSelect>
                  {/* Estado, Ciudad y Colonia */}
                    <SelectContainer>
                      <Select
                        disabled={true}
                        name={"state"}
                        value={formCar.state}
                        onChange={handleChange}
                      >
                        <option>{estado || "Selecciona"}</option>
                      </Select>
                      <Label>*Estado: </Label>
                      {errorFormCar.state && <Span>{errorFormCar.state}</Span>}
                    </SelectContainer>

                      <SelectContainer>
                        <Select
                          disabled={true}
                          name={"city"}
                          value={formCar.city}
                          onChange={handleChange}
                        >
                          <option>{ciudad || "Selecciona"}</option>
                        </Select>
                        <Label>*Ciudad: </Label>
                        {errorFormCar.city && <Span>{errorFormCar.city}</Span>}
                      </SelectContainer>

                  <SelectContainer>
                    <Select
                      disabled={true}
                      name={"colonia"}
                      value={formCar.colonia}
                      onChange={handleChange}
                    >
                      <option>{colonia || "Selecciona"}</option>
                    </Select>
                    <Label>*Colonia: </Label>
                    {errorFormCar.colonia && (
                      <Span>{errorFormCar.colonia}</Span>
                    )}
                  </SelectContainer>
                </GrupoSelect>

                <GrupoInput>
                  {/* Domicilio, Telefono y Email */}
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"address"}
                      placeholder="a"
                      value={formCar.address}
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{"*Domicilio: "}</Label>
                    <br />
                    {errorFormCar.address && (
                      <Span>{errorFormCar.address}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"contact"}
                      value={formCar.contact}
                      placeholder="a"
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{"*Teléfono (Móvil): "}</Label>
                    <br />
                    {errorFormCar.contact && (
                      <Span>{errorFormCar.contact}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"email"}
                      value={formCar.email}
                      placeholder="a"
                      onChange={handleChange}
                      disabled={true}
                    />
                    <Label>{"*Correo electrónico: "}</Label>
                    <br />
                    {errorFormCar.email && <Span>{errorFormCar.email}</Span>}
                  </InputContainer>
                </GrupoInput>
              </>
            ) : (
              <>
                <GrupoInput>
                  {/* Propietario */}
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"name"}
                      value={formCar.name}
                      placeholder="a"
                      onChange={handleChange}
                    />
                    <Label>{nombre || "*Nombre(s): "}</Label>
                    <br />
                    {errorFormCar.name && <Span>{errorFormCar.name}</Span>}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"lastName"}
                      placeholder="a"
                      value={formCar.lastName}
                      onChange={handleChange}
                    />
                    <Label>{"*Apellidos: "}</Label>
                    <br />
                    {errorFormCar.lastName && (
                      <Span>{errorFormCar.lastName}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"zipCode"}
                      placeholder="a"
                      value={formCar.zipCode}
                      onChange={handleChange}
                    />
                    <Label>{`*Código postal: `}</Label>
                    <br />
                    {errorFormCar.zipCode && (
                      <Span>{errorFormCar.zipCode}</Span>
                    )}
                  </InputContainer>
                </GrupoInput>

                {!codigoPostal ? (
                  <GrupoSelect>
                    {/* Estado, Ciudad y Colonia */}
                      <SelectContainer>
                        <Select
                          disabled={formCar.zipCode.length <= 4 ? true : false}
                          name={"state"}
                          value={formCar.state}
                          onChange={handleChange}
                        >
                          <option>Selecciona</option>
                          {byState.length && byState.map((est, idx) => {
                            return <option key={idx}>{est}</option>;
                          })}
                        </Select>
                        <Label>*Estado: </Label>
                        {errorFormCar.state && <Span>{errorFormCar.state}</Span>}
                      </SelectContainer>

                      <SelectContainer>
                        <Select
                          disabled={!formCar.state ? true : false}
                          name={"city"}
                          value={formCar.city}
                          onChange={handleChange}
                        >
                          <option>Selecciona</option>
                          {byCity.length && byCity.map((cit, idx) => {
                            return <option key={idx}>{cit}</option>;
                          })}
                        </Select>
                        <Label>*Ciudad: </Label>
                        {errorFormCar.city && <Span>{errorFormCar.city}</Span>}
                      </SelectContainer>

                    <SelectContainer>
                      <Select
                        disabled={!formCar.city ? true : false}
                        name={"colonia"}
                        value={formCar.colonia}
                        onChange={handleChange}
                      >
                        <option>Selecciona</option>
                        {byColonia.length >= 1 &&
                          byColonia.map((colonia, idx) => {
                            return (
                              <option key={idx} value={colonia}>
                                {colonia}
                              </option>
                            );
                          })}
                      </Select>
                      <Label>*Colonia: </Label>
                      {errorFormCar.colonia && (
                        <Span>{errorFormCar.colonia}</Span>
                      )}
                    </SelectContainer>
                  </GrupoSelect>
                ) : (
                  <GrupoSelect>
                    {/* Estado, Ciudad y Colonia */}
                      <SelectContainer>
                        <Select
                          disabled={true}
                          name={"state"}
                          value={formCar.state}
                          onChange={handleChange}
                        >
                          <option>{estado || "Selecciona"}</option>
                        </Select>
                        <Label>*Estado: </Label>
                        {errorFormCar.state && <Span>{errorFormCar.state}</Span>}
                      </SelectContainer>
  
                      <SelectContainer>
                        <Select
                          disabled={true}
                          name={"city"}
                          value={formCar.city}
                          onChange={handleChange}
                        >
                          <option>{ciudad || "Selecciona"}</option>
                        </Select>
                        <Label>*Ciudad: </Label>
                        {errorFormCar.city && <Span>{errorFormCar.city}</Span>}
                      </SelectContainer>
  
                    <SelectContainer>
                      <Select
                        disabled={!ciudad ? true : false}
                        name={"colonia"}
                        // value={formCar.colonia}
                        onChange={handleChange}
                      >
                        <option>Selecciona</option>
                        {selectColonia.length >= 1 &&
                          selectColonia.map((colonia, idx) => {
                            return (
                              <option key={idx} value={colonia}>
                                {colonia}
                              </option>
                            );
                          })}
                      </Select>
                      <Label>*Colonia: </Label>
                      {errorFormCar.colonia && (
                        <Span>{errorFormCar.colonia}</Span>
                      )}
                    </SelectContainer>
  
                  </GrupoSelect>
                )}
                <GrupoInput>
                  {/* Domicilio, Telefono y Email */}
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"address"}
                      placeholder="a"
                      value={formCar.address}
                      onChange={handleChange}
                    />
                    <Label>*Domicilio: </Label>
                    <br />
                    {errorFormCar.address && (
                      <Span>{errorFormCar.address}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"contact"}
                      value={formCar.contact}
                      placeholder="a"
                      onChange={handleChange}
                    />
                    <Label>*Teléfono (Móvil): </Label>
                    <br />
                    {errorFormCar.contact && (
                      <Span>{errorFormCar.contact}</Span>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      color={"transparent"}
                      type="text"
                      name={"email"}
                      value={formCar.email}
                      placeholder="a"
                      onChange={handleChange}
                    />
                    <Label>*Correo electrónico: </Label>
                    <br />
                    {errorFormCar.email && <Span>{errorFormCar.email}</Span>}
                  </InputContainer>
                </GrupoInput>
              </>
            )}
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
