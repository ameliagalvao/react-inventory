import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0AzhcOQwE58i7nMdxS45L759sSWKBnbc",
  authDomain: "crud-pb-react.firebaseapp.com",
  projectId: "crud-pb-react",
  storageBucket: "crud-pb-react.appspot.com",
  messagingSenderId: "812487264080",
  appId: "1:812487264080:web:c652dfdb917dc6b2ce8e55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);