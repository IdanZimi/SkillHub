import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { redirect } from "react-router-dom";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDAdPJ1TuJSIKlEzLUUgwGS23e_Cow_Rus",
    authDomain: "skillhub-f0207.firebaseapp.com",
    projectId: "skillhub-f0207",
    storageBucket: "skillhub-f0207.appspot.com",
    messagingSenderId: "818135456620",
    appId: "1:818135456620:web:0e172ce116377481c47149",
    measurementId: "G-ZDBY02J5PY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const authStateChanged = onAuthStateChanged;

const signInWithGoogle = async () => {
    signInWithExternalApi(googleProvider)
};

const signInWithFacebook = async () =>{
    signInWithExternalApi(facebookProvider)
}
const signInWithExternalApi = async (provider) => {
    try {
        const res = await signInWithPopup(auth, provider);
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
            localStorage.setItem('isAuthenticated', true);
            redirect("/")
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('isAuthenticated', true);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    redirect("/")
};

const registerWithEmailAndPassword = async (name, email, password, skills=[]) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password, skills);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            skills
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    storage,
    authStateChanged,
    signInWithFacebook,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};