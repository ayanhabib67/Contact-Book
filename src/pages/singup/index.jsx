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
let [singUpConfotmPassword , setSingUpConfotmPassword] = useState("")
let [showPassword, setShowPassword] = useState("");
let [showConformPassword, setShowConformPassword] = useState("");

let [inputType, setInputType] = useState("password"); 



const navigate = useNavigate();


let  checkPasswssword = ()=>{
  console.log(showConformPassword);
  

  
  setShowPassword(singUpPassword);
  setShowConformPassword(singUpConfotmPassword) 
  setInputType((prev) => (prev === "password" ? "text" : "password"));




}




let signupHandler  = async  ()=>{

  setShowPassword(singUpPassword);






if (singUpPassword === singUpConfotmPassword) {
 
  
  
  
  
  
  
  await createUserWithEmailAndPassword(auth, singUpEmail, singUpPassword)
  .then(() => {
    console.log("user signup");
    navigate("/Contact");
    
  })
  .catch((error) => {
  console.log(error.message);
  
  });
  

  
} else {
  console.error("❌ Passwords do not match");
  alert("❌ Passwords do not match")
}





}







return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>Join us and get started 🚀</p>

      <div className={styles.form}>
        <InputFeildCmp
          title="Email"
          placeholder={"Enter Your Enter Email"}
          onChange={(e) => setSingUpEmail(e.target.value)}
        />
        <InputFeildCmp
          title={inputType}
          placeholder={showPassword || "Enter Your Password"}
          onChange={(e) => setsingUpPassword(e.target.value)}
        />

        <InputFeildCmp  placeholder="conform Password" 
          title={inputType}
          onChange={(e) => setSingUpConfotmPassword(e.target.value)}
        
        />
 <ButtonCmp   onClick={checkPasswssword}   text='Cheack Password' />

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
