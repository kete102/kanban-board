/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@/components/Container'
import { MainContent } from '@/components/MainContent'
import { SignedIn, useAuth, UserButton } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/auth/sign-in')
    }
  }, [])

  return (
    <Container>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  )
}

export default RootLayout
