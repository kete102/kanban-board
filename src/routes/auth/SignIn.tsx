import { MainContent } from '@/components'
import { useSaveUser } from '@/hooks/useAuth'
import { SignedOut, SignIn, useAuth, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const SignInPage = () => {
  const { saveUserData } = useSaveUser()

  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    saveUserData({ user, isSignedIn, getToken })
  }, [getToken, isSignedIn, saveUserData, user])

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
          <SignIn />
        </SignedOut>
      </div>
    </MainContent>
  )
}
