import {
  BoardPage,
  ErrorPage,
  HomePage,
  RootLayout,
  SignInPage
} from '@/routes'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/auth', element: <SignInPage /> },
      { path: '/board', element: <BoardPage /> }
    ],
    errorElement: <ErrorPage />
  }
])
