// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu_JAOS1jwZgqMBW8SErtTDzEqfnxnnCo",
  authDomain: "devassist-45f52.firebaseapp.com",
  projectId: "devassist-45f52",
  storageBucket: "devassist-45f52.firebasestorage.app",
  messagingSenderId: "481057347130",
  appId: "1:481057347130:web:790cb056a83f5dd24b0703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
