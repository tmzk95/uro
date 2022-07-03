// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNv9exUKOAudtbVOazKHsva4gNKzrwDBE",
  authDomain: "dziabulki.firebaseapp.com",
  databaseURL:
    "https://dziabulki-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dziabulki",
  storageBucket: "dziabulki.appspot.com",
  messagingSenderId: "610244300559",
  appId: "1:610244300559:web:d3d3f010f6acc1bd82b87a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default getFirestore();
