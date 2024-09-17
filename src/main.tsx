import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { PUBLISHABLE_KEY } from '@/config'
import { ClerkProvider } from '@clerk/clerk-react'
import Board from './components/Board.tsx'
import ErrorPage from './error-page.tsx'
import { HomePage } from './HomePage.tsx'
import { SignInPage, SignUp } from './routes/auth'
import RootLayout from './routes/RootLayout.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/auth/sign-in', element: <SignInPage /> },
      { path: '/auth/sign-up', element: <SignUp /> },
      { path: '/board', element: <Board /> }
    ],
    errorElement: <ErrorPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)
