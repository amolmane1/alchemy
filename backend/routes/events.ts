import express, { request } from "express";
import eventServiceFirestore from "../services/eventServiceFirestore";
import { userExtractor } from "../utils/middleware";
import { NewEvent, CustomRequest } from "../utils/types";
import { toNewEvent, parseString } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res) => {
  // console.log(req.body);
  const result = await eventServiceFirestore.getEvents();
  // console.log("in get", result);
  res.send(result);
});

router.post("/", userExtractor, async (req: CustomRequest, res) => {
  const user = req.user;
  // console.log("in post: ", user);

  if (user) {
    const newEvent: NewEvent = toNewEvent({ ...req.body, organizer: user.id });
    const result = await eventServiceFirestore.addEvent(newEvent);
    // console.log(result);
    return res.send(result);
  } else {
    return res.status(401).send("Invalid user token");
  }
});

router.patch(
  "/:id/update-event-attendance",
  userExtractor,
  async (req: CustomRequest, res) => {
    const eventId: string = req.params.id;
    let event = await eventServiceFirestore.getEvent(eventId);
    const user = req.user;
    if (!(user && event)) {
      return res.status(404).send("Event not found");
    }
    const users = event.users;
    if (req.body.type == "request-to-join") {
      users[user.id] = "requested";
    } else if (req.body.type == "withdraw-request-to-join") {
      delete users[user.id];
    } else {
      if (!(event.organizer === user.id)) {
        return res
          .status(401)
          .send(
            "Only the organizer of the event has the permission to accept/reject requests"
          );
      }
      const requestedUserId = req.body.requestedUserId;
      if (req.body.type == "accept-request-to-join") {
        users[requestedUserId] = "accepted";
      } else if (req.body.type == "reject-request-to-join") {
        users[requestedUserId] = "rejected";
      }
    }
    const updatedEvent = await eventServiceFirestore.updateEvent(eventId, {
      users,
    });
    return res.send(updatedEvent);
  }
);

// router.patch(
//   "/:id/cancel-event",
//   userExtractor,
//   async (req: CustomRequest, res) => {
//     const user = req.user;
//     const eventId: string = req.params.id;
//     let event = await eventService.getEvent(eventId, false);
//     if (!(user && event)) {
//       return res.status(404).send("Event not found");
//     }
//     if (!(event.organizer.toString() === user.id)) {
//       return res
//         .status(401)
//         .send(
//           "Only the organizer of the event has the permission to cancel events"
//         );
//     }
//     const status = "cancelled";
//     const result = await eventService.updateEvent(eventId, { status });
//     return res.send(result);
//   }
// );

export default router;
