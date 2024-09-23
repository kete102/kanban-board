import { useAppDispatch } from '@/app/hooks'
import { setUser } from '@/features/user/userSlice'
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

  const saveUserData = async ({ isSignedIn, user, getToken }) => {
    //NOTE: Solo se hace el guardado si esta auth y si  hay un userId
    if (isSignedIn && user?.id && user.username) {
      const token = await getToken()

      const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      const userData: UserDataResponse = data
      dispatch(
        setUser({
          userId: userData.user.clerkId,
          userName: userData.user.username
        })
      )
      console.log('navigate', userData.user.clerkId)
      navigate(`/${userData.user.clerkId}`)
    }
  }
  return { saveUserData }
}
