// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Importar getStorage para o Storage
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCgJ5csHnSKuhwR5kbqiM8YwLNS5z6iQAY",
  authDomain: "holyguide-41f6e.firebaseapp.com",
  projectId: "holyguide-41f6e",
  storageBucket: "holyguide-41f6e.appspot.com",
  messagingSenderId: "456556572583",
  appId: "1:456556572583:web:96171f36c0a31d73151082",
  measurementId: "G-490YLDTSQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get references to the Firestore, Auth, and Storage services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Inicializar o módulo de Storage

export { db, auth, storage };
