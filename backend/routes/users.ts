import express from "express";
const bcrypt = require("bcrypt");
import userServiceFirestore from "../services/userServiceFirestore";
import { UserWithoutId } from "../utils/types";
import { toNewUser } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res) => {
  // const result = await userService.getUsers();
  const result = await userServiceFirestore.getUsers();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await userServiceFirestore.getUser(id);
  res.json(result);
});

export default router;
