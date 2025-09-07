import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "fireBase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAoVGNSHEgjsGLL61BqYs1bLOSzC21I9uE",
  authDomain: "contact-book-with-firebase.firebaseapp.com",
  projectId: "contact-book-with-firebase",
  storageBucket: "contact-book-with-firebase.firebasestorage.app",
  messagingSenderId: "771576628158",
  appId: "1:771576628158:web:fb4ef195e261aa98bbafef",
  measurementId: "G-BNBM0RGX77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app,
    auth,
    db
}