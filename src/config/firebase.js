// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNjgBmW9Zl_SNpgyZPVCNBRMNAu_f6x-4",
  authDomain: "financeproject-4b624.firebaseapp.com",
  projectId: "financeproject-4b624",
  storageBucket: "financeproject-4b624.appspot.com",
  messagingSenderId: "64034546025",
  appId: "1:64034546025:web:d92a88f5fcbd0e8196ddf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db
