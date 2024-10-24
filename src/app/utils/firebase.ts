import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRazuFC0iZ-m22ZwvyrOGOOUh2KEjlg5M",
  authDomain: "craftiax.firebaseapp.com",
  projectId: "craftiax",
  storageBucket: "craftiax.appspot.com",
  messagingSenderId: "416327908691",
  appId: "1:416327908691:web:c89190ce8f0ad6960d75a6",
  measurementId: "G-6HFZP0NP15"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
