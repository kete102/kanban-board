import { Container } from '@/components'
import AuthGuard from '@/components/auth/AuthGuard'
import LastPathTracker from '@/components/LastPathTracker'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  // const navigate = useNavigate()
  // const location = useLocation()
  // const { isSignedIn, userId } = useAuth()
  // // Redirect to sign-in page if user is not signed in
  // useEffect(() => {
  //   if (!isSignedIn && location.pathname !== '/auth/sign-in') {
  //     navigate('/auth/sign-in', { replace: true })
  //   }
  // }, [isSignedIn, location.pathname, navigate])
  //
  // useEffect(() => {
  //   localStorage.setItem('lastPath', location.pathname)
  // }, [location.pathname])
  //
  // useEffect(() => {
  //   const lastPath = localStorage.getItem('lastPath')
  //   if (lastPath && lastPath !== location.pathname) {
  //     navigate(lastPath)
  //   }
  // }, [navigate, location.pathname])
  //
  // // Redirect signed-in user to last route or default route
  // useEffect(() => {
  //   if (isSignedIn) {
  //     const lastRoute = localStorage.getItem('lastRoute') || `/${userId}`
  //
  //     // Check if we are already on the last route to avoid unnecessary navigation
  //     if (lastRoute && lastRoute !== location.pathname) {
  //       navigate(lastRoute, { replace: true })
  //     }
  //   }
  // }, [isSignedIn, location.pathname, navigate, userId])
  //
  // // Save the current path to localStorage when user is signed in
  // useEffect(() => {
  //   if (isSignedIn) {
  //     localStorage.setItem('lastRoute', location.pathname)
  //   }
  // }, [isSignedIn, location.pathname])
  //
  return (
    <AuthGuard>
      <Container>
        <LastPathTracker />
        <Outlet />
      </Container>
    </AuthGuard>
  )
}
