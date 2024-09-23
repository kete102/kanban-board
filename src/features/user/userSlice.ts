import { Board, User } from '@/types'
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
    setUser: (
      state,
      action: { payload: { userId: string; userName: string } }
    ) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
    cleanUser: () => {
      return { ...initialState }
    },
    setUserBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload
    }
  }
})

export const { cleanUser, setUser, setUserBoards } = userSlice.actions
export default userSlice.reducer
