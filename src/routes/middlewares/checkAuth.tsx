import { UserActions } from '@/services/user'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoute() {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const { checkUserData } = UserActions()
  const navigate = useNavigate()

  console.log('ProtectedRoute')

  useEffect(() => {
    const verifyUser = async () => {
      console.log('verificar usuario')
      if (!isSignedIn) {
        console.log('no esta  signed in')
        navigate('/auth/sign-in', { replace: true })
        return
      }
      navigate(`/${userId}`)
    }
    if (isLoaded) {
      verifyUser()
    }
  }, [navigate, isSignedIn, isLoaded, checkUserData, userId])

  return <Outlet />
}
