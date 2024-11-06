import { createBrowserRouter } from 'react-router-dom'
import { BoardPage, ErrorPage, SignInPage, UserPage } from './routes'
import { ProtectedRoute } from './routes/middlewares/checkAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/:id',
        element: <UserPage />
      },
      { path: '/:id/boards/:id', element: <BoardPage /> }
    ]
  },
  { path: '/auth/sign-in', element: <SignInPage /> }
])
