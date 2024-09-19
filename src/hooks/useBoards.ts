import { FetchBoards } from '@/api/board'
import { createBoard } from '@/services/board'
import { Board, Column } from '@/types'
import { useEffect, useState } from 'react'

const defaultColumns: Column[] = [
  {
    tasks: [],
    columnId: crypto.randomUUID(),
    columnTitle: 'To do'
  },

  {
    tasks: [],
    columnId: crypto.randomUUID(),
    columnTitle: 'In Progress'
  },

  {
    tasks: [],
    columnId: crypto.randomUUID(),
    columnTitle: 'Done'
  }
]

function craftBoard(
  userId: string,
  boardTitle: string,
  boardDescription: string
): Board {
  const board: Board = {
    boardDescription,
    boardTitle,
    userId,
    boardId: crypto.randomUUID(),
    columns: defaultColumns
  }
  return board
}

export function useBoards({ userId }: { userId: string | null | undefined }) {
  const [boards, setBoards] = useState<Board[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!userId) return
    const getBoards = async () => {
      try {
        setLoading(true)
        const userBoards = await FetchBoards({ userId })
        setBoards(userBoards)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An expected error ocurred')
        }
      } finally {
        setLoading(false)
      }
    }

    getBoards()
  }, [userId])

  const addNewBoard = async (boardData: {
    boardTitle: string
    boardDescription: string
  }) => {
    if (userId) {
      try {
        const newBoard = craftBoard(
          userId,
          boardData.boardTitle,
          boardData.boardDescription
        )
        await createBoard(newBoard)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeBoard = ({ boardId }) => {
    console.log(boardId + 'Board deleted')
  }
  return { boards, loading, error, addNewBoard, removeBoard }
}
