export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
}

export type EventStatus = "upcoming" | "finished" | "cancelled";

export interface Event {
  id: string;
  type: string;
  title: string;
  description: string;
  location: string;
  address: string;
  date: string;
  time: string;
  status: EventStatus;
  organizer: User["id"];
  requestedUsers: Array<User["id"]>;
  acceptedUsers: Array<User["id"]>;
}
