import { SignedOut, SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-20 text-center text-7xl font-bold">Welcome !!!</h1>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  )
}
