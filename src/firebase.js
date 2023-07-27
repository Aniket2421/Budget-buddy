// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo136LOmMZawrAh_FcBUgQ1N0bUHjcjgc",
  authDomain: "budget-buddy-fef51.firebaseapp.com",
  projectId: "budget-buddy-fef51",
  storageBucket: "budget-buddy-fef51.appspot.com",
  messagingSenderId: "497245645783",
  appId: "1:497245645783:web:3ddfcab116ae13c54df992",
  measurementId: "G-WD6Q0YPSQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db,auth,doc,setDoc, provider}