import { Types, FilterQuery } from "mongoose";
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

export type EventStatus = "upcoming" | "ongoing" | "finished" | "cancelled";
export type UserStatus = "requested" | "accepted" | "rejected";

export interface Event {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  address: string;
  startDatetime: Date;
  endDatetime: Date;
  organizer: Types.ObjectId | string;
  status: EventStatus;
  // requestedUsers: Array<Types.ObjectId>;
  // acceptedUsers: Array<Types.ObjectId>;
  users: Record<string, UserStatus>;
}

export type NewEvent = Omit<Event, "id">;

export type EventStatusUpdateFilter = {
  startDatetime?: { $lt?: Date };
  endDatetime?: { $lt?: Date };
  status?: { $ne?: EventStatus };
};

export type EventFilterQuery = FilterQuery<Event>;

export interface CustomRequest extends Request {
  token?: string;
  user?: PublicUser | null;
}
