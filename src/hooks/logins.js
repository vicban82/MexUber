import axios from "axios";
import { modelAdmins } from "../data/routeTitles";

export async function axiosLogins(login, setError) {
  try {
    const { data } = await axios.post('/api/login-admin', login);
    // const { data } = await axios.post(modelAdmins, login);
    console.log('DATA:', data);
  } catch (err) {
    const { error } = err.response.data;
    setError(error)
    console.log('ERROR:', error);
  }
}