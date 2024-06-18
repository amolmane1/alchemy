import { Schema, model } from "mongoose";
import {
  // User,
  UserWithoutId,
} from "../utils/types";

const userSchema = new Schema<UserWithoutId>({
  // id: {
  //   type: String,
  //   required: true,
  // },
  passwordHash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const UserModel = model<UserWithoutId>("User", userSchema);

// module.exports = UserModel;
export default UserModel;
