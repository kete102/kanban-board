/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from '@/app/hooks'
import { Container } from '@/components'
import { setUser } from '@/features/user/userSlice'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface UserDataResponse {
  message: string
  user: {
    clerkId: string
    username: string
    imageUrl: string
  }
}

export const RootLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, getToken } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/auth/sign-in') {
      // Si el usuario no esta auth y no esta en /auth, redirigir a /auth
      navigate('/auth/sign-in')
    }
  }, [isSignedIn, navigate, location.pathname])

  useEffect(() => {
    const saveUserData = async () => {
      //NOTE: Solo se hace el guardado si esta auth y si  hay un userId
      if (isSignedIn && user?.id && user.username) {
        const token = await getToken()

        fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            const userData: UserDataResponse = data
            dispatch(
              setUser({
                userId: userData.user.clerkId,
                userName: userData.user.username,
                boards: []
              })
            )
            navigate(`/:${userData.user.clerkId}`)
          })
      }
    }

    saveUserData()
  }, [isSignedIn])

  return (
    <Container>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
