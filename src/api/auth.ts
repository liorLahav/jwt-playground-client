import axios from "axios";
import config from "../../public/config.json";


export const login = async (userName: string, password: string, storedLocation: string) => {
  const res = await axios.post(`${config.API_BASE_URL}/auth/login`, {
    userName,
    password,
    storedLocation
  });

  const token = res.data.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return res.data;
};
