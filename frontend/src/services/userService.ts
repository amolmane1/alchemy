import axios from "axios";
import { NewUser } from "../utils/types";
const baseUrl = "http://localhost:3000/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addOne = async (userDetails: NewUser) => {
  const response = await axios.post(`${baseUrl}`, userDetails);
  return response.data;
};

export default { getAll, getOne, addOne };
