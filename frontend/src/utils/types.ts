import { Types, FilterQuery } from "mongoose";
import store from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
}

export type UserWithoutId = Omit<User, "id">;

export type EventStatus = "upcoming" | "ongoing" | "finished" | "cancelled";

export interface Event {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  address: string;
  startDatetime: Date;
  endDatetime: Date;
  organizer: User;
  status: EventStatus;
  requestedUsers: Array<User>;
  acceptedUsers: Array<User>;
}

export type NewEvent = Omit<Event, "id">;

export type EventFilterQuery = FilterQuery<Event>;
export type EventFilter = {
  text: string;
  location: string;
};
