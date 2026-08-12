import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQhSt6k4fb52sZNFFlct-1vRH-29PPLf4",
  authDomain: "ahmed-aya-wedding.firebaseapp.com",
  projectId: "ahmed-aya-wedding",
  storageBucket: "ahmed-aya-wedding.firebasestorage.app",
  messagingSenderId: "928396907185",
  appId: "1:928396907185:web:19f0210b5b3edea62c4890",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);