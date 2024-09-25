/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { BoardActions } from '@/services/board'
// import { setUserBoards } from '@/features/user/userSlice'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

export function useBoards() {
  const { createNewBoard, fetchBoards } = BoardActions()
  // const dispatch = useAppDispatch()
  const { boards } = useAppSelector((state: RootState) => state.user)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { getToken } = useAuth()

  useEffect(() => {
    const getBoards = async () => {
      console.log('getBoards')
      const token = await getToken()
      try {
        setLoading(true)
        const userBoards = await fetchBoards({ token })
        //TODO: dispatch(setUserBoards(userBoards))
        console.log(userBoards)
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
  }, [])

  const addNewBoard = async (boardData: {
    boardTitle: string
    boardDescription: string
  }) => {
    try {
      const token = await getToken()
      if (token) {
        //TODO: aqui funcion que hace la llamada a la DB
        createNewBoard({
          boardTitle: boardData.boardTitle,
          boardDescription: boardData.boardDescription,
          token
        }).then(res => console.log(res))
      } else {
        console.log('No session token provided')
        return
      }
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
