// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdwjtC2xC_cdzVTqu1nQv9PcL7fqD9AJE",
  authDomain: "finance-dashboard-30ee7.firebaseapp.com",
  projectId: "finance-dashboard-30ee7",
  storageBucket: "finance-dashboard-30ee7.firebasestorage.app",
  messagingSenderId: "549909237626",
  appId: "1:549909237626:web:63f943678df2efe77c90c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
