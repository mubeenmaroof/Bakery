// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export { firebase };
