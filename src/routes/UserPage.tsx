/* eslint-disable react-hooks/exhaustive-deps */
import { BoardsContainer, Container, MainContent } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import useBoardStore from '@/store/BoardStore'
import { useEffect } from 'react'

export const UserPage = () => {
  const { boards } = useBoardStore()
  const { getBoards } = useBoards()

  useEffect(() => {
    if (boards.length === 0) {
      getBoards()
    }
  }, [])

  return (
    <Container>
      <MainContent>
        <BoardsContainer />
      </MainContent>
    </Container>
  )
}
