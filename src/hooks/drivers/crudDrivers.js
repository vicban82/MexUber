import axios from "axios";

export async function axiosGetDrivers(setTDriver, headers) {
  try {
    const { data } = (await axios.get('/api/drivers', { headers }));
    // console.log('DATA:', data);
    setTDriver(data);
  } catch (err) {
    const { error } = err.response.data;
    // setTError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosSearchAdmins(search, setTBody, setTError, headers) {
  try {
    if (search) {
      const { data } = await axios.get(`/api/admins?search=${search}`, { headers });
      console.log("DATA:", data);
      setTBody(data);
    }
  } catch (err) {
    const { error } = err.response.data;
    setTError(error)
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
    // setErrorForm(error)
    console.log('ERROR:', error);
  }
}

export async function axiosPutAdmin(id, admin, headers, setErrorForm) {
  try {
    const { data } = (await axios.put(`/api/admin/${id}`, admin, { headers }));
    console.log('PUT:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    setErrorForm(error)
    console.log('ERROR:', error);
  }
}

export async function axiosDeleteAdmin(id, headers, setError) {
  try {
    const { data } = (await axios.delete(`/api/admin/${id}`, { headers }));
    console.log('DELETE:', data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}