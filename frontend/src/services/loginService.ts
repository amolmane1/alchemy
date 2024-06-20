import axios from "axios";
import { LoginDetails } from "../utils/types";

const baseUrl = "http://localhost:3000/api/login";

const loginUser = (loginData: LoginDetails) => {
  const request = axios.post(baseUrl, loginData);
  return request.then((response) => response.data);
};

export default { loginUser };
