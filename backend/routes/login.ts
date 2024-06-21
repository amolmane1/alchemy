import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users";

const loginRouter = express.Router();

loginRouter.post("", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res.status(401).json({ error: "username not found" });
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "incorrect password" });
  }

  const token = await jwt.sign(
    { email: user.email, id: user._id },
    "fullstack"
    // { expiresIn: 60 * 60 }
  );
  return res.status(200).send({
    token,
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
  });
});

export default loginRouter;
