import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { 
  auth,
  // signInWithGooglePopup, 
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {
  useEffect(() => {
    // const response = await getRedirectResult(auth);
    // console.log(response);

    async function callBackSigninGoogleRedirect() {
      const response = await getRedirectResult(auth);

      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
      
      console.log(response);

    }

    callBackSigninGoogleRedirect();

  }, []);


  // const logGoogleUser = async () => {
  //   // const response = await signInWithGooglePopup();
  //   // console.log(response);

  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // }

  // KETIKA MENGGUNAKAN METODE (BLOK KODE ) DI BAWAH, APP KITA (SIGN-IN PAGE) AKAN REDIRECT KE GOOGLE SIGN IN PAGE
  // SETELAH SIGN IN MAKA GOOGLE PAGE AKAN REDIRECT KEMBALI KE PAGE SIGN-IN KITA
  // di sini terjadi perpindahan domain, maka data user dari page google signin TIDAK AKAN
  // TERFETCH KE APP/PAGE SIGN-IN KITA
  // SOLUSINYA ADALAH PAKAI useEffect dan getRedirectResult functions
  // useEffect tanpa args [], akan dimount sekali saja tiap page dirender

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log({user});
  // }

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}

      <SignInForm />
      <SignUpForm />

    </div>
  )
}

export default Authentication;