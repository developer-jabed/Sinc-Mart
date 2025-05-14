// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWB1OJwXLqnfL10Ood7SWkIE_hWkjEXEE",
  authDomain: "sinc-mart.firebaseapp.com",
  projectId: "sinc-mart",
  storageBucket: "sinc-mart.firebasestorage.app",
  messagingSenderId: "817104880419",
  appId: "1:817104880419:web:f94b1a143ebb3189e88296"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;