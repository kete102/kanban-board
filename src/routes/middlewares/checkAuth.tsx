import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate('/auth/sign-in', { replace: true })
      } else if (userId) {
        navigate(`/${userId}`, { replace: true })
      }
    }
  }, [navigate, isSignedIn, isLoaded, userId])

  return <Outlet />
}
