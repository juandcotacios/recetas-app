import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCziYC2iiGCPL95zwe1AdjDD_3Bx4sTJbg",
  authDomain: "desarrolloapps-f22de.firebaseapp.com",
  databaseURL: "https://desarrolloapps-f22de-default-rtdb.firebaseio.com",
  projectId: "desarrolloapps-f22de",
  storageBucket: "desarrolloapps-f22de.firebasestorage.app",
  messagingSenderId: "661020687115",
  appId: "1:661020687115:web:47e9d5fa2165b6bcfec00e",
  measurementId: "G-XM7CTVQQH5"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
