import axios from "axios";

export function obtenerAnios() {
  const anioActual = new Date().getFullYear();
  const aniosAnteriores = [];
  
  for (let i = anioActual + 1; i > anioActual - 10; i--) {
    aniosAnteriores.push(i);
  }
  
  return aniosAnteriores;
}

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

export async function axiosGetAllCars(setTCar, headers) {
  try {
    const { data } = (await axios.get(`/api/cars`, { headers }));
    // console.log('DATA:', data);
    if (data && data.cars.length >= 1) {
      setTCar(data.cars);
    } else {
      setTCar([]);
    }
    // setTotalPages(2);
    // setTCar(dataFakeCars);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}