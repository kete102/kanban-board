import { useNavigate } from 'react-router-dom'

export function useSaveUser() {
  const navigate = useNavigate()
  const saveUserData = async ({ isSignedIn, getToken }) => {
    if (isSignedIn) {
      const token = await getToken()

      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.log('Error en la llamada')
      }
      const userId = await res.json()
      console.log(userId)
      // navigate(`/${data}`)
    }
  }
  return { saveUserData }
}
