// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQLohk3bgTmqZBjA6a3YCQv1aBUSmrIeE",
  authDomain: "swiggy-clone-410412.firebaseapp.com",
  projectId: "swiggy-clone-410412",
  storageBucket: "swiggy-clone-410412.appspot.com",
  messagingSenderId: "66649005508",
  appId: "1:66649005508:web:dedc8446d77739ceee5891",
  measurementId: "G-ER2DE7P63R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
