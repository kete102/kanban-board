import { Container } from '@/components'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth/sign-in') {
      // Si el usuario no esta auth y no esta en /auth, redirigir a /auth
      navigate('/auth/sign-in')
    }
  }, [isSignedIn, navigate, location.pathname])

  return (
    <Container>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
