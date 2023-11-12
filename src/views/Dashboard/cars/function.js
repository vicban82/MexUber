import axios from "axios";

export function obtenerAnios() {
  const anioActual = new Date().getFullYear();
  const aniosAnteriores = [];
  
  for (let i = anioActual + 1; i > anioActual - 10; i--) {
    aniosAnteriores.push(i);
  }
  
  return aniosAnteriores;
}

export function disponible(conductores, vehiculos) {
  if (Array.isArray(conductores) || Array.isArray(vehiculos)) {
    //* ACA SE VERIFICA SI AL CONDUCTOR YA SE LE ASIGNO UN VEHICULO
    const conjunto_1 = conductores.map(el => el._id);
    const conjunto_2 = vehiculos.map(el => el.driver);
    return Array.from(conjunto_1.filter(el => new Set(conjunto_2).has(el)))
  }
}

// SE USA ESTA FUNCION PARA LA RELACION CON EL VEHICULO
export async function axiosGetDrivers(setTCar, headers) {
  try {
    const { data } = await axios.get(`/api/drivers`, { headers });
    // console.log('DATA:', data);
    if (typeof data === "object" && data.drivers) {
      setTCar(data.drivers);
      return data.drivers;
    } else {
      setTCar([]);
    }
    // setTotalPages(2);
    // setTDriver(dataFakeDriver);
  } catch (err) {
    const { error } = err.response.data;
    console.log("ERROR:", error);
  }
}

// SE USA ESTA FUNCION PARA OBTENER LA INFORMACION DEL CONDUCTOR SI ES EL MISMO PROPIETARIO
export async function axiosDetailDriver(id, setDetailDriver, headers) {
  try {
    const { data } = (await axios.get(`/api/driver/${id}`, { headers }));
    setDetailDriver(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosGetAllCars(setVehiculos, headers) {
  try {
    const { data } = (await axios.get(`/api/cars`, { headers }));
    // console.log('DATA:', data);
    if (data && data.cars.length >= 1) {
      setVehiculos(data.cars);
    } else {
      setVehiculos([]);
    }
    // setTotalPages(2);
    // setVehiculos(dataFakeCars);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}