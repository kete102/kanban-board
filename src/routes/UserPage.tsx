import { BoardsContainer, MainContent, NewBoardModal } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import { useEffect, useState } from 'react'

export const UserPage = () => {
  const { addNewBoard } = useBoards()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleOpenModal = () => {
    setIsModalOpen(prevState => !prevState)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const boardData = {
      boardTitle: formData.get('boardTitle') as string,
      boardDescription: formData.get('boardDescription') as string
    }
    addNewBoard(boardData)
    toggleOpenModal()
  }

  useEffect(() => {
    //TODO: Fetch user boards
  })

  return (
    <MainContent
      style={isModalOpen ? 'blur-sm bg-white/95 pointer-events-none' : ''}
    >
      <NewBoardModal
        toggleOpenModal={toggleOpenModal}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
      />
      <BoardsContainer />
    </MainContent>
  )
}
