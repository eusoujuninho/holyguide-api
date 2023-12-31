// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import config from './config.js'; // Certifique-se de que o caminho está correto

const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;