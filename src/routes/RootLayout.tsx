/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from '@/app/hooks'
import { Container } from '@/components'
import { setUser } from '@/features/user/userSlice'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const dispatch = useAppDispatch()
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
      dispatch(
        setUser({ userId: user.id, userName: user.username, boards: [] })
      )
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
