import axios from "axios";
import { dataFakeAdmin } from "../../data/dataFakeAdmin.js";

export async function axiosGetAdmins(setTBody, page, limit) {
  try {
    //const { data } = (await axios.get(`/api/admins?page=${page}&limit=${limit}`));
    // console.log('DATA:', data);
    //setTBody(data);
    setTBody(dataFakeAdmin);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

/* export async function axiosSearchAdmins(search, setTBody, headers) {
  try {
    const { data } = (await axios.get(`/api/admins?search=${search}`, { headers }));
    // console.log('DATA:', data);
    //setTBody(data);
    setTBody(dataFakeAdmin);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
} */

export async function axiosSearchAdmins(search, setTBody, headers) {
  
    setTBody(dataFakeAdmin[4]);
  
}

export async function axiosPostAdmin(admin, setErrorForm, headers) {
  try {
    const { data } = (await axios.post('/api/admin', admin, { headers }));
    console.log('POST:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    setErrorForm(error)
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