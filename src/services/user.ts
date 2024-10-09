import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

/**
 * User actions
 * */
export function UserActions() {
  const { getToken } = useAuth()
  const navigate = useNavigate()

  /**
   * Saves the signed in user in the db.
   * @returns UserId: The signed in user id
   * */
  const saveUserData = async () => {
    console.log('Save user Data')
    try {
      const token = await getToken()
      if (!token) return
      const res = await fetch(
        'https://kanban-baord-app-backend-production-f913.up.railway.app/api/auth',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!res.ok) {
        console.error(res.statusText)
      }
      const userId = await res.json()
      navigate(`/${userId}`)
    } catch (error) {
      console.error('Error saving the user', error)
    }
  }
  return { saveUserData }
}
