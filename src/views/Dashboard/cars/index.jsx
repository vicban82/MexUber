import React, { useEffect, useState } from "react";
import { axiosGetCars, axiosSearchCars } from "../../../hooks/cars/crudCars";
import { headers } from "../../../tools/accessToken";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faFastBackward,
} from "@fortawesome/free-solid-svg-icons";
import { DivPages, ContentPages, DivButtonPages, DivGrupPage } from "../../../components/reusable/DivPages";
import { Section } from "../../../components/reusable/global";

export const Cars = () => {
  const tableHeader = ["Propietario", "Placa", "Marca", "Modelo"];

  const [tCar, setTCar] = useState([]);
  // console.log('tCar:', tCar);

  //* ESTADO DEL FORMULARIO
  const [car, setCar] = useState({
    name: "",// Nombre del propietario
    lastName: "",// Apellido del propietario
    zipCode: "",// Código postal del propietario
    state: "",// Estado del propietario
    city: "",// Ciudad del propietario
    colonia: "",
    address: "",// Dirección del propietario
    contact: "",// Telefono del propietario
    email: "",// Correo electrónico del propietario
    cars: [],//* RELACION VEHÍCULOS

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
    driver : "" || null,//* RELACION CONDUCTOR
    driverIsOwner: 0,// Chofer es el propietario 1 = SI, 0 = NO
    owner : "" || null,//* RELACION CHOFER
  });

  const [errorForm, setErrorForm] = useState({
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
    driver : "" || null,//* RELACION CONDUCTOR
    driverIsOwner: "",// Chofer es el propietario
    owner : "" || null,//* RELACION CHOFER
  });
  //* ESTADO DEL FORMULARIO
  
  // * Páginado
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  
  const firstPages = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const prev = (e) => {
    e.preventDefault();
    setPage(page > 1 ? page - 1 : 1);
  };
  
  const next = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const lastPages = (e) => {
    e.preventDefault();
    setPage(totalPages);
  };
  //* Paginado

  //* Consulta
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (search) => {
    setSearchTerm(search);
    setPage(1); // Resetear la página al realizar una búsqueda
  };

  useEffect(() => {
    if (searchTerm) {
      axiosSearchCars(searchTerm, setTCar, setTotalPages, headers, page, limit);
    } else {
      axiosGetCars(page, limit, headers, setTCar, setTotalPages);
    }
  }, [page, limit, searchTerm]);
  //* Consulta

  return (
    <Section>
      {!Array.isArray(tCar) || tCar.length <= 0 ? (
          <div>
            <ButtonAdd
              tCar={tCar}
              setTCar={setTCar}
              car={car}
              setCar={setCar}
              errorForm={errorForm}
              setErrorForm={setErrorForm}
              limit={limit}
              setTotalPages={setTotalPages}
              setPage={setPage}
            />
            <Table
              tHeader={tableHeader}
              tCar={tCar}
              setTCar={setTCar}
              car={car}
              setCar={setCar}
              errorForm={errorForm}
              setErrorForm={setErrorForm}
            />
            <p>En esta sección no hay información disponible</p>
          </div>
      ) : (
        <>
          <ButtonAdd
            tCar={tCar}
            setTCar={setTCar}
            car={car}
            setCar={setCar}
            errorForm={errorForm}
            setErrorForm={setErrorForm}
            limit={limit}
            setTotalPages={setTotalPages}
            setPage={setPage}
          />
          <Table
            tHeader={tableHeader}
            tCar={tCar}
            setTCar={setTCar}
            car={car}
            setCar={setCar}
            errorForm={errorForm}
            setErrorForm={setErrorForm}
            limit={limit}
            setTotalPages={setTotalPages}
            setPage={setPage}
          />
          <ContentPages>
            <DivGrupPage>
              <DivButtonPages>
                <button onClick={(e) => firstPages(e)} disabled={page <= 1}>
                  <FontAwesomeIcon icon={faFastBackward} />
                </button>
              </DivButtonPages>
              <DivButtonPages>
                <button onClick={(e) => prev(e)} disabled={page <= 1}>
                  <FontAwesomeIcon icon={faBackward} />
                </button>
              </DivButtonPages>
              <DivPages>
                {`Página: ${page}/${totalPages}`}
              </DivPages>
              <DivButtonPages>
                <button onClick={(e) => next(e)} disabled={page >= totalPages}>
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </DivButtonPages>
              <DivButtonPages>
                <button onClick={(e) => lastPages(e)} disabled={page >= totalPages}>
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </DivButtonPages>
            </DivGrupPage>
          </ContentPages >
          <Search onSearch={handleSearch} />
        </>
      )}
    </Section>
  );
};
