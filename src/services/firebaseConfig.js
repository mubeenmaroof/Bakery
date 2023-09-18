import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoM7f7jhL-kQtb8GAU6jTojbB2h4DYSy4",
  authDomain: "bakery-5b24f.firebaseapp.com",
  projectId: "bakery-5b24f",
  storageBucket: "bakery-5b24f.appspot.com",
  messagingSenderId: "765420498328",
  appId: "1:765420498328:web:e6a6e9a821b422ed698fed",
  measurementId: "G-VN5WXB53BV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebase };
