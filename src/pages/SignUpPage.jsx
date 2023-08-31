import React from 'react'
import SignUp from '../components/signUpPage/signUp'

function SignUpPage() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--whiteGray)",
    }}>
    <SignUp />
    </div>
  )
}

export default SignUpPage