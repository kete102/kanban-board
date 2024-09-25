/* eslint-disable react-hooks/exhaustive-deps */
import { MainContent } from '@/components'
import { useSaveUser } from '@/hooks/useAuth'
import { SignedOut, SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const SignInPage = () => {
  const { isSignedIn } = useAuth()
  const { saveUserData } = useSaveUser()

  useEffect(() => {
    if (!isSignedIn) saveUserData()
  }, [])

  return (
    <MainContent>
      <div className="flex h-full w-full flex-col items-center justify-center gap-20 bg-black">
        <section className="text-center">
          <h2 className="text-5xl font-medium text-indigo-50">
            <span className="underline-offset-3 underline decoration-indigo-600 decoration-8">
              Sign in or Create a new account
            </span>
          </h2>
        </section>
        <SignedOut>
          <SignIn path="/auth/sign-in" />
        </SignedOut>
      </div>
    </MainContent>
  )
}
