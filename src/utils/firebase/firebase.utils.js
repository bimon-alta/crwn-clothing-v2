import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration
// apiKey ini tidak terlalu rahasia, pemilik google firebase adalah master
const firebaseConfig = {
  apiKey: "AIzaSyBsyr10A-cYUgqMiR636S-osdnKX4NRQsE",
  authDomain: "crwn-clothing-v2-db-b4129.firebaseapp.com",
  projectId: "crwn-clothing-v2-db-b4129",
  storageBucket: "crwn-clothing-v2-db-b4129.appspot.com",
  messagingSenderId: "779794158559",
  appId: "1:779794158559:web:c2f01ca8a6cb3710cb6a6a"
};

// firebase membuat instance app sebagaimana kita definisikan di awal register app
// Ada project `crwn-clothing-v2-db`, di bawah project bisa dibuat sub-sub app, cth :
// crwn-clothing-v2-web-app
const firebaseApp = initializeApp(firebaseConfig);  // setiap instance of app dibuat, dibutuhkan konfigurasi

// provider uth authentikasi user (bisa signinRedirect atau signinPopup)
const googleProvider = new GoogleAuthProvider();

// mendefinisikan apa yg dilakukan setiap ada request ke provider auth
// adalah utk memilih akun terkait
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// this instance allow us to access documents from Firestore DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  // create object doc dari row/doc di collection users pd db firebase
  // dicari yg mengandung value=userAuth.uid
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // // Cek apakah user yg login ada di DB
  // console.log('Is signed In user exist on DB : ', userSnapshot.exists());

  // if user data does not exist
  // create/set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }
  
  // if user data exists
  // return userDocRef

  return userDocRef;



}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => {
  
  onAuthStateChanged(auth, callback);
}