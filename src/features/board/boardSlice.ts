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
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload)
    },
    deleteBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      state.boards.filter(board => board.boardId !== action.payload.boardId)
    }
  }
})

export const { setUserBoards, addBoard, deleteBoard } = boardSlice.actions
export default boardSlice.reducer
