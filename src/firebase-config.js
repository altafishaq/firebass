import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAu8kZaj1x3iyAeqECpwnD8vtR0ER589x4",
    authDomain: "crud-300ba.firebaseapp.com",
    projectId: "crud-300ba",
    storageBucket: "crud-300ba.appspot.com",
    messagingSenderId: "365494047054",
    appId: "1:365494047054:web:f5977610165fc364508e1f"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  

  

  export const db = getFirestore(app);
  export const usersRef = collection(db, 'users');
  
  export default app;
