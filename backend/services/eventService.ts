import { Types } from "mongoose";
import {
  EventStatusUpdateFilter,
  EventFilterQuery,
  NewEvent,
} from "../utils/types";
import EventModel from "../models/events";

const getEvents = async (filters: EventFilterQuery) => {
  const result = await EventModel.find(filters)
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

const updateEvent = async (
  eventId: string,
  // payload: Record<string, Array<Types.ObjectId>>
  payload:
    | NewEvent
    | Record<string, Array<Types.ObjectId>>
    | Record<string, string>
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
  updateEvent,
  // deleteEvent,
};
