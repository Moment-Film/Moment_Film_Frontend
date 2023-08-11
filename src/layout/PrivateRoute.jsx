import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

function PrivateRoute() {
  const loginInfo = useSelector((state)=>state.AccessToken.accessToken);

  if (loginInfo) {
    return <Outlet />
  }
  else {
    alert("로그인이 필요합니다.");
    return <Navigate to='/login' />
  }
}

export default PrivateRoute;
