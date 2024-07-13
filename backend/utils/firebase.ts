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
