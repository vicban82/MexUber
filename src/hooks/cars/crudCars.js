import axios from "axios";
import { dataFakeCars } from "../../data/dataFakeCars.js";

export async function axiosGetCars(page, limit, headers, setTCar, setTotalPages) {
  try {
    const { data } = (await axios.get(`/api/cars?page=${page}&limit=${limit}`, { headers }));
    // console.log('DATA:', data);
    if (data && data.cars.length >= 1) {
      setTCar(data.cars);
      setTotalPages(data.totalPages);
    } else {
      setTCar([]);
      setTotalPages(1)
    }
    //  setTotalPages(2);
    //  setTCar(dataFakeCars);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosSearchCars(search, setTCar, setTotalPages, page, limit, headers) {
  try {
    const { data } = (await axios.get(`/api/cars?search=${search}&page=${page}&limit=${limit}`, { headers }));
    // console.log('DATA:', data);
    if (data && data.cars.length >= 1) {
      setTCar(data.cars);
      setTotalPages(data.totalPages);
    } else {
      setTCar([]);
      setTotalPages(1)
    }
    // setTBody(dataFakeAdmin);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDetailCar(id, setDetailCar, headers) {
  try {
    const { data } = (await axios.get(`/api/car/${id}`, { headers }));
    setDetailCar(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPostCars(formCar, headers) {
  try {
    const { data } = (await axios.post('/api/car', formCar, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPutCars(id, upDateForm, headers) {
  try {
    const { data } = (await axios.put(`/api/car/${id}`, upDateForm, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDeleteCars(id, headers, setError) {
  try {
    const { data } = (await axios.delete(`/api/cars/${id}`, { headers }));
    console.log('DELETE:', data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}