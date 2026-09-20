
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-31b60.firebaseapp.com",
  projectId: "interviewiq-31b60",
  storageBucket: "interviewiq-31b60.firebasestorage.app",
  messagingSenderId: "355372803407",
  appId: "1:355372803407:web:4860b10f5e362061d9513a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth , provider}