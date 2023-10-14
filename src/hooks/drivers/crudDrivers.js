import axios from "axios";
import { dataFakeDriver } from "../../data/dataFakeDriver";

export async function axiosGetDrivers(setTDriver, setTotalPages, headers, page, limit) {
  try {
    const { data } = (await axios.get(`/api/drivers?page=${page}&limit=${limit}`, { headers }));
    // console.log('DATA:', data);
    setTDriver(data.drivers);
    setTotalPages(data.totalPages);
    // setTDriver(dataFakeDriver);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosSearchDrivers(search, setTDriver, headers) {
  try {
    const { data } = await axios.get(`/api/drivers?search=${search}`, { headers });
    // console.log("DATA:", data);
    setTDriver(data.drivers);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPostDriver(driver, headers) {
  try {
    const { data } = (await axios.post('/api/driver', driver, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPutDriver(id, driver, headers) {
  try {
    const { data } = (await axios.put(`/api/driver/${id}`, driver, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDeleteDriver(id, headers) {
  try {
    const { data } = (await axios.delete(`/api/driver/${id}`, { headers }));
    console.log('DELETE:', data);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}