import React, { useState } from 'react'
import InputFeildCmp from '../../components/InputFeildCmp';
import ButtonCmp from '../../components/ButtonCmp';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./index.module.css";
import { auth } from "../../fireBase";


let  SignupPage = ()=> {

 
let [singUpEmail , setSingUpEmail] = useState("")
let [singUpPassword , setsingUpPassword] = useState("")


const navigate = useNavigate();


let signupHandler  = async  ()=>{

console.log(singUpEmail);
console.log(singUpPassword);



 await createUserWithEmailAndPassword(auth, singUpEmail, singUpPassword)
  .then(() => {
    console.log("user signup");
    navigate("/Contact");

  })
  .catch((error) => {
  console.log(error.message);
  
  });







}







return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>Join us and get started 🚀</p>

      <div className={styles.form}>
        <InputFeildCmp
          title="Email"
          placeholder="Enter Your Email"
          onChange={(e) => setSingUpEmail(e.target.value)}
        />
        <InputFeildCmp
          title="Password"
          placeholder="Enter Your Password"
          onChange={(e) => setsingUpPassword(e.target.value)}
        />
        <ButtonCmp text="Signup" onClick={signupHandler} />
      </div>

      <p className={styles.login}>
        Already have an account?{" "}
        <Link to="/" className={styles.link}>
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default SignupPage
