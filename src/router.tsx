import {
  BoardPage,
  ErrorPage,
  RootLayout,
  SignInPage,
  UserPage
} from '@/routes'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/:id', element: <UserPage /> },
      { path: '/auth/sign-in', element: <SignInPage /> },
      { path: '/board/:id', element: <BoardPage /> }
    ],
    errorElement: <ErrorPage />
  }
])
