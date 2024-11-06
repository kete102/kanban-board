import { PUBLISHABLE_KEY } from '@/config'
import { ClerkProvider } from '@clerk/clerk-react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    <QueryClientProvider client={queryClient}></QueryClientProvider>
  </ClerkProvider>
)
