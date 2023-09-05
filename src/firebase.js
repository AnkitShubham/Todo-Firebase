import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkcbzbTy9P2rI_jtFODJGQFAvCthwx3xA",
  authDomain: "todoapp-7d22c.firebaseapp.com",
  databaseURL: "https://todoapp-7d22c-default-rtdb.firebaseio.com",
  projectId: "todoapp-7d22c",
  storageBucket: "todoapp-7d22c.appspot.com",
  messagingSenderId: "487374927502",
  appId: "1:487374927502:web:c4d3da982b5564889cbbdf",
  measurementId: "G-HTVHJTWVB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, app, database };
