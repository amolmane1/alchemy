import express from "express";
const bcrypt = require("bcrypt");
import userService from "../services/userService";
import { UserWithoutId } from "../utils/types";
import { toNewUser } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res) => {
  const result = await userService.getUsers();
  res.json(result);
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, location } = req.body;
    if (password.length < 3) {
      res
        .status(400)
        .json({ error: "Password must be at least 3 characters long." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: UserWithoutId = toNewUser({
      firstName,
      lastName,
      email,
      passwordHash,
      location,
    });
    const result = await userService.addUser(newUser);
    res.json(result);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
