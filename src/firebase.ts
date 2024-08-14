import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator,} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";



// const firebaseConfig = {
//   apiKey: "AIzaSyC1WHW8WBi9IwQs8hleXgBEHrXZxuHFySk",
//   authDomain: "scisssor.firebaseapp.com",
//   projectId: "scisssor",
//   storageBucket: "scisssor.appspot.com",
//   messagingSenderId: "324099139772",
//   appId: "1:324099139772:web:82bad532f52520c40108b9",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


if(process.env.NODE_ENV === "development"){
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export { app, db, auth };
