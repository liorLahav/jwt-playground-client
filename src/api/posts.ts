import type { Post, PostResponse } from "@/types/posts";
import axios from "axios";
import config from "../../public/config.json";

export const addPost = async ({ title, content }: Post) => {
  const token = localStorage.getItem("token");

  await axios.post(
    `${config.API_BASE_URL}/posts/add`,
    { title, content },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      withCredentials: true,
    },
  );
};

export const fetchPosts = async (): Promise<PostResponse[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${config.API_BASE_URL}/posts/getAll`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    withCredentials: true,
  });

  return response.data;
};
