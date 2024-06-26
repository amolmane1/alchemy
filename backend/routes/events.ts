import express, { request } from "express";
const { ObjectId } = require("mongodb");
import eventService from "../services/eventService";
import eventServiceFirestore from "../services/eventServiceFirestore";
import { userExtractor } from "../utils/middleware";
import { NewEvent, CustomRequest } from "../utils/types";
import { toNewEvent, parseString } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res) => {
  // console.log(req.body);
  // const result = await eventService.getEvents(req.body);
  const result = await eventServiceFirestore.getEvents();
  // console.log("in get", result);
  res.send(result);
});

router.post("/", userExtractor, async (req: CustomRequest, res) => {
  // console.log("in post");
  const user = req.user;
  // console.log("user ", user);

  if (user) {
    const newEvent: NewEvent = toNewEvent({ ...req.body, organizer: user.id });
    // const result = await eventService.addEvent(newEvent);
    const result = await eventServiceFirestore.addEvent(newEvent);

    res.send(result);
  }
});

router.patch(
  "/:id/request-to-join",
  userExtractor,
  async (req: CustomRequest, res) => {
    const eventId: string = req.params.id;
    let event = await eventService.getEvent(eventId);
    const user = req.user;
    if (user && event) {
      const requestingUserId = new ObjectId(user.id);
      const requestedUsers = event.requestedUsers;
      if (
        !requestedUsers.includes(requestingUserId) &&
        !event.acceptedUsers.includes(requestingUserId)
      ) {
        event.requestedUsers = requestedUsers.concat([requestingUserId]);
        const result = await eventService.updateEvent(eventId, event);
        return res.send(result);
      } else {
        return res.send(event);
      }
    } else {
      // it's not possible for user to be null
      // because an error would have been raised in the UserExtractor middleware
      return res.status(404).send("Event not found");
    }
  }
);

router.patch(
  "/:id/withdraw-request-to-join",
  userExtractor,
  async (req: CustomRequest, res) => {
    const eventId: string = req.params.id;
    let event = await eventService.getEvent(eventId);
    const user = req.user;
    if (user && event) {
      const requestingUserId = new ObjectId(user.id);
      event.requestedUsers = event.requestedUsers.filter(
        (u) => !u.equals(requestingUserId)
      );
      event.acceptedUsers = event.acceptedUsers.filter(
        (u) => !u.equals(requestingUserId)
      );
      const result = await eventService.updateEvent(eventId, event);
      return res.send(result);
    } else {
      // it's not possible for user to be null
      // because an error would have been raised in the UserExtractor middleware
      return res.status(404).send("Event not found");
    }
  }
);

// TODO: figure out whether this endpoint is appropriate
router.patch(
  "/:id/requestedUsers/:requestedUserId/accept-request-to-join",
  // "/:id/accept-request-to-join",
  userExtractor,
  async (req: CustomRequest, res) => {
    const user = req.user;
    const eventId: string = req.params.id;
    let event = await eventService.getEvent(eventId, false);
    if (!(user && event)) {
      return res.status(404).send("Event not found");
    }
    if (!(event.organizer.toString() === user.id)) {
      return res
        .status(401)
        .send(
          "Only the organizer of the event has the permission to accept requests"
        );
    }
    const requestedUserId = new ObjectId(req.params.requestedUserId);
    if (!event.requestedUsers.includes(requestedUserId)) {
      return res
        .status(404)
        .send(
          "The user to accept the request of does not exist in the requestedUsers field of the event."
        );
    }
    event.requestedUsers = event.requestedUsers.filter(
      (u) => !u.equals(requestedUserId)
    );
    // just making sure the same userid isn't going to be in acceptedUsers more than once
    event.acceptedUsers = event.acceptedUsers.filter(
      (u) => !u.equals(requestedUserId)
    );
    event.acceptedUsers = event.acceptedUsers.concat(requestedUserId);
    const result = await eventService.updateEvent(eventId, event);
    return res.send(result);
  }
);

// TODO: figure out whether this endpoint is appropriate
router.patch(
  "/:id/requestedUsers/:requestedUserId/reject-request-to-join",
  userExtractor,
  async (req: CustomRequest, res) => {
    const user = req.user;
    const eventId: string = req.params.id;
    let event = await eventService.getEvent(eventId, false);
    if (!(user && event)) {
      return res.status(404).send("Event not found");
    }
    if (!(event.organizer.toString() === user.id)) {
      return res
        .status(401)
        .send(
          "Only the organizer of the event has the permission to reject requests"
        );
    }
    const requestedUserId = new ObjectId(req.params.requestedUserId);
    if (!event.requestedUsers.includes(requestedUserId)) {
      return res
        .status(404)
        .send(
          "The user to reject the request of does not exist in the requestedUsers field of the event."
        );
    }
    const requestedUsers = event.requestedUsers.filter(
      (u) => !u.equals(requestedUserId)
    );
    const result = await eventService.updateEvent(eventId, { requestedUsers });
    return res.send(result);
  }
);

// update-status endpoint. schedma should just have one array for all users associated with the event

// TODO: figure out whether this endpoint is appropriate
router.patch(
  "/:id/cancel-event",
  userExtractor,
  async (req: CustomRequest, res) => {
    const user = req.user;
    const eventId: string = req.params.id;
    let event = await eventService.getEvent(eventId, false);
    if (!(user && event)) {
      return res.status(404).send("Event not found");
    }
    if (!(event.organizer.toString() === user.id)) {
      return res
        .status(401)
        .send(
          "Only the organizer of the event has the permission to cancel events"
        );
    }
    const status = "cancelled";
    const result = await eventService.updateEvent(eventId, { status });
    return res.send(result);
  }
);

export default router;
