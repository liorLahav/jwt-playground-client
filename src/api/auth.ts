import axios from "axios";
import config from "../../public/config.json";
import type { LoginInputs } from "@/login/Login";

export const login = async ({
  userName,
  password,
  storedLocation,
  alg,
  exp,
  httpOnly,
  sameSite,
  secure,
}: LoginInputs) => {
  const res = await axios.post(
    `${config.API_BASE_URL}/auth/login`,
    {
      userName,
      password,
      storedLocation,
      alg,
      exp,
      httpOnly,
      sameSite,
      secure,
    },
    {
      withCredentials: true,
    },
  );

  const token = res.data.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return res.data;
};

export const logOut = async () =>
  await axios.post(`${config.API_BASE_URL}/auth/logout`, {}, {withCredentials: true});

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    const user = await axios.get(`${config.API_BASE_URL}/auth/getUser`, {
      withCredentials: true,
    });
    return user.data;
    return null;
  }
  return token;
};
