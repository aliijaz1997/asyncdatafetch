import axios from "axios";
const BASE_URL = "http://localhost:8000/";

async function createPost(data) {
  const response = await axios.post(`${BASE_URL}posts`, {
    ...data,
  });
  return response.data;
}

async function deletePost(id) {
  const response = await axios.delete(`${BASE_URL}posts/${id}`);
  return response.data;
}

export { createPost, deletePost };
