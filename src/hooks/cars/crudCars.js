import axios from "axios";
import { dataFakeCars } from "../../data/dataFakeCars.js";

export async function axiosGetCars(setTBody, setTotalPages, page, limit) {
  try {
    //const { data } = (await axios.get(`/api/admins?page=${page}&limit=${limit}`));
    // console.log('DATA:', data);
    //setTBody(data.admins);
    //setTotalPages(data.totalPages)
    setTotalPages(2);
    setTBody(dataFakeCars);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosSearchCars(search, setTBody, setTotalPages, page, limit, headers) {
  try {
    const { data } = (await axios.get(`/api/cars?search=${search}&page=${page}&limit=${limit}`, { headers }));
    // console.log('DATA:', data);
    setTBody(data.admins);
    setTotalPages(data.totalPages)
    // setTBody(dataFakeAdmin);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPostCars(admin, headers) {
  try {
    const { data } = (await axios.post('/api/cars', admin, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPutCars(id, admin, headers, setErrorForm) {
  try {
    const { data } = (await axios.put(`/api/cars/${id}`, admin, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    setErrorForm(error)
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