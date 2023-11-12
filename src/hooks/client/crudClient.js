import axios from "axios";
import { dataFakeClient } from "../../data/dataFakeClient";

export async function axiosGetClient(setTDriver, setTotalPages, headers, page, limit) {
  try {
    /* const { data } = (await axios.get(`/api/drivers?page=${page}&limit=${limit}`, { headers }));
     console.log('DATA:', data);
    if (typeof data === "object" && data.drivers) {
      setTDriver(data.drivers);
      setTotalPages(data.totalPages);
    } else {
      setTDriver([]);
      setTotalPages(1)
    } */
     setTotalPages(2);
     setTDriver(dataFakeClient);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosSearchClient(search, setTDriver, setTotalPages, headers, page, limit) {
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

export async function axiosDetailClient(id, setDetailDriver, headers) {
  try {
    const { data } = (await axios.get(`/api/driver/${id}`, { headers }));
    setDetailDriver(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPostClient(driver, headers) {
  try {
    const { data } = (await axios.post('/api/driver', driver, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosPutClient(id, driver, headers) {
  try {
    const { data } = (await axios.put(`/api/driver/${id}`, driver, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosDeleteCleint(id, headers) {
  try {
    const { data } = (await axios.delete(`/api/driver/${id}`, { headers }));
    console.log('DELETE:', data);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}