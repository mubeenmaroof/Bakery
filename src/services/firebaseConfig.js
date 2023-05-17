import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA-xr0Q2k6h_JxNNFPbJOgkw0l7l1agyrA",
    authDomain: "bakery-backend-26484.firebaseapp.com",
    projectId: "bakery-backend-26484",
    storageBucket: "bakery-backend-26484.appspot.com",
    messagingSenderId: "477903395609",
    appId: "1:477903395609:web:f9fba53fb7077379608388",
    measurementId: "G-2GGT700EPJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebase };

