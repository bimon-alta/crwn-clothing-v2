import { useState } from 'react';
// import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import { 
  signInWithGooglePopup, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  // // mengambil object function setCurrentUser
  // // yg merupakan SETTER STATE utk state currentUser dari Context
  // const { setCurrentUser } = useContext(UserContext);

  // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
  // yg otomatis mendeteksi perubahan state user di user context

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    
    // const { user } = await signInWithGooglePopup();
    // setCurrentUser(user);
    // createUserDocumentFromAuth(user);
    // // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
    // // yg otomatis mendeteksi perubahan state user di user context
    

    // const userDocRef = await createUserDocumentFromAuth(user);

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      // console.log(response);

      // // mengambil Object `user` dari proses Sign In lalu menyimpannya di Context
      // // agar bisa diambil oleh semua komponen di lingkup Provider
      // setCurrentUser(user);

      // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
      // yg otomatis mendeteksi perubahan state user di user context

      resetFormFields();

    }catch(error){

      switch(error.code){
        case "auth/wrong-password": 
          alert('incorrect password for email');
          break;
        case "auth/user-not-found":
          alert('no user associated with this email')
          break;
        default:
          console.log(error)
      }


    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Email" 
          inputOptions = {{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email 
          }}
        />

        <FormInput 
          label="Password"
          inputOptions = {{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
            autoComplete:"on"
          }}
        />

        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>

      </form>
    </div>
  );

}

export default SignInForm;