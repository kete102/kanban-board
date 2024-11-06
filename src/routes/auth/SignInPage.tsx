/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@/components'
import { UserActions } from '@/services/user'
import { SignedOut, SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const SignInPage = () => {
  const { isSignedIn, userId } = useAuth()
  const { saveUserData } = UserActions()

  console.log('SignIn Page load')
  useEffect(() => {
    if (isSignedIn) saveUserData()
  }, [])

  //TODO: hacer un login custom
  return (
    <Container>
      <div className="grid h-dvh w-full place-content-center">
        <h1 className="mb-4 text-center text-4xl font-bold">Welcome! 🙃</h1>
        <SignedOut>
          <SignIn fallbackRedirectUrl={`/${userId}`} />
        </SignedOut>
      </div>
    </Container>
  )
}
