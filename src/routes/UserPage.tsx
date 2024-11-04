/* eslint-disable react-hooks/exhaustive-deps */
import { BoardsContainer, MainContent } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import { useEffect } from 'react'

export const UserPage = () => {
  const { getBoards, boards } = useBoards()

  useEffect(() => {
    console.log('userPage get Boards')
    if (boards.length === 0) {
      getBoards()
    }
  }, [])

  return (
    <MainContent>
      <BoardsContainer />
    </MainContent>
  )
}
