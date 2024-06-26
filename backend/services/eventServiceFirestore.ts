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
import { EventFilterQuery, NewEvent, Event } from "../utils/types";

const getEvents = async () => {
  const eventsRef = db.collection("events");
  const snapshot: QuerySnapshot = await eventsRef.get();
  const eventList = snapshot.docs.map((doc: QueryDocumentSnapshot) =>
    doc.data()
  );
  return eventList;
};

const addEvent = async (newEvent: NewEvent) => {
  const id: string = uuid();
  const event: Event = { ...newEvent, id };
  await db.collection("events").doc(id).set(event);
  return event;
};

export default { getEvents, addEvent };
