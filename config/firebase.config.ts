import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAlzqCn5VNPhuK67WH3QPh_pq2_Ry-4z4",
  authDomain: "aplikasicatatan-f0b1c.firebaseapp.com",
  projectId: "aplikasicatatan-f0b1c",
  storageBucket: "aplikasicatatan-f0b1c.firebasestorage.app",
  messagingSenderId: "464690930469",
  appId: "1:464690930469:web:30f1b39b24a262d88870cc",
  measurementId: "G-9HSPY8EKKL"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


