import express from "express";
import userService from "../services/userService";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = userService.getUsers();
  res.send(result);
});

router.post("/", (_req, res) => {
  res.send("Adding a user!");
});

export default router;
