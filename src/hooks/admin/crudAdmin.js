import axios from "axios";
import { modelAdmins } from "../../data/routeTitles";

export async function axiosGetAdmins() {
  try {
    const { data } = (await axios.get('/api/admins'));
    // const { data } = (await axios.get(modelAdmins));
    console.log('DATA:', data);
    return data;
  } catch (err) {
    const { error } = err.response.data;
    // setError(error)
    console.log('ERROR:', error);
  }
}