/* eslint-disable react-hooks/exhaustive-deps */
import { BoardsContainer, MainContent } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import { useEffect } from 'react'

export const UserPage = () => {
  const { getBoards } = useBoards()

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <MainContent>
      <BoardsContainer />
    </MainContent>
  )
}
