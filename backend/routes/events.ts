import express from "express";
const { ObjectId } = require("mongodb");
import eventService from "../services/eventService";
import { userExtractor } from "../utils/middleware";
import { NewEvent, CustomRequest } from "../utils/types";
import { toNewEvent, parseString } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res) => {
  const result = await eventService.getEvents();
  res.send(result);
});

router.post("/", userExtractor, async (req: CustomRequest, res) => {
  const user = req.user;
  if (user) {
    const newEvent: NewEvent = toNewEvent({ ...req.body, organizer: user.id });
    const result = await eventService.addEvent(newEvent);
    res.send(result);
  }
});

router.patch(
  "/:id/request-to-join",
  userExtractor,
  async (req: CustomRequest, res) => {
    const eventId: string = req.params.id;
    const event = await eventService.getEvent(eventId);
    const user = req.user;
    if (user && event) {
      const requestingUserId = new ObjectId(user.id);
      const requestedUsers = event.requestedUsers;
      if (
        !requestedUsers.includes(requestingUserId) &&
        !event.acceptedUsers.includes(requestingUserId)
      ) {
        requestedUsers.push(requestingUserId);
        const result = await eventService.joinOrLeaveEvent(eventId, {
          requestedUsers: requestedUsers,
        });
        res.send(result);
      } else {
        res.send(event);
      }
    } else {
      // it's not possible for user to be null
      // because an error would have been raised in the UserExtractor middleware
      res.status(404).send("Event not found");
    }
  }
);

export default router;
