import { Board } from '@/types/boards/board.types'
import { create } from 'zustand'

interface BoardState {
  boards: Board[] | null
  loadBoards: (boards: Board[] | null) => void
  addBoard: (newBoard: Board) => void
  removeBoard: (boardId: string) => void
}

const useBoardStore = create<BoardState>(set => ({
  boards: null,
  loadBoards: boards => set({ boards }),
  addBoard: newBoard =>
    set(state => ({
      boards: state.boards ? [...state.boards, newBoard] : [newBoard]
    })),
  removeBoard: boardId =>
    set(state => ({
      boards: state.boards
        ? state.boards.filter(board => board.boardId !== boardId)
        : null
    }))
}))

export default useBoardStore
