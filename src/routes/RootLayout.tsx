import Container from '@/components/Container'
import { MainContent } from '@/components/MainContent'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
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

export default RootLayout
