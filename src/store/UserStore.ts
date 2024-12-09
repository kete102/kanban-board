import { User } from '@/types/users/user.types'
import { create } from 'zustand'

interface UserState {
  userState: User | null
  setUser: (user: User) => void
  cleanUser: () => void
}

const useUserState = create<UserState>(set => ({
  userState: null,
  setUser: (user: User) =>
    set(() => ({
      userState: user
    })),
  cleanUser: () => {
    set(() => ({
      userState: null
    }))
  }
}))

export default useUserState
