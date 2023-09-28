import axios from "axios";

export async function axiosLogins(login, setError) {
  try {
    const { data } = await axios.post('/api/logins', login);
    // console.log('DATA:', data);
    localStorage.setItem("loginAdmin", JSON.stringify(data))
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}