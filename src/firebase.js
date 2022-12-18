import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC07R1OTW4lh9lcw3T9XSI0P2E8o024KfM",
  authDomain: "chat-1b1c6.firebaseapp.com",
  projectId: "chat-1b1c6",
  storageBucket: "chat-1b1c6.appspot.com",
  messagingSenderId: "434750101798",
  appId: "1:434750101798:web:47bd70f41424e26e15c9e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)