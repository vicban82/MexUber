import axios from "axios";

export async function axiosGetAdmins(setTBody, setTError, headers) {
  try {
    const { data } = (await axios.get('/api/admins', { headers }));
    // console.log('DATA:', data);
    setTBody(data);
  } catch (err) {
    const { error } = err.response.data;
    setTError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosPostAdmin(admin, setError, headers) {
  try {
    const { data } = (await axios.post('/api/admin', admin, { headers }));
    console.log('POST:', data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosPutAdmin(id, admin, headers, setErrorForm) {
  try {
    const { data } = (await axios.put(`/api/admin/${id}`, admin, { headers }));
    console.log('PUT:', data);
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