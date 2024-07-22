import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import eventService from "../services/eventService";
import { useAppDispatch } from "../utils/hooks";
import { setUser, removeUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const firestoreApiKey = import.meta.env.VITE_FIRESTORE_API_KEY;
// Configure Firebase.
const config = {
  apiKey: firestoreApiKey,
  authDomain: "firestore-course-3faf9.firebaseapp.com",
  projectId: "firestore-course-3faf9",
  storageBucket: "firestore-course-3faf9.appspot.com",
  messagingSenderId: "248350603342",
  appId: "1:248350603342:web:3b83ce0c3c88e5d295eb1f",
};
const app = firebase.initializeApp(config);
const db = getFirestore(app);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {
      // window.location.href = "/"; // Redirect to your main app page
      return false;
    },
  },
  // signInSuccessUrl: "/",
};

function SignInScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        setIsSignedIn(!!firebaseUser);
        if (firebaseUser) {
          const ref = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);
          const user = {
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
          };

          if (!snap.exists()) {
            console.log("Creating new user in users collection in firestore");
            await setDoc(ref, user);
          }

          const token = await firebaseUser.getIdToken();
          eventService.setToken(token);
          const userState = { ...user, token };
          dispatch(setUser(userState));
          window.localStorage.setItem("user", JSON.stringify(userState));
          navigate("/");
        } else {
          eventService.setToken(null);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      pt="100px"
    >
      <Box
        width="400px"
        padding="8"
        boxShadow="lg"
        borderRadius="md"
        backgroundColor="white"
        textAlign="center"
      >
        {isSignedIn ? (
          <Box>
            <Heading size="md">
              Welcome {firebase.auth().currentUser?.displayName}!
            </Heading>
            <Text>You are now signed-in.</Text>
          </Box>
        ) : (
          <Box>
            <Heading size="md">Please sign-in:</Heading>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default SignInScreen;
