import { Types } from "mongoose";
import { Event, NewEvent } from "../utils/types";
import EventModel from "../models/events";
// import eventData from "../data/events";
// import { v1 as uuid } from "uuid";

const getEvents = async () => {
  const result = await EventModel.find({})
    .populate("organizer", {
      firstName: 1,
      lastName: 1,
      email: 1,
      location: 1,
    })
    .populate("requestedUsers")
    .populate("acceptedUsers");

  return result;
};

const getEvent = async (eventId: string) => {
  const event = await EventModel.findById(eventId);
  return event;
};

const addEvent = async (newEvent: NewEvent) => {
  const event = new EventModel(newEvent);
  const result = await event.save();
  return result;
};

const joinOrLeaveEvent = async (
  eventId: string,
  payload: Record<string, Array<Types.ObjectId>>
) => {
  const result = await EventModel.findByIdAndUpdate(eventId, payload, {
    new: true,
    runValidators: true,
    context: "query",
  });
  return result;
};

// const deleteEvent = () => {
//   return null;
// };

export default {
  getEvents,
  getEvent,
  addEvent,
  joinOrLeaveEvent,
  // deleteEvent,
};
