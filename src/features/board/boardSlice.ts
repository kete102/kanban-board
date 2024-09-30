import { Board } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BoardsInitialState {
  boards: Board[]
}
const initialState: BoardsInitialState = {
  boards: []
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setUserBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = [...action.payload]
    },
    addBoard: () => {},
    deleteBoard: () => {}
  }
})

export const { setUserBoards, addBoard, deleteBoard } = boardSlice.actions
export default boardSlice.reducer
