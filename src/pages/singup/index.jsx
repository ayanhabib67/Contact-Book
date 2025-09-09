import React, { useState } from 'react'
import InputFeildCmp from '../../components/InputFeildCmp';
import ButtonCmp from '../../components/ButtonCmp';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./index.module.css";
import { auth } from "../../fireBase";
import Swal from 'sweetalert2';


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
 
  
  if (singUpPassword.length === 6 && singUpConfotmPassword.length === 6) {
    
    
    
    
    try {
      await createUserWithEmailAndPassword(auth, singUpEmail, singUpPassword);
    
      Swal.fire({
        icon: "success",
        title: "Successful SignUp",
        html: `
          <p>Your account has been created successfully!</p>
          <p><b>Now please login to continue</b></p>`,
        confirmButtonText: "Login",
        confirmButtonColor: "#1d4ed8",
      }).then(() => {
        console.log("user signup");
        navigate("/");
      });
    
    } catch (error) {
      console.error(error.message);
    
      Swal.fire({
        icon: "error",
        title: "Oops! 😢",
        text: error.message, 
        confirmButtonColor: "#d33",
      });
    }
    
  

}else{
  Swal.fire({
    icon: "warning",
    title: "Weak Password ⚠️",
    text: "Password must be at least 6 characters long to Sign Up.",
    confirmButtonColor: "#f59e0b",
  });
  
}
  
} else {
  console.error("❌ Passwords do not match");
  Swal.fire({
    icon: "error",
    title: "Passwords do not match ❌",
    text: "Please make sure both password fields are the same.",
    confirmButtonColor: "#d33"
  });
  
}





}







return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Create Account</h2>
      <p className={styles.subtitle}>
  Your personal contact manager, simple and secure 🔐
</p>


      <div className={styles.form}>
      <InputFeildCmp
  title="Email"
  placeholder="Enter Your Email"
  onChange={(e) => setSingUpEmail(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s ease",
  }}
/>

<InputFeildCmp
  title={inputType}
  placeholder={showPassword || "Enter Your Password"}
  onChange={(e) => setsingUpPassword(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  }}
/>

<InputFeildCmp
  title={inputType}
  placeholder="Confirm Password"
  onChange={(e) => setSingUpConfotmPassword(e.target.value)}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  }}
/>

<p className={styles.note}>Password Length Minimum 6 Letters</p>

<ButtonCmp
  onClick={checkPasswssword}
  text="Show Password"
  style={{
    backgroundColor: "#2563eb", 
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
/>


<ButtonCmp
  text="Signup"
  onClick={signupHandler}
  style={{
    backgroundColor: "#16a34a", 
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
/>

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
