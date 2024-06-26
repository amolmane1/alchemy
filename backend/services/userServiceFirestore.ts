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
import { User, UserWithoutId, UserWithoutIdAndPassword } from "../utils/types";

const getUsers = async () => {
  const ref = db.collection("users");
  const snapshot: QuerySnapshot = await ref.get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
  return data;
};

const getUser = async (email: string) => {
  const ref = db.collection("users");
  const snapshot: QuerySnapshot = await ref.where("email", "==", email).get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
  console.log(data);
  if (data.length == 0) {
    return null;
  } else {
    return data[0];
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
