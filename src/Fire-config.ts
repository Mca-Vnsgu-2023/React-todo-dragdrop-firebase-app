import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId:process.env.REACT_MEASUREMENT_ID
})

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;

// const firebaseConfig = {
//     apiKey: "AIzaSyCVVhprtMJaeSkmJfLzIMEQTl7imp5OF54",
//     authDomain: "react-todo-app-74d9e.firebaseapp.com",
//     projectId: "react-todo-app-74d9e",
//     storageBucket: "react-todo-app-74d9e.appspot.com",
//     messagingSenderId: "239587739758",
//     appId: "1:239587739758:web:2c34e305efc22faf0e3e7f",
//     measurementId: "G-FXY8HNERRB"
//   };

//   export default firebaseConfig