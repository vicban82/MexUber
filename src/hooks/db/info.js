import axios from "axios";
import { sepomex } from "../../data/dataFakeSepomex";

export async function axiosGetSepomex(setSepomex) {
  try {
    const { data } = (await axios.get('/api/sepomex'));
    // console.log('DATA:', data);
    setSepomex(data);
    return data;
    // setSepomex(sepomex);
    return sepomex;
  } catch (err) {
    const { error } = err.response.data;
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
    console.log('ERROR:', error);
  }
}