// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIRESTORE_API_KEY,
//   authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
//   projectId: process.env.FIRESTORE_PROJECT_ID,
//   storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
//   appId: process.env.FIRESTORE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("../firestore_service_acct_key.json");

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
