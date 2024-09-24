import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

export function useSaveUser() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const saveUserData = async () => {
    const token = await getToken()

    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res)
    if (!res.ok) {
      console.log('Error en la llamada')
    }
    const userId = await res.json()
    console.log(userId)
    navigate(`/${userId}`)
  }
  return { saveUserData }
}
