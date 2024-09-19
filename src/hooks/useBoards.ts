import { FetchBoards } from '@/api/board'
import { Board } from '@/types'
import { useEffect, useState } from 'react'

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

  const removeBoard = ({ boardId }) => {
    console.log(boardId + 'Board deleted')
  }

  return { boards, loading, error, removeBoard }
}
