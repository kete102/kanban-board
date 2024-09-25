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
    const token = await getToken()

    try {
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
