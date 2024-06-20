import { Types } from "mongoose";
import {
  EventStatusUpdateFilter,
  EventFilterQuery,
  NewEvent,
} from "../utils/types";
import EventModel from "../models/events";

const getEvents = async (filters: EventFilterQuery) => {
  const result = await EventModel.find(filters)
    .populate("organizer")
    .populate("requestedUsers")
    .populate("acceptedUsers");

  return result;
};

const getEvent = async (eventId: string) => {
  const event = await EventModel.findById(eventId)
    .populate("organizer")
    .populate("requestedUsers")
    .populate("acceptedUsers");
  return event;
};

const addEvent = async (newEvent: NewEvent) => {
  const event = new EventModel(newEvent);
  const result = await event.save();
  console.log("saved event: ", result);
  console.log(result.id);
  // return result;
  const populatedResult = await getEvent(result.id);
  return populatedResult;
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
  })
    .populate("organizer")
    .populate("requestedUsers")
    .populate("acceptedUsers");
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
