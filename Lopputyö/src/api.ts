import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import type { Meal } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyCRt3XHMieE9JaO4ffxPCkuDPUApYti3lc",
  authDomain: "reseptivihko.firebaseapp.com",
  projectId: "reseptivihko",
  storageBucket: "reseptivihko.firebasestorage.app",
  messagingSenderId: "657349271610",
  appId: "1:657349271610:web:47674e0dda9b183da3d503",
  measurementId: "G-48E0SKQRP9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const saveRecipe = async (recipe: Meal) => {
  console.log("Tallennetaan resepti: ", recipe);
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipe);
    console.log("Resepti lisätty: ", docRef.id);
  } catch (e) {
    console.error("Virhe reseptin lisäämisessä: ", e);
  }
};

export { saveRecipe, db, auth };
