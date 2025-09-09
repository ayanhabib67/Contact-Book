import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRoute() {
  return (
 !localStorage.getItem("uid") ?
 <Outlet /> :<Navigate to={"/contact"} />


)
}

export default AuthRoute
