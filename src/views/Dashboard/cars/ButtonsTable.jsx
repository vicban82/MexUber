import React, { useEffect, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { headers } from "../../../tools/accessToken";
import styled from "styled-components";
import {
  errorRegister,
  successRegister,
} from "../../../tools/driverAlerts/register";
import { axiosGetMarcas, axiosGetSepomex, axiosGetSubMarcas } from "../../../hooks/db/info";
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
import { axiosDetailDriver, axiosGetAllCars, axiosGetDrivers, disponible, obtenerAnios } from "./function";
import { axiosDetailCar } from "../../../hooks/cars/crudCars";
import { colors } from "./colores";

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
  const [detailCar, setDetailCar] = useState({});
  // console.log("detailCar:", detailCar)
  useEffect(() => {
    axiosDetailCar(id, setDetailCar, headers);
  }, [id]);

  useEffect(() => {
    if (detailCar._id === id) {
      setUpdateForm({
        name: detailCar.owner.name,// Nombre del propietario
        lastName: detailCar.owner.lastName,// Apellido del propietario
        zipCode: detailCar.owner.zipCode,// Código postal del propietario
        state: detailCar.owner.state,// Estado del propietario
        city: detailCar.owner.city,// Ciudad del propietario
        colonia: detailCar.owner.colonia,
        address: detailCar.owner.address,// Dirección del propietario
        contact: detailCar.owner.contact,// Telefono del propietario
        email: detailCar.owner.email,// Correo electrónico del propietario
    
        typeOfVehicle: detailCar.typeOfVehicle,// TIPO DE VEHICULO
        make: detailCar.make,// MARCA DEL VEHICULO
        subMake: detailCar.subMake,// SUB-MARCA DEL VEHICULO
        model: detailCar.model,
        color: detailCar.color,
        plates: detailCar.plates,// PLACAS DEL VEHICULO
        numberMotor: detailCar.numberMotor,// NUMERO DE MOTOR
        trafficCardNumber: detailCar.trafficCardNumber,// NUMERO TARGETA DE CIRCULACION
        frontImageTraffic: detailCar.frontImageTraffic,// Imagen de la tarjeta de circulación de frente
        backImageTraffic: detailCar.backImageTraffic,// Imagen de la tarjeta de circulación por atrás
        driver: `${detailCar.driver.name} ${detailCar.driver.lastName}` || null,//* RELACION CONDUCTOR
        driverIsOwner: detailCar.driverIsOwner,// Chofer es el propietario 1 = SI, 0 = NO
      });
    }
  }, [detailCar]);

  const [upDateForm, setUpdateForm] = useState({
    name: "",// Nombre del propietario
    lastName: "",// Apellido del propietario
    zipCode: "",// Código postal del propietario
    state: "",// Estado del propietario
    city: "",// Ciudad del propietario
    colonia: "",
    address: "",// Dirección del propietario
    contact: "",// Telefono del propietario
    email: "",// Correo electrónico del propietario

    typeOfVehicle: "",// TIPO DE VEHICULO
    make: "",// MARCA DEL VEHICULO
    subMake: "",// SUB-MARCA DEL VEHICULO
    model: "",
    color: "",
    plates: "",// PLACAS DEL VEHICULO
    numberMotor: "",// NUMERO DE MOTOR
    trafficCardNumber: "",// NUMERO TARGETA DE CIRCULACION
    frontImageTraffic: "",// Imagen de la tarjeta de circulación de frente
    backImageTraffic: "",// Imagen de la tarjeta de circulación por atrás
    driver: "" || null,//* RELACION CONDUCTOR
    driverIsOwner: 0,// Chofer es el propietario 1 = SI, 0 = NO
    owner: "" || null,//* RELACION CHOFER
  });
  // console.log("upDateForm:", upDateForm)

  const [errorFormCar, setErrorFormCar] = useState({
    name: "",// Nombre del propietario
    lastName: "",// Apellido del propietario
    zipCode: "",// Código postal del propietario
    state: "",// Estado del propietario
    city: "",// Ciudad del propietario
    colonia: "",
    address: "",// Dirección del propietario
    contact: "",// Telefono del propietario
    email: "",// Correo electrónico del propietario

    typeOfVehicle: "",// TIPO DE VEHICULO
    make: "",// MARCA DEL VEHICULO
    subMake: "",// SUB-MARCA DEL VEHICULO
    model: "",
    color: "",
    plates: "",// PLACAS DEL VEHICULO
    numberMotor: "",// NUMERO DE MOTOR
    trafficCardNumber: "",// NUMERO TARGETA DE CIRCULACION
    frontImageTraffic: "",// Imagen de la tarjeta de circulación de frente
    backImageTraffic: "",// Imagen de la tarjeta de circulación por atrás
    driver: "" || null,//* RELACION CONDUCTOR
    driverIsOwner: 0,// Chofer es el propietario 1 = SI, 0 = NO
    owner: "" || null,//* RELACION CHOFER
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  //* INFORMACION DEL VEHICULO
  const tipoDeVehiculo = ["Motocicleta", "Automovil"];
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
  const [vehiculos, setVehiculos] = useState([]);
  // EN ESTA FUNCION VERIFICA SI HAY CONDUCTORES CON VEHICULOS
  const hayConductores = disponible(conductores, vehiculos);
  // ACA SE OBTIENEN TODOS LOS CONUDCTORES QUE NO HAN SIDO ASIGNADOS
  const conductoresDisponibles = conductores.filter((el) => {
    return !hayConductores.includes(el._id);
  });
  const [detailDriver, setDetailDriver] = useState({});
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  //* RELACION CONDUCTOR

  //* INFORMACION DEL CONDUCTOR SI TAMBIEN ES EL PROPIETARIO
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [colonia, setColonia] = useState("");
  const [selectColonia, setSelectColonia] = useState([]);
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  //* INFORMACION DEL CONDUCTOR SI TAMBIEN ES EL PROPIETARIO

  //* INFO DB
  const [sepomex, setSepomex] = useState([]);
  //* INFO DB

  // * ------------ ESTADOS ------------
  const byState = [...new Set(sepomex.map((el) => el.estado))];

  // * ------------ CIUDADES ------------
  const filterByState = sepomex.filter((el) => {
    if (el.estado === upDateForm.state) {
      return el.ciudad;
    }
  });

  const byCity = [...new Set(filterByState.map((el) => el.ciudad))];

  // * ------------ COLONIAS ------------
  const filterByCity = sepomex.filter((el) => {
    if (el.ciudad === upDateForm.city) {
      return el.colonias;
    }
  });
  const byColonia = [...new Set(filterByCity.map((el) => el.colonias))].flat(1);

  function handleChange(e) {
    const { name, value, type } = e.target;

    if (name === "make") {
      const findById = marcas.find((el) => {
        if (el.marca === value) {
          return el.marcaId;
        }
      });
      const filterSubMarcas = subMarcas.filter(
        (el) => el.idMarca === findById.marcaId
      );
      setSelectSubMarca(filterSubMarcas);
    }
    if (name === "driver") {
      // SE USA EL VALUE PARA LA RELACION CON EL CONDUCTOR
      setValue(value);
    }

    if (type === "radio") {
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
        setValue(value);
        setName(name);
      }
      //* SE GUARDA EL "ESTADO" Y LA "CIUDAD" SI EL CP EXISTE EN LA DB
      if (codigoPostal) {
        setCar((prevState) => ({
          ...prevState,
          state: estado,
          city: ciudad,
        }));
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
    if (
      nombre ||
      apellido ||
      codigoPostal ||
      estado ||
      ciudad ||
      selectColonia ||
      domicilio ||
      telefono ||
      email
    ) {
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
      }));
    }
  }, [
    nombre,
    apellido,
    codigoPostal,
    estado,
    ciudad,
    selectColonia,
    domicilio,
    telefono,
    email,
  ]);

  useEffect(() => {
    axiosGetMarcas(setMarca);
    axiosGetSubMarcas(setSubMarca);
    axiosGetDrivers(setCondurtores, headers);
    axiosGetAllCars(setVehiculos, headers);
    axiosGetSepomex(setSepomex);
    const findById = conductores.find((el) => el._id === value);
    if (findById) {
      axiosDetailDriver(findById._id, setDetailDriver, headers);
    }
  }, [value]);

  useEffect(() => {
    // Este codigo me sirve para autocompleta o resetear la seccion de propietario
    let updateFormCar = { ...upDateForm };
    if (upDateForm.driverIsOwner === 1) {
      setNombre(detailDriver.name);
      setApellido(detailDriver.lastName);
      setCodigoPostal(detailDriver.zipCode);
      setEstado(detailDriver.state);
      setCiudad(detailDriver.city);
      setColonia(detailDriver.colonia);
      setDomicilio(detailDriver.address);
      setTelefono(detailDriver.contact);
      setEmail(detailDriver.email);
    } else {
      setNombre("");
      setApellido("");
      setCodigoPostal("");
      setEstado("");
      setCiudad("");
      setColonia("");
      setDomicilio("");
      setTelefono("");
      setEmail("");
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
    setCar(updateFormCar);
  }, [upDateForm.driverIsOwner]);

  useEffect(() => {
    // Este codigo resetea los ultimos campos si se cambia de conductor
    let updateFormCar = { ...upDateForm };
    setNombre("");
    setApellido("");
    setCodigoPostal("");
    setEstado("");
    setCiudad("");
    setColonia("");
    setDomicilio("");
    setTelefono("");
    setEmail("");
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
    setCar(updateFormCar);
  }, [upDateForm.driver]);

  useEffect(() => {
    let updateFormCar = { ...upDateForm };
    if (upDateForm.zipCode.length <= 4) {
      // SE RESETEAN LOS CAMPOS AL CAMBIAR DE CODIGO POSTAL
      setCodigoPostal("");
      setEstado("");
      setCiudad("");
      setColonia("");
      updateFormCar = {
        ...updateFormCar,
        state: "",
        city: "",
        colonia: "",
      };
    }
    if (name === "state") {
      // SE RESETEAN LOS CAMPOS SI CAMBIA DE ESTADO
      updateFormCar = {
        ...updateFormCar,
        city: "",
        colonia: "",
      };
    }
    if (name === "city") {
      // SE RESETEAN LOS CAMPOS SI CAMBIA DE CIUDAD
      updateFormCar = {
        ...updateFormCar,
        colonia: "",
      };
    }
    setCar(updateFormCar);
  }, [upDateForm.zipCode, upDateForm.state, upDateForm.city]);

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
      name: detailCar.owner.name,// Nombre del propietario
      lastName: detailCar.owner.lastName,// Apellido del propietario
      zipCode: detailCar.owner.zipCode,// Código postal del propietario
      state: detailCar.owner.state,// Estado del propietario
      city: detailCar.owner.city,// Ciudad del propietario
      colonia: detailCar.owner.colonia,
      address: detailCar.owner.address,// Dirección del propietario
      contact: detailCar.owner.contact,// Telefono del propietario
      email: detailCar.owner.email,// Correo electrónico del propietario
  
      typeOfVehicle: detailCar.typeOfVehicle,// TIPO DE VEHICULO
      make: detailCar.make,// MARCA DEL VEHICULO
      subMake: detailCar.subMake,// SUB-MARCA DEL VEHICULO
      model: detailCar.model,
      color: detailCar.color,
      plates: detailCar.plates,// PLACAS DEL VEHICULO
      numberMotor: detailCar.numberMotor,// NUMERO DE MOTOR
      trafficCardNumber: detailCar.trafficCardNumber,// NUMERO TARGETA DE CIRCULACION
      frontImageTraffic: detailCar.frontImageTraffic,// Imagen de la tarjeta de circulación de frente
      backImageTraffic: detailCar.backImageTraffic,// Imagen de la tarjeta de circulación por atrás
      driver: `${detailCar.driver.name} ${detailCar.driver.lastName}` || null,//* RELACION CONDUCTOR
      driverIsOwner: detailCar.driverIsOwner,// Chofer es el propietario 1 = SI, 0 = NO
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      upDateForm.typeOfVehicle &&
      upDateForm.make &&
      upDateForm.subMake &&
      upDateForm.model &&
      upDateForm.colors &&
      upDateForm.plates &&
      upDateForm.numberMotor &&
      // upDateForm.trafficCardNumber &&
      upDateForm.driver
    ) {
      if (
        upDateForm.driverIsOwner === 0 &&
        errorFormCar.name &&
        errorFormCar.lastName &&
        errorFormCar.zipCode &&
        errorFormCar.state &&
        errorFormCar.city &&
        errorFormCar.colonia &&
        errorFormCar.address &&
        errorFormCar.contact &&
        errorFormCar.email
      ) {
        // SE EVALUAN LOS CAMPOS "PROPIETARIO" EN CASO QUE EL CONDUCTOR NO LO SEA
        errorRegister(upDateForm, errorFormCar);
      } else if (errorFormCar.frontImageTraffic && errorFormCar.backImageTraffic) {
        errorRegister(upDateForm, errorFormCar);
      } else {
        try {
          successRegister(upDateForm);
          const currentCar = await axiosPutCars(id, upDateForm, headers);

          // Actualiza la lista en el frontend
          setTCar((prev) => {
            // Reemplaza el upDateForm editado en la lista por el nuevo upDateForm devuelto por el backend
            const updatedTCar = prev.map((item) =>
              item._id === id ? currentCar : item
            );
            return updatedTCar;
          });

          // Cierra el modal después de guardar
          setModalIsOpen(false);
          closeModal();

          // Establece la página en 1 después de agregar un elemento
          setPage(1);
        } catch (error) {
          console.error("Error al guardar el vehículo:", error);
        }
      }
    } else {
      errorRegister(upDateForm, errorFormCar);
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
              <h2>Modificar Vehículo</h2>
            </FormHead>
            <br />
            <ContainerScroll>
              <TituloSeccion>
                {/* Tarjeta de circulacion */}
                <hr />
                Datos del Vehiculo
              </TituloSeccion>

              <GrupoSelect>
                <SelectContainer>
                  <Select
                    name={"typeOfVehicle"}
                    value={upDateForm.typeOfVehicle}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>
                    {tipoDeVehiculo.map((el, idx) => {
                      return <option key={idx}>{el}</option>;
                    })}
                  </Select>
                  <Label>*Tipo de vehículo: </Label>
                  {errorFormCar.typeOfVehicle && (
                    <Span>{errorFormCar.typeOfVehicle}</Span>
                  )}
                </SelectContainer>

                <SelectContainer>
                  <Select
                    name={"make"}
                    value={upDateForm.make}
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
                    value={upDateForm.subMake}
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
                    value={upDateForm.model}
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
                    value={upDateForm.color}
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
                    value={upDateForm.plates}
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
                    value={upDateForm.numberMotor}
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
                    value={upDateForm.trafficCardNumber}
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
                  {upDateForm.frontImageTraffic && (
                    <img
                      src={`data:image/png;base64,${upDateForm.frontImageTraffic}`}
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
                  {upDateForm.backImageTraffic && (
                    <img
                      src={`data:image/png;base64,${upDateForm.backImageTraffic}`}
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
                    value={upDateForm.driver}
                    onChange={handleChange}
                  >
                    <option>Selecciona</option>

                    {!conductoresDisponibles.length ? (
                      <option key={"Sin_conductores"} value={"Sin conductores"}>
                        {"Sin conductores"}
                      </option>
                    ) : (
                      <>
                        <option key={"Sin_asignar"} value={"Sin asignar"}>
                          {"Sin asignar"}
                        </option>
                        {conductoresDisponibles.map((conductor, idx) => {
                          return (
                            <option
                              key={idx}
                              value={conductor._id}
                            >
                              {`${conductor.name} ${conductor.lastName}`}
                            </option>
                          );
                        })}
                      </>
                    )}
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
                  checked={upDateForm.driverIsOwner === 1}
                  onChange={handleChange}
                />
                SI
                <InputCheck
                  type="radio"
                  name="driverIsOwner"
                  value={"0"}
                  checked={upDateForm.driverIsOwner === 0}
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

              {upDateForm.driverIsOwner === 1 ? (
                <>
                  <GrupoInput>
                    {/* Propietario */}
                    <InputContainer>
                      <Input
                        color={"transparent"}
                        type="text"
                        name={"name"}
                        value={upDateForm.name}
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
                        value={upDateForm.lastName}
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
                        value={upDateForm.zipCode}
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
                        value={upDateForm.state}
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
                        value={upDateForm.city}
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
                        value={upDateForm.colonia}
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
                        value={upDateForm.address}
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
                        value={upDateForm.contact}
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
                        value={upDateForm.email}
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
                        value={upDateForm.name}
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
                        value={upDateForm.lastName}
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
                        value={upDateForm.zipCode}
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
                          disabled={upDateForm.zipCode.length <= 4 ? true : false}
                          name={"state"}
                          value={upDateForm.state}
                          onChange={handleChange}
                        >
                          <option>Selecciona</option>
                          {byState.length &&
                            byState.map((est, idx) => {
                              return <option key={idx}>{est}</option>;
                            })}
                        </Select>
                        <Label>*Estado: </Label>
                        {errorFormCar.state && (
                          <Span>{errorFormCar.state}</Span>
                        )}
                      </SelectContainer>

                      <SelectContainer>
                        <Select
                          disabled={!upDateForm.state ? true : false}
                          name={"city"}
                          value={upDateForm.city}
                          onChange={handleChange}
                        >
                          <option>Selecciona</option>
                          {byCity.length &&
                            byCity.map((cit, idx) => {
                              return <option key={idx}>{cit}</option>;
                            })}
                        </Select>
                        <Label>*Ciudad: </Label>
                        {errorFormCar.city && <Span>{errorFormCar.city}</Span>}
                      </SelectContainer>

                      <SelectContainer>
                        <Select
                          disabled={!upDateForm.city ? true : false}
                          name={"colonia"}
                          value={upDateForm.colonia}
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
                          value={upDateForm.state}
                          onChange={handleChange}
                        >
                          <option>{estado || "Selecciona"}</option>
                        </Select>
                        <Label>*Estado: </Label>
                        {errorFormCar.state && (
                          <Span>{errorFormCar.state}</Span>
                        )}
                      </SelectContainer>

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
                        {errorFormCar.city && <Span>{errorFormCar.city}</Span>}
                      </SelectContainer>

                      <SelectContainer>
                        <Select
                          disabled={!ciudad ? true : false}
                          name={"colonia"}
                          // value={upDateForm.colonia}
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
                        value={upDateForm.address}
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
                        value={upDateForm.contact}
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
                        value={upDateForm.email}
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
        <button onClick={() => handleDelete(id)}>
          <Img src={deleteIcon} alt="Delete" />
        </button>
      </td>
    </>
  );
}
