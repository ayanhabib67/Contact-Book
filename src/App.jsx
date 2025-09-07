import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/singup';
import NotFound from './pages/NotFound';
import ContactPage from './pages/contact';
import AddContact from './pages/addContact';




let  App = ()=> {
  

  
  return (
    <>


<Routes >

  <Route  index element={<LoginPage />}  />
  <Route  path="/Signup" element={<SignupPage  />}  />
  <Route  path="/Contact" element={<ContactPage />}  />
  <Route  path='/add-contact'  element={<AddContact /> }/>
  <Route  path="*" element={<NotFound />}  />




</Routes>

      
    </>
  )
}

export default App
