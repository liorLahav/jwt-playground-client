import type { Post, PostResponse } from "@/types/posts";
import axios from "axios";
import config from "../../public/config.json";

export const addPost = async ({ title, content }: Post) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }
  await axios.post(
    `${config.API_BASE_URL}/posts/add`,
    { title, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchPosts = async (): Promise<PostResponse[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await axios.get(`${config.API_BASE_URL}/posts/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Fetched posts response:", response.data);
  return response.data;
};
