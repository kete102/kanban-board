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
    loadBoards: (state, action: PayloadAction<Board[]>) => {
      return {
        ...state,
        boards: action.payload
      }
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    },
    removeBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      return {
        ...state,
        boards: state.boards.filter(
          board => board.boardId !== action.payload.boardId
        )
      }
    }
  }
})

export const { loadBoards, addBoard, removeBoard } = boardSlice.actions
export default boardSlice.reducer
