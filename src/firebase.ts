import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAH092qxNXgumHlSQOcLaAW3Sp7l_9tqf8",
    authDomain: "task-manager-75ce1.firebaseapp.com",
    projectId: "task-manager-75ce1",
    storageBucket: "task-manager-75ce1.appspot.com",
    messagingSenderId: "960938062772",
    appId: "1:960938062772:web:3b2a78c1aabf122f1838e1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
