/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { addBoard, setUserBoards } from '@/features/board/boardSlice'
import { BoardActions } from '@/services/board'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

export function useBoards() {
  const { createNewBoard, fetchBoards, deleteBoard } = BoardActions()
  const dispatch = useAppDispatch()
  const { boards } = useAppSelector((state: RootState) => state.boards)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { getToken } = useAuth()

  useEffect(() => {
    const getBoards = async () => {
      const token = await getToken()
      try {
        setLoading(true)
        const userBoards = await fetchBoards({ token })
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
  }, [dispatch])

  const addNewBoard = async (boardData: {
    boardTitle: string
    boardDescription: string
  }) => {
    try {
      const token = await getToken()
      if (token) {
        const { newBoard } = await createNewBoard({
          boardTitle: boardData.boardTitle,
          boardDescription: boardData.boardDescription,
          token
        })
        dispatch(addBoard(newBoard))
      } else {
        console.log('No session token provided')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeBoard = async ({ boardId }) => {
    try {
      const token = await getToken()
      if (token) {
        await deleteBoard({
          boardId,
          token
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    boards,
    loading,
    error,
    addNewBoard,
    removeBoard
  }
}
