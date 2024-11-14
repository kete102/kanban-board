import { Container } from '@/components'
import { UserActions } from '@/services/user'
import { SignedOut, SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignInPage = () => {
  const { isSignedIn, userId } = useAuth()
  const { saveUserData } = UserActions()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      saveUserData()
      navigate(`/${userId}`)
    }
  }, [isSignedIn, navigate, saveUserData, userId])

  //TODO: hacer un login custom
  return (
    <Container>
      <div className="grid h-dvh w-full place-content-center">
        <h1 className="mb-4 text-center text-4xl font-bold">Welcome! 🙃</h1>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </div>
    </Container>
  )
}
