import { API_URL } from '@/config'
import { Board } from '@/types/boards/board.types'

interface BoardFromApi {
  _id: string
  boardTitle: string
  boardDescription: string
  createdAt: string
}

export function boardActions() {
  const startFetchBoards = async ({ token }) => {
    try {
      const response = await fetch(`${API_URL}/api/boards`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const { boards } = await response.json()
        if (!boards) return null

        return boards.map((board: BoardFromApi) => {
          return {
            boardId: board._id,
            boardDescription: board.boardDescription,
            boardTitle: board.boardTitle,
            createdAt: board.createdAt
          }
        })
      }
    } catch (error) {
      console.log('Error fetching the users  boards', error)
      throw new Error('Error fetching the user boards')
    }
  }

  interface StartCreateNewBoard {
    newBoard: {
      boardTitle: string
      boardDescription: string
      createdAt: string
    }
    token: string
  }

  const startCreateNewBoard = async ({
    newBoard,
    token
  }: StartCreateNewBoard) => {
    try {
      const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          newBoard
        })
      })

      const { boards: board } = await response.json()
      const mappedBoard: Board = {
        boardId: board._id,
        boardDescription: board.boardDescription,
        createdAt: board.createdAt,
        boardTitle: board.boardTitle
      }
      return mappedBoard
    } catch (error) {
      console.error(error)
    }
  }

  const startDeleteBoard = async ({ token, boardId }) => {
    console.log('delete board')
    try {
      const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const { board } = await response.json()
        return board._id
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    startFetchBoards,
    startCreateNewBoard,
    startDeleteBoard
  }
}
