/* eslint-disable react-hooks/exhaustive-deps */
import { API_URL } from '@/config'
import useUserState from '@/store/UserStore'
import { User } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserActions() {
  const { getToken } = useAuth()
  const { setUser } = useUserState()
  const navigate = useNavigate()

  /**
   * Sends the user data to API.
   * @returns UserId: The signed in user id
   * */
  const checkUserData = useCallback(async () => {
    try {
      const token = await getToken()
      console.log(token)
      if (!token) return

      const res = await axios.get(`${API_URL}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.data) {
        console.error('Error saving user')
      }

      const { user } = await res.data
      console.log(user)
      const userData: User = {
        userId: user._id,
        clerkId: user.clerkId
      }

      setUser(userData)
      console.log(userData.userId)
      // navigate(`/${userData.userId}`)
      return userData.userId
    } catch (error) {
      console.error('Error saving the user', error)
    }
  }, [])

  return { checkUserData }
}
