import axios from "axios";
const baseUrl = "http://localhost:3000/api/events";

let token: string | null = null;

const setToken = (value: string | null) => {
  if (value) {
    token = `Bearer ${value}`;
  } else {
    token = null;
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  setToken,
  getAll,
  // getOne, addBlog, updateBlog, deleteBlog
};
