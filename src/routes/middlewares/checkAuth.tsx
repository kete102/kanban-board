import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [navigate, isSignedIn, isLoaded])

  return <Outlet />
}
