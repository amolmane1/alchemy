import { Types } from "mongoose";
import { Request } from "express";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  location: string;
}

export type UserWithoutId = Omit<User, "id">;
export type UserWithoutIdAndPassword = Omit<User, "id" | "passwordHash">;
export type PublicUser = Omit<User, "passwordHash">;

export type EventStatus = "upcoming" | "finished" | "cancelled";

export interface Event {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  address: string;
  datetime: string;
  // organizer: User["id"];
  organizer: Types.ObjectId | string;
  status: EventStatus;
  // requestedUsers: Array<User["id"]>;
  // acceptedUsers: Array<User["id"]>;
  requestedUsers: Array<Types.ObjectId>;
  acceptedUsers: Array<Types.ObjectId>;
}

export type NewEvent = Omit<Event, "id">;

export interface CustomRequest extends Request {
  token?: string;
  user?: PublicUser | null;
}
