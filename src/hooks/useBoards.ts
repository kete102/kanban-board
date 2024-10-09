import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  addBoard,
  removeBoard,
  setUserBoards
} from '@/features/board/boardSlice'
import { boardActions } from '@/services/board'
import { useAuth } from '@clerk/clerk-react'
import { useCallback, useState } from 'react'

export function useBoards() {
  const boards = useAppSelector(state => state.boards.boards)
  const { startDeleteBoard, startFetchBoards, startCreateNewBoard } =
    boardActions()
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { getToken } = useAuth()

  const getBoards = useCallback(async () => {
    try {
      const token = await getToken()
      if (!token) return
      setLoading(true)
      const userBoards = await startFetchBoards({ token })
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
  }, [dispatch, getToken, startFetchBoards])

  const addNewBoard = async (boardData: {
    boardTitle: string
    boardDescription: string
  }) => {
    try {
      const token = await getToken()
      if (token) {
        const { newBoard } = await startCreateNewBoard({
          boardTitle: boardData.boardTitle,
          boardDescription: boardData.boardDescription,
          token
        })
        dispatch(addBoard(newBoard))
        console.log('Boards state:', boards)
      } else {
        console.log('No session token provided')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoard = async ({ boardId }) => {
    console.log('removeBoard:', boardId)
    try {
      const token = await getToken()
      if (token) {
        const { deletedBoard } = await startDeleteBoard({
          boardId,
          token
        })
        dispatch(removeBoard({ boardId: deletedBoard._id }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    error,
    getBoards,
    addNewBoard,
    deleteBoard
  }
}
