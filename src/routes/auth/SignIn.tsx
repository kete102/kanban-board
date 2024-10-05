/* eslint-disable react-hooks/exhaustive-deps */
import { UserActions } from '@/services/user'
import { SignedOut, SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const SignInPage = () => {
  const { isSignedIn } = useAuth()
  const { saveUserData } = UserActions()

  useEffect(() => {
    if (isSignedIn) saveUserData()
  }, [])

  return (
    <SignedOut>
      <SignIn path="/auth/sign-in" />
    </SignedOut>
  )
}
