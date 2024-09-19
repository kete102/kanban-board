import { User } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: User = {
  userId: '',
  userName: '',
  boards: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
    cleanUser: () => {
      return { ...initialState }
    }
  }
})

export const { cleanUser, setUser } = userSlice.actions
export default userSlice.reducer
