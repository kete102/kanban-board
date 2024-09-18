import { Container } from '@/components'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth') {
      // Si el usuario no esta auth y no esta en /auth, redirigir a /auth
      navigate('/auth')
    }
  }, [isSignedIn, navigate, location.pathname])

  return (
    <Container>
      <h1 className="mb-20 mt-10 text-7xl font-bold text-white">
        Kanban Board
      </h1>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
