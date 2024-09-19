/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@/components'
import { createUser } from '@/services/user'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth') {
      // Si el usuario no esta auth y no esta en /auth, redirigir a /auth
      navigate('/auth')
    }
  }, [isSignedIn, navigate, location.pathname])

  useEffect(() => {
    //NOTE: Solo se hace el guardado si esta auth y si  hay un userId
    if (isSignedIn && user?.id && user.username) {
      createUser(user.id, user.username).catch(error => {
        console.error(error)
      })
    }
  }, [isSignedIn])

  return (
    <Container>
      <h1 className="mb-14 mt-10 text-7xl font-bold text-white">
        Kanban Board
      </h1>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
