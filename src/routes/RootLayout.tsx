import { Container } from '@/components'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const RootLayout = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/auth')
    } else {
      navigate('/')
    }
  }, [isSignedIn, navigate])

  return (
    <Container>
      <h1 className="mb-20 text-7xl font-bold text-white">Kanban Board</h1>
      {/* <MainContent> */}
      <Outlet />
      {/* </MainContent> */}
    </Container>
  )
}
