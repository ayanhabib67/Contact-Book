import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/singup';
import NotFound from './pages/NotFound';
import ContactPage from './pages/contact';
import AddContact from './pages/addContact';
import PrivateRoute from './Routes/PrivateRoute';
import AuthRoute from './Routes/AuthRoute';




let  App = ()=> {
  

  
  return (
    <>


<Routes >


<Route  element={<AuthRoute />}>
  
  <Route  index element={<LoginPage />}  />
  <Route  path="/Signup" element={<SignupPage  />}  />

</Route>
  
  <Route  path="*" element={<NotFound />}  />


  <Route element={<PrivateRoute />} >

  <Route  path="/Contact" element={<ContactPage />}  />
  <Route  path='/add-contact'  element={<AddContact /> }/>

  </Route>


</Routes>

      
    </>
  )
}

export default App
