import { Types, FilterQuery } from "mongoose";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
}

export type UserWithoutId = Omit<User, "id">;
export interface NewUser extends UserWithoutId {
  password: string;
}

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
export type NewEventForm = Omit<
  Event,
  "id" | "organizer" | "status" | "requestedUsers" | "acceptedUsers"
>;

export type EventFilterQuery = FilterQuery<Event>;
export type EventFilter = {
  text: string;
  location: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type Token = {
  email: string;
  id: string;
};

export type UserState = {
  token: string | null;
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  location: string | null;
};
