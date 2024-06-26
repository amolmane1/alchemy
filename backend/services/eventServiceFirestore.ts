import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { v4 as uuid } from "uuid";
import { Types } from "mongoose";
import { EventFilterQuery, NewEvent, Event, UserStatus } from "../utils/types";

const getEvents = async () => {
  const eventsRef = db.collection("events");
  const snapshot: QuerySnapshot = await eventsRef.get();
  const eventList = snapshot.docs.map((doc: QueryDocumentSnapshot) =>
    doc.data()
  );
  return eventList;
};

const getEvent = async (id: string) => {
  const ref = db.collection("events").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

const addEvent = async (newEvent: NewEvent) => {
  const id: string = uuid();
  const event: Event = { ...newEvent, id };
  await db.collection("events").doc(id).set(event);
  return event;
};

const updateEvent = async (id: string, payload: Record<string, UserStatus>) => {
  await db.collection("events").doc(id).update(payload);
  const updatedEvent = await getEvent(id);
  return updatedEvent;
};

export default { getEvents, getEvent, addEvent, updateEvent };
