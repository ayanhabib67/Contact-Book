import React, { useState } from 'react'
import InputFeildCmp from '../../components/InputFeildCmp';
import ButtonCmp from '../../components/ButtonCmp';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireBase';
import styles from "./index.module.css";
import Swal from 'sweetalert2';


let  LoginPage = () => {


  let [loginEmail ,setLoginEmail] = useState("")
  let [loginPassword ,setloginPassword] = useState("")


  const navigate = useNavigate();

let loginHandler = async ()=>{
  console.log(loginEmail);
  console.log(loginPassword);
  



   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
   .then((userCredential) => {
     const user = userCredential.user.uid;
     localStorage.setItem("uid", user);
     console.log("Login Successful:", user);
 
     Swal.fire({
       icon: "success",
       title: "Login Successful 🎉",
       text: "Welcome back! You are now logged in.",
       confirmButtonColor: "#1d4ed8",
     }).then(() => {
       navigate("/Contact"); 
     });
   })
   .catch((error) => {
     console.error("❌ Login Error:", error.message);
 
     Swal.fire({
       icon: "error",
       title: "Login Failed 😢",
       text: error.message, 
       confirmButtonColor: "#d33",
     });
   });
 


   
}




return (
  <div className={styles.container}>
    <div className={styles.card}>
    <h2 className={styles.title}>
  Login <br /> Contact Book
</h2>


      <p className={styles.subtitle}>Enter your credentials to continue</p>

      <div className={styles.form}>
      <InputFeildCmp
  title="Email"
  placeholder="Enter your email"
  onChange={(e) => setLoginEmail(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db", 
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  }}
  onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
  onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
/>

<InputFeildCmp
  title="Password"
  placeholder="Enter your password"
  onChange={(e) => setloginPassword(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  }}
  onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
  onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
/>

        <button className={styles.button} onClick={loginHandler}>
          Login
        </button>
      </div>

      <p className={styles.signup}>
        Don’t have an account?{" "}
        <Link to="/signup" className={styles.link}>
          Signup
        </Link>
      </p>
    </div>
  </div>
);

}

export default LoginPage  