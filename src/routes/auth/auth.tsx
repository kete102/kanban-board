import { MainContent } from '@/components'
import { SignedOut, SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) navigate('/')
  }, [isSignedIn, navigate])

  return (
    <MainContent>
      <div className="flex h-full w-full flex-col items-center justify-center gap-14">
        <h2 className="text-4xl font-medium text-indigo-50">
          <span className="underline-offset-3 underline decoration-indigo-600 decoration-8">
            Sign in or Create a new account
          </span>
        </h2>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </div>
    </MainContent>
  )
}
