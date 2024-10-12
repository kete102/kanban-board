import { User } from '@/types'
import { create } from 'zustand'

interface UserState {
  userId: string
  userName: string
  avatarImage: string
  setUser: (user: User) => void
  cleanUser: () => void
}

const initialState: User = {
  userId: '',
  userName: '',
  avatarImage: ''
}
const useUserState = create<UserState>(set => ({
  ...initialState,
  setUser: user => set(() => user),
  cleanUser: () => set(() => ({ ...initialState }))
}))

export default useUserState
