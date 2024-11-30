import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate(`/${userId}`)
        return
      }
      navigate('/auth/sign-in', { replace: true })
      return
    }
  }, [navigate, isSignedIn, isLoaded, userId])

  return <Outlet />
}
