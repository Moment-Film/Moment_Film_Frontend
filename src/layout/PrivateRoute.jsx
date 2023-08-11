import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

function PrivateRoute() {
  const loginInfo = useSelector((state)=>state.AccessToken.accessToken);
  return loginInfo ?
    <Outlet />
    : <Navigate to='/login' />
}

export default PrivateRoute;
