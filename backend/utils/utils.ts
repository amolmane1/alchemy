import { JwtPayload } from "jsonwebtoken";
import { NewEvent, UserWithoutId } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// const isNumber = (value: unknown): value is number => {
//   return typeof value === "number" || value instanceof Number;
// };

export const parseString = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${name}`);
  }
  return text;
};

const isDateFormat = (text: string): boolean => {
  return Boolean(Date.parse(text));
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDateFormat(date)) {
    throw new Error("Incorrect or missing date");
  }
  return new Date(date);
};

export const toNewUser = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "firstName" in object &&
    "lastName" in object &&
    "email" in object &&
    "passwordHash" in object &&
    "location" in object
  ) {
    const newUser: UserWithoutId = {
      firstName: parseString(object.firstName, "firstName"),
      lastName: parseString(object.lastName, "lastName"),
      email: parseString(object.email, "email"),
      passwordHash: parseString(object.passwordHash, "passwordHash"),
      location: parseString(object.location, "location"),
    };
    return newUser;
  } else {
    throw new Error("Incorrect data: Some fields are missing");
  }
};

export const toNewEvent = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "type" in object &&
    "title" in object &&
    "description" in object &&
    "location" in object &&
    "address" in object &&
    "startDatetime" in object &&
    "endDatetime" in object &&
    "organizer" in object
  ) {
    const newEvent: NewEvent = {
      type: parseString(object.type, "type"),
      title: parseString(object.title, "title"),
      description: parseString(object.description, "description"),
      location: parseString(object.location, "location"),
      address: parseString(object.address, "address"),
      startDatetime: parseDate(object.startDatetime),
      endDatetime: parseDate(object.endDatetime),
      organizer: parseString(object.organizer, "organizer"),
      status: "upcoming",
      requestedUsers: [],
      acceptedUsers: [],
    };
    return newEvent;
  } else {
    throw new Error("Incorrect data: Some fields are missing");
  }
};

export const isJwtPayload = (
  decodedToken: string | JwtPayload
): decodedToken is JwtPayload => {
  if (typeof decodedToken !== "object" || decodedToken === null) {
    return false;
  }
  const requiredClaims = ["iat", "id"];
  return requiredClaims.every((claim) => claim in decodedToken);
};
