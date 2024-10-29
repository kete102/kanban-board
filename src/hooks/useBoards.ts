/* eslint-disable react-hooks/exhaustive-deps */
import { boardActions } from '@/services/board'
import useBoardStore from '@/store/BoardStore'
import { useAuth } from '@clerk/clerk-react'
import { useCallback, useState } from 'react'

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
      //TODO: logica para mapear las columnas en su forma correcta
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

  const addNewBoard = async (boardData: {
    boardTitle: string
    boardDescription: string
  }) => {
    try {
      const token = await getToken()
      if (token) {
        const newBoard = await startCreateNewBoard({
          boardTitle: boardData.boardTitle,
          boardDescription: boardData.boardDescription,
          createdAt: new Date().toLocaleDateString(),
          token
        })
        if (newBoard) {
          addBoard(newBoard)
          console.log(newBoard)
        }
      } else {
        console.log('No session token provided')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoard = async ({ boardId }) => {
    try {
      const token = await getToken()
      if (token) {
        const { deletedBoard } = await startDeleteBoard({
          boardId,
          token
        })
        removeBoard(deletedBoard._id)
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
