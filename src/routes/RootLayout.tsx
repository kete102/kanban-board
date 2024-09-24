/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@/components'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn } = useAuth()
  const { userId } = useAuth()

  useEffect(() => {
    console.log('RootLayout Sign In: ', isSignedIn)
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
