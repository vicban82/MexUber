import axios from "axios";

export async function axiosGetSepomex(setSepomex) {
  try {
    const { data } = (await axios.get('/api/sepomex'));
    // console.log('DATA:', data);
    setSepomex(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    // setTError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosGetLicencias(setLicencias) {
  try {
    const { data } = (await axios.get('/api/type-licence'));
    // console.log('DATA:', data);
    setLicencias(data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    // setTError(error)
    console.log('ERROR:', error);
  }
}