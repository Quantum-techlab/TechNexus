import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPFUj7VZv6ekJ4S5WyHv5U_trZcLLoc5g",
  authDomain: "technexus-f1ac1.firebaseapp.com",
  projectId: "technexus-f1ac1",
  storageBucket: "technexus-f1ac1.firebasestorage.app",
  messagingSenderId: "1006011805397",
  appId: "1:1006011805397:web:6d62c902aef10d9ed87c5c",
};

function getFirebaseApp(): FirebaseApp {
    if (getApps().length > 0) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
