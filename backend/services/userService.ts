// import { v1 as uuid } from "uuid";
// import userData from "../data/users";
import UserModel from "../models/users";
import { UserWithoutId, UserWithoutIdAndPassword } from "../utils/types";

const getUsers = async (): Promise<UserWithoutIdAndPassword[]> => {
  // return userData;
  const result = await UserModel.find({});
  // console.log(result);
  // console.log(JSON.stringify(result));
  return result;
};

const addUser = async (
  userWithoutId: UserWithoutId
): Promise<UserWithoutIdAndPassword> => {
  // const user: User = ;
  const userDocument = new UserModel(userWithoutId);
  const result: UserWithoutId = await userDocument.save();
  const newUser: UserWithoutIdAndPassword = {
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    location: result.location,
  };
  return newUser;
};

export default {
  getUsers,
  addUser,
};
