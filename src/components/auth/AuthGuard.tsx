// src/components/AuthGuard.js
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth/sign-in') {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [isSignedIn, location.pathname, navigate])

  return <>{children}</>
}

export default AuthGuard
