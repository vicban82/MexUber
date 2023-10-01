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