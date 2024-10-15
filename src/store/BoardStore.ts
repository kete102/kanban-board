import { Board } from '@/types'
import { create } from 'zustand'

interface BoardState {
  boards: Board[]
  loadBoards: (boards: Board[]) => void
  addBoard: (newBoard: Board) => void
  removeBoard: (boardId: string) => void
}

const useBoardStore = create<BoardState>(set => ({
  boards: [],
  loadBoards: boards => set({ boards }),
  addBoard: newBoard =>
    set(state => ({
      boards: [...state.boards, newBoard]
    })),
  removeBoard: boardId =>
    set(state => ({
      boards: state.boards.filter(board => board.boardId !== boardId)
    }))
}))

export default useBoardStore
