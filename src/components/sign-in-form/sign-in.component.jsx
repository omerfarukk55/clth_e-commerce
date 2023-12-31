import { useState } from "react";
import FormInput from "../form-input/form.input.component";
import Button from "../button/button.component";



import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  // UserContext, UserContext'inizin adı olarak varsayılan olarak kullanıldıysa değiştirilebilir

  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Etkinlik nesnesini almak için fonksiyon parametresini ekledik
    
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
        );
    resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          resetFormFields();
          alert("yanlış şifre");
          break;
        case "auth/invalid-login-credentials":
          resetFormFields();  
        alert("kullanıcı bulunamadı");
          break;
        default:
          resetFormFields();
          console.log(error);
          
      }
    }
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <span>Hesabınız zaten var mı </span>
      <h2>Email ve Şifre ile Giriş yapınız </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">giriş</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            GOOGLE İLE GİRİŞ
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
