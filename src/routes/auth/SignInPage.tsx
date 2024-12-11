import { SignInButton, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { isSignedIn, isLoaded, userId } = useAuth()
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate(`/${userId}`)
      }
    }
  }, [navigate, isSignedIn, isLoaded, userId])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-900">
      <div className="flex w-full max-w-md flex-col items-center space-y-6 rounded-lg p-8">
        <h1 className="text-center text-5xl font-extrabold text-white">
          Kanban Board
        </h1>
        <p className="text-center text-lg text-gray-300">
          The best way to manage your tasks
        </p>
        <SignInButton mode="redirect">
          <button className="w-full max-w-[200px] rounded-md border-2 border-purple-900 bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-md transition duration-300 hover:from-blue-600 hover:to-indigo-700">
            Sign In
          </button>
        </SignInButton>
      </div>
    </div>
  )
}
