import axios from "axios";
import config from "../../public/config.json";

export const fetchNumOfUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${config.API_BASE_URL}/panel/getTotalUsers`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      withCredentials: true,
    },
  );

  return response.data;
};

export const fetchUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${config.API_BASE_URL}/panel/getAll`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    withCredentials: true,
  });

  return response.data;
};

export const fetchKidVulnState = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${config.API_BASE_URL}/panel/kidVuln`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    withCredentials: true,
  });
  return response.data as { enabled: boolean };
};

export const toggleKidVuln = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${config.API_BASE_URL}/panel/kidVuln`, {}, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    withCredentials: true,
  });
  return response.data as { enabled: boolean };
};

export const deleteUserById = async (userId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${config.API_BASE_URL}/panel/deleteUser/${userId}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      withCredentials: true,
    },
  );

  return response.data;
};
