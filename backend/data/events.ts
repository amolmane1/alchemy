import { Event } from "../types";

const data: Event[] = [
  {
    id: "1",
    type: "running",
    title: "Half marathon",
    description: "From Kits to Spanish Banks",
    location: "Vancouver",
    address: "Kits beach",
    date: "15-10-2024",
    time: "5:00PM",
    status: "upcoming",
    organizer: "1",
    requestedUsers: [],
    acceptedUsers: [],
  },
  {
    id: "2",
    type: "swimming",
    title: "Swim at VAC",
    description: "1k at VAC",
    location: "Vancouver",
    address: "Vancouver Acquatic Center",
    date: "15-09-2024",
    time: "5:00PM",
    status: "upcoming",
    organizer: "2",
    requestedUsers: [],
    acceptedUsers: [],
  },
  {
    id: "3",
    type: "tennis",
    title: "Chill tennis session",
    description:
      "Don't want anything competitive, just want to work on my form",
    location: "Vancouver",
    address: "Stanley park courts",
    date: "15-08-2024",
    time: "5:00PM",
    status: "upcoming",
    organizer: "3",
    requestedUsers: [],
    acceptedUsers: [],
  },
];

export default data;
