import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "moevies-3fa4e.firebaseapp.com",
    projectId: "moevies-3fa4e",
    storageBucket: "moevies-3fa4e.appspot.com",
    messagingSenderId: "491960073631",
    appId: "1:491960073631:web:f4f00eb44e2109b612d1aa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export default app;
