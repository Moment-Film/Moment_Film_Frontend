import React from 'react'
import { useNavigate } from 'react-router'

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate(`/`)}>Home</button>
      <button onClick={()=>navigate(`/signup`)}>Sign Up</button>
      <button onClick={()=>navigate(`/login`)}>Log In</button>
      <button onClick={()=>navigate(`/post`)}>Post</button>
      <button onClick={()=>navigate(`/post/1`)}>PostDetail</button>
      <button onClick={()=>navigate(`/camera`)}>📸⚠️</button>
    </div>
  )
}

export default Home