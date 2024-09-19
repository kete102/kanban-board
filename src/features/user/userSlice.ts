import type { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userId: string
  userName: string
}

const initialState: UserState = {
  userId: '',
  userName: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: () => {},
    cleanUser: () => {}
  }
})

export const { cleanUser, setUser } = userSlice.actions
export default userSlice.reducer
