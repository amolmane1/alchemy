import { User } from "../types";
import userData from "../data/users";

const getUsers = (): User[] => {
  return userData;
};

const addUser = () => {
  return null;
};

export default {
  getUsers,
  addUser,
};
