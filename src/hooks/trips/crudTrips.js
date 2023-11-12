import axios from "axios";
import { dataFakeTrips } from "../../data/dataFakeTrips";

export async function axiosGetTrips(setTDriver, setTotalPages, headers, page, limit) {
  try {
    /* const { data } = (await axios.get(`/api/trips?page=${page}&limit=${limit}`, { headers }));
     console.log('DATA:', data);
    if (typeof data === "object" && data.trips) {
      setTrips(data.drivers);
      setTotalPages(data.totalPages);
    } else {
      setTrips([]);
      setTotalPages(1)
    } */
     setTotalPages(2);
     setTDriver(dataFakeTrips);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosSearchTrips(search, setTDriver, setTotalPages, headers, page, limit) {
  try {
    const { data } = (await axios.get(`/api/drivers?search=${search}&page=${page}&limit=${limit}`, { headers }));
    // console.log("DATA:", data);
    if (typeof data === "object" && data.drivers) {
      setTDriver(data.drivers);
      setTotalPages(data.totalPages);
    } else {
      setTDriver([]);
      setTotalPages(1)
    }
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDetailTrips(id, setDetailDriver, headers) {
  try {
    const { data } = (await axios.get(`/api/driver/${id}`, { headers }));
    setDetailDriver(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPostTrips(driver, headers) {
  try {
    const { data } = (await axios.post('/api/driver', driver, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPutTrips(id, driver, headers) {
  try {
    const { data } = (await axios.put(`/api/driver/${id}`, driver, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDeleteTrips(id, headers) {
  try {
    const { data } = (await axios.delete(`/api/driver/${id}`, { headers }));
    console.log('DELETE:', data);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}