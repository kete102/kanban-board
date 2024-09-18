import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { PUBLISHABLE_KEY } from '@/config'
import { HomePage } from '@/routes/HomePage.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Board from './components/Board.tsx'
import { SignInPage } from './routes/auth/auth.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import RootLayout from './routes/RootLayout.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/auth/', element: <SignInPage /> },
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
