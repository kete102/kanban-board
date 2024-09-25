/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@/components'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, userId } = useAuth()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth/*') {
      // Si el usuario no esta auth y no esta en /auth, redirigir a /auth
      navigate('/auth/sign-in')
    } else {
      navigate(`/${userId}`)
    }
  }, [isSignedIn, navigate])

  return (
    <Container>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
