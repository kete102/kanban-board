/* eslint-disable react-hooks/exhaustive-deps */
import { BoardsContainer, MainContent } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import useModalStore from '@/store/ModalStore'
import { useEffect } from 'react'

export const UserPage = () => {
  const { modals } = useModalStore()
  const { getBoards } = useBoards()

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <MainContent
      style={
        modals.createBoard ? 'blur-sm bg-white/95 pointer-events-none' : ''
      }
    >
      <BoardsContainer />
    </MainContent>
  )
}
