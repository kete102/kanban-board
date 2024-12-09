/* eslint-disable react-hooks/exhaustive-deps */
import { boardActions } from '@/services/board'
import useBoardStore from '@/store/BoardStore'
import { useAuth } from '@clerk/clerk-react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

export function useBoards() {
  const { boards, loadBoards, addBoard, removeBoard } = useBoardStore()
  const { startDeleteBoard, startFetchBoards, startCreateNewBoard } =
    boardActions()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { getToken } = useAuth()

  const getBoards = useCallback(async () => {
    const token = await getToken()
    try {
      if (!token) return
      setLoading(true)
      const userBoards = await startFetchBoards({ token })
      loadBoards(userBoards)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An expected error ocurred')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  interface AddNewBoard {
    boardTitle: string
    boardDescription: string
  }

  const addNewBoard = async (boardData: AddNewBoard) => {
    try {
      const token = await getToken()
      const newBoard = {
        ...boardData,
        createdAt: new Date().toLocaleDateString()
      }

      if (token) {
        const board = await startCreateNewBoard({
          newBoard,
          token
        })
        if (board) {
          addBoard(board)
          toast.success('New board created')
        }
      } else {
        console.log('No session token provided')
        return
      }
    } catch (error) {
      toast.error('Error creating board')
      console.log(error)
    }
  }

  const deleteBoard = async ({ boardId }) => {
    try {
      const token = await getToken()
      if (token) {
        const deletedBoardId = await startDeleteBoard({
          boardId,
          token
        })
        removeBoard(deletedBoardId)
        toast.success('Board deleted')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    boards,
    loading,
    error,
    getBoards,
    addNewBoard,
    deleteBoard
  }
}
