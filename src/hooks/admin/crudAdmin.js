import axios from "axios";
import { dataFake } from "../../data/dataFake.js";

export async function axiosGetAdmins(setTBody, setTError) {
  try {
  /*const { data } = (await axios.get('/api/admins'));
    console.log('DATA:', data); */
    //setTBody(data);
    setTBody(dataFake);
  } catch (err) {
    const { error } = err.response.data;
    setTError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosPostAdmin(admin, setError) {
  try {
    const { data } = (await axios.post('/api/admin', admin));
    console.log('POST:', data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}