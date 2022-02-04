import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9UPkSgoAQ1OCNhVr2HpLRHNGsFJt0yEM",
  authDomain: "blogapp-cfaa0.firebaseapp.com",
  projectId: "blogapp-cfaa0",
  storageBucket: "blogapp-cfaa0.appspot.com",
  messagingSenderId: "688399960366",
  appId: "1:688399960366:web:88ee11811dc7ec9f7492bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);
export { auth, signInWithGoogle, logInWithEmailAndPassword, logout, };
