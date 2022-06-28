import { useState } from 'react';
// import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

// import { UserContext } from '../../contexts/user.context';
// // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
// // yg otomatis mendeteksi perubahan state user di user context

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // console.log(formFields);

  // const { setCurrentUser } = useContext(UserContext);
  // // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
  // // yg otomatis mendeteksi perubahan state user di user context

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword){
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // console.log(user);

      // // ketika seseorang signup , otomatis app juga 
      // // melakukan sign-in user tsb utk pertama kali
      // setCurrentUser(user);

      // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
      // yg otomatis mendeteksi perubahan state user di user context

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();

    }catch(error){
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }else{
        console.error('user creation encountered an error', error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Display Name" 
          inputOptions = {{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName 
          }}
        />

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
            autoComplete:"off"
          }}
        />

        <FormInput 
          label="Confirm Password" 
          inputOptions = {{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            autoComplete:"off"
          }}
        />

        <Button type="submit">Sign Up</Button>

      </form>
    </div>
  );

}

export default SignUpForm;