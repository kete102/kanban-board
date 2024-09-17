import { SignedOut, SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
  return (
    <div className="flex flex-col items-center">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  )
}
