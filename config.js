import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANffT-wZfAgarpQEaC90yfXnIaguQkEUU",
  authDomain: "photoeditor-83e9e.firebaseapp.com",
  projectId: "photoeditor-83e9e",
  storageBucket: "photoeditor-83e9e.appspot.com",
  messagingSenderId: "966035117399",
  appId: "1:966035117399:web:14a6ea2fa6d33218af5a12",
  measurementId: "G-3KSPH3SH72"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};
