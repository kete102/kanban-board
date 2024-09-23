import { PUBLISHABLE_KEY } from '@/config'
import { ClerkProvider } from '@clerk/clerk-react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ClerkProvider>
)
