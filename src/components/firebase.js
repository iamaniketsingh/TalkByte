import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApAuI0sJibrEXhT9ujUGaTfa2ui8Ws5Pw",
  authDomain: "talkbyte-5a773.firebaseapp.com",
  projectId: "talkbyte-5a773",
  storageBucket: "talkbyte-5a773.appspot.com",
  messagingSenderId: "269982674960",
  appId: "1:269982674960:web:959a7fc620a1c34c385a95",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
};
