import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users";
import userServiceFirestore from "../services/userServiceFirestore";
import { SECRET } from "../utils/config";

const loginRouter = express.Router();

loginRouter.post("", async (req, res) => {
  const { email, password } = req.body;
  // const user = await UserModel.findOne({ email: email });
  const user = await userServiceFirestore.getUser(email);
  console.log(user);
  if (!user) {
    return res.status(401).json({ error: "no user found with given email" });
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "incorrect password" });
  }

  const token = await jwt.sign(
    { email: user.email, id: user.id },
    SECRET
    // { expiresIn: 60 * 60 }
  );
  return res.status(200).send({
    token,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
  });
});

export default loginRouter;
