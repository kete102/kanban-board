import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/auth/sign-in', { replace: true })
    } else {
      navigate(`/${userId}`)
    }
  }, [navigate, isSignedIn, isLoaded, userId])

  return <Outlet />
}
