import express from "express";
import eventService from "../services/eventService";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = eventService.getEvents();
  res.send(result);
});

router.post("/", (_req, res) => {
  res.send("Adding an event!");
});

export default router;
