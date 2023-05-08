import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAfLk2ezTTe3ZubnW6K5guPeI_vTa9ttpM",
    authDomain: "bakery-backend-c7836.firebaseapp.com",
    projectId: "bakery-backend-c7836",
    storageBucket: "bakery-backend-c7836.appspot.com",
    messagingSenderId: "775036255715",
    appId: "1:775036255715:web:857ff6dd576ddffc2074d6",
    measurementId: "G-WRSNEJH1SW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebase };

