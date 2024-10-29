/* eslint-disable react-hooks/exhaustive-deps */
import { BoardsContainer, MainContent, NewBoardModal } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import useModalStore from '@/store/ModalStore'
import { useEffect } from 'react'
import { IoIosAdd } from 'react-icons/io'

export const UserPage = () => {
  const { modals, toggleModal } = useModalStore()
  const { addNewBoard, getBoards, boards } = useBoards()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const boardData = {
      boardTitle: formData.get('boardTitle') as string,
      boardDescription: formData.get('boardDescription') as string
    }
    addNewBoard(boardData)
    toggleModal('createBoard')
  }

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <MainContent
      style={
        modals.createBoard ? 'blur-sm bg-white/95 pointer-events-none' : ''
      }
    >
      <NewBoardModal handleSubmit={handleSubmit} />
      <BoardsContainer />
    </MainContent>
  )
}
