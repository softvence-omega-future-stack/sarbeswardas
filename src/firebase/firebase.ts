// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCah7epGdne0HMzHyX_PuRnfnvKOpriXUw",
  authDomain: "sarbeswardas.firebaseapp.com",
  projectId: "sarbeswardas",
  storageBucket: "sarbeswardas.firebasestorage.app",
  messagingSenderId: "539158747573",
  appId: "1:539158747573:web:7a22129134cd163dd3a1fc",
  measurementId: "G-XMM5EE9PWM",
};

const app = initializeApp(firebaseConfig);

// Initialize Auth and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
