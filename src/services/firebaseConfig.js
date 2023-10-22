import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGHjWD6y5ij7ZAmw7ueECXhuigwbin0Jc",
  authDomain: "bakery-bd14b.firebaseapp.com",
  projectId: "bakery-bd14b",
  storageBucket: "bakery-bd14b.appspot.com",
  messagingSenderId: "1024982092465",
  appId: "1:1024982092465:web:57407af06a7d4331f27090",
  measurementId: "G-4DCGNZNT5L"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebase };
