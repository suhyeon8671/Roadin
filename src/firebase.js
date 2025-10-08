// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbQHrNySd6JCjTwCdUsb5nmOILLFWD-Sw",
  authDomain: "roadin-2a495.firebaseapp.com",
  projectId: "roadin-2a495",
  storageBucket: "roadin-2a495.firebasestorage.app",
  messagingSenderId: "628635486917",
  appId: "1:628635486917:web:30db5ca3f8c312dac5beac",
  measurementId: "G-VYPNKRXMXQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase Functions and define the callable AI function
const functions = getFunctions(app);

// The 'chat' argument is the name of the prompt file we created (chat.prompt)
export const callChatAI = httpsCallable(functions, 'chat');
