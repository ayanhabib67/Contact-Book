import React, { useState } from 'react'
import InputFeildCmp from '../../components/InputFeildCmp';
import ButtonCmp from '../../components/ButtonCmp';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireBase';
import styles from "./index.module.css";


let  LoginPage = () => {


  let [loginEmail ,setLoginEmail] = useState("")
  let [loginPassword ,setloginPassword] = useState("")


  const navigate = useNavigate();

let loginHandler = async ()=>{
  console.log(loginEmail);
  console.log(loginPassword);
  



   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log(user);
    navigate("/Contact");
    
  })
  .catch((error) => {
  console.log(error.message);
  
  });


   
}




  
return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.subtitle}>Enter your credentials to continue</p>

      <div className={styles.form}>
        <InputFeildCmp
          title="Email"
          placeholder="Enter Your Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <InputFeildCmp
          title="Password"
          placeholder="Enter Your Password"
          onChange={(e) => setloginPassword(e.target.value)}
        />
        <ButtonCmp text="Login" onClick={loginHandler} />
      </div>

      <p className={styles.signup}>
        Create Account?{" "}
        <Link to="/signup" className={styles.link}>
          Signup
        </Link>
      </p>
    </div>
  </div>
);
}

export default LoginPage  