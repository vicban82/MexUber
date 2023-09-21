import axios from "axios";

export async function axiosGetAdmins(setTBody, setTError) {
  try {
    const { data } = (await axios.get('/api/admins'));
    // console.log('DATA:', data);
    setTBody(data);
  } catch (err) {
    const { error } = err.response.data;
    setTError(error)
    console.log('ERROR:', error);
  }
}

export async function axiosPostAdmin(admin, setError) {
  console.log('POST:', admin);
  try {
    const { data } = (await axios.post('/api/admin', admin));
    console.log('DATA:', data);
    // setTBody(data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}