import axios from "axios";
import config from "../../public/config.json";
import type { LoginInputs } from "@/pages/login/Login";

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
  await axios.post(
    `${config.API_BASE_URL}/auth/logout`,
    {},
    { withCredentials: true },
  );

export const fetchUser = async () => {
  const token = localStorage.getItem("token");

  const user = await axios.get(`${config.API_BASE_URL}/auth/getUser`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    withCredentials: true,
  });

  return user.data;
};

export const fetchKidVulnState = async (): Promise<{ enabled: boolean }> => {
  const response = await axios.get(`${config.API_BASE_URL}/auth/kidVuln`);
  return response.data;
};

export const toggleKidVuln = async (): Promise<{ enabled: boolean }> => {
  const response = await axios.post(`${config.API_BASE_URL}/auth/kidVuln`, {});
  return response.data;
};

export const fetchBacVulnState = async (): Promise<{ enabled: boolean }> => {
  const response = await axios.get(`${config.API_BASE_URL}/auth/bacVuln`);
  return response.data;
};

export const toggleBacVuln = async (): Promise<{ enabled: boolean }> => {
  const response = await axios.post(`${config.API_BASE_URL}/auth/bacVuln`, {});
  return response.data;
};
