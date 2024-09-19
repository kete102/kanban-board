/* eslint-disable react-hooks/exhaustive-deps */
import { FetchBoards } from '@/api/board'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { setUserBoards } from '@/features/user/userSlice'
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

export function useBoards() {
  const dispatch = useAppDispatch()
  const { boards, userId } = useAppSelector((state: RootState) => state.user)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getBoards = async () => {
      try {
        setLoading(true)
        const userBoards = await FetchBoards({ userId })
        dispatch(setUserBoards(userBoards))
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
    try {
      const newBoard = craftBoard(
        userId,
        boardData.boardTitle,
        boardData.boardDescription
      )
      console.log(newBoard)
      //TODO: aqui funcion que hace la llamada a la DB
    } catch (error) {
      console.log(error)
    }
  }

  const removeBoard = ({ boardId }) => {
    console.log(boardId + 'Board deleted')
  }

  return {
    boards,
    loading,
    error,
    addNewBoard,
    removeBoard
  }
}
