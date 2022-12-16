// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjHoRGI_QrpQnZHD0EAA7ulxXkrvBYko4",
  authDomain: "signal-clone-c053c.firebaseapp.com",
  projectId: "signal-clone-c053c",
  storageBucket: "signal-clone-c053c.appspot.com",
  messagingSenderId: "992072017074",
  appId: "1:992072017074:web:6ab6cfd70346519ebfd5ab",
  measurementId: "G-GVEPEXHK01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);