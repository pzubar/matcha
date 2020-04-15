import React, { useState } from 'react'
import Login from './LogIn'
import SignUp from './SignUp'
import Button from '@material-ui/core/Button'

const Auth = () => {
  const [isSignUpFlow, setIsSignUpFlow] = useState<boolean>(false)

  return (
    <>
      {isSignUpFlow ? (
        <>
          <SignUp navigateToLogin={() => setIsSignUpFlow(false)} />
        </>
      ) : (
        <>
          <Login navigateToSignUp={() => setIsSignUpFlow(true)} />
        </>
      )}
    </>
  )
}

export default Auth
