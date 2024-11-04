// src/components/LastPathTracker.js
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LastPathTracker = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, userId } = useAuth()
  console.log(localStorage)

  useEffect(() => {
    if (isSignedIn) {
      // Obtener el último path visitado o, si no existe, usar la ruta por defecto
      const lastPath = localStorage.getItem('lastPath') || `/${userId}`

      // Solo redirige si el lastPath es diferente del path actual
      if (lastPath !== location.pathname) {
        // Usamos un pequeño retraso para evitar conflictos con otras redirecciones
        setTimeout(() => {
          navigate(lastPath, { replace: true })
        }, 0)
      }
    }
  }, [isSignedIn, location.pathname, navigate, userId])

  // Guardar el path actual en localStorage cada vez que el usuario navega
  useEffect(() => {
    if (isSignedIn) {
      localStorage.setItem('lastPath', location.pathname)
    }
  }, [isSignedIn, location.pathname])

  return null // No renderiza nada en pantalla
}

export default LastPathTracker
