
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA02svZSAHaVN-Rg8D29YPHt-4c2CpwPdM",
  authDomain: "rentel-4f19a.firebaseapp.com",
  projectId: "rentel-4f19a",
  storageBucket: "rentel-4f19a.firebasestorage.app",
  messagingSenderId: "935618491543",
  appId: "1:935618491543:web:9e2beb00db25526bd265d2",
  measurementId: "G-NMX22TTD6X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };