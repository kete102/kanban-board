import { useAppDispatch } from '@/app/hooks'
import { setUser } from '@/features/user/userSlice'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

interface UserDataResponse {
  message: string
  user: {
    clerkId: string
    username: string
    imageUrl: string
  }
}
export function useSaveUser() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()

  const saveUserData = async () => {
    //NOTE: Solo se hace el guardado si esta auth y si  hay un userId
    if (isSignedIn && user?.id && user.username) {
      const token = await getToken()

      fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const userData: UserDataResponse = data
          dispatch(
            setUser({
              userId: userData.user.clerkId,
              userName: userData.user.username,
              boards: []
            })
          )
          navigate(`/:${userData.user.clerkId}`)
        })
    }
  }
  return { saveUserData }
}
