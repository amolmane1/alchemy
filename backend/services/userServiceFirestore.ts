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
import { User, UserWithoutId, UserWithoutIdAndPassword } from "../utils/types";

const getUsers = async () => {
  const ref = db.collection("users");
  const snapshot: QuerySnapshot = await ref.get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
  return data;
};

const getUser = async (id: string) => {
  const ref = db.collection("users").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

const addUser = async (userWithoutId: UserWithoutId) => {
  const id: string = userWithoutId.email;
  const user: User = { ...userWithoutId, id };
  const result = await db.collection("users").doc(id).set(user);
  const newUser: UserWithoutIdAndPassword = {
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    location: result.location,
  };
  return newUser;
};

export default { getUsers, getUser, addUser };
