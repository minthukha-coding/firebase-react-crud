import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD24ZWTFKemSlRIEfPoYo4OoJNdgvTYqJY",
  authDomain: "fir-10-lemon.firebaseapp.com",
  projectId: "fir-10-lemon",
  storageBucket: "fir-10-lemon.appspot.com",
  messagingSenderId: "146174372366",
  appId: "1:146174372366:web:74e75a6bc16b42bdfc2a5f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);