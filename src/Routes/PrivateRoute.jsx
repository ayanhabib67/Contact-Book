import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    console.log("uid",!!localStorage.getItem("uid"));
    
  return localStorage.getItem("uid") ? <Outlet /> :<Navigate to={"/"} />
}

export default PrivateRoute
