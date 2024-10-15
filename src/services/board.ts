import { API_URL } from '@/config'
import { Board, Column, ColumnType } from '@/types'

interface BoardFromApi {
  _id: string
  boardTitle: string
  boardDescription: string
  columns: Map<ColumnType, Column>
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
        if (!boards) {
          throw new Error('Error fetching user boards')
        }
        return boards.map((board: BoardFromApi) => {
          return {
            boardId: board._id,
            boardDescription: board.boardDescription,
            boardTitle: board.boardTitle,
            columns: board.columns
          }
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching the user boards')
    }
  }

  const startCreateNewBoard = async ({
    boardTitle,
    boardDescription,
    token,
    columns
  }: {
    boardTitle: string
    boardDescription: string
    columns: Map<ColumnType, Column>
    token: string
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ boardTitle, boardDescription, columns })
      })

      const { newBoard } = await response.json()
      if (newBoard) {
        const mappedBoard: Board = {
          columns: new Map<ColumnType, Column>(),
          boardId: newBoard._id,
          boardDescription: newBoard.boardDescription,
          boardTitle: newBoard.boardTitle
        }

        return mappedBoard
      }
    } catch (error) {
      console.error(error)
    }
  }

  const startDeleteBoard = async ({ token, boardId }) => {
    try {
      const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        return false
      }

      return await response.json()
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
