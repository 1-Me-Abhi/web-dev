// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuJKm1e4csTDf7M99CRb8FJCSGBPvB6w8",
  authDomain: "hotel-saas.firebaseapp.com",
  projectId: "hotel-saas",
  storageBucket: "hotel-saas.firebasestorage.app",
  messagingSenderId: "928595297518",
  appId: "1:928595297518:web:a053b58e142c0270245fff",
  measurementId: "G-7JKVJJXXKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
