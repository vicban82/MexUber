import axios from "axios";

export async function axiosLogins(login) {
  try {
    const { data } = await axios.post('/api/logins', login);
    // console.log('LOGINS:', data);
    localStorage.setItem("loginAdmin", JSON.stringify(data))
    localStorage.setItem("tokenAdmin", JSON.stringify(data.token))
    return data
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}

export async function axiosVerifyAdmin(setVerifyAdmin) {
  try {
    const { data } = await axios.get('/api/admins');
    // console.log('VerifyAdmin:', data);
    setVerifyAdmin(data);
  } catch (err) {
    const { error } = err.response.data;
    console.log('ERROR:', error);
  }
}