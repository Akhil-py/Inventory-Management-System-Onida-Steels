// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_M4LznRF7zAfE73T3-qrAc9F-SiUK4YI",
  authDomain: "onida-steels-inventory.firebaseapp.com",
  projectId: "onida-steels-inventory",
  storageBucket: "onida-steels-inventory.appspot.com",
  messagingSenderId: "445952736474",
  appId: "1:445952736474:web:f0efe87cc70c4ab8bf79e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);