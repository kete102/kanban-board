/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { BoardsContainer, MainContent, NewBoardModal } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import { useEffect, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'

export const UserPage = () => {
  const { boards } = useAppSelector((state: RootState) => state.boards)
  const { addNewBoard, getBoards } = useBoards()
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
    getBoards()
  }, [])

  return (
    <MainContent
      style={isModalOpen ? 'blur-sm bg-white/95 pointer-events-none' : ''}
    >
      {boards.length !== 0 && (
        <button
          className="fixed bottom-12 right-12 z-10 inline-flex items-center rounded-full bg-indigo-600 p-1 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 hover:shadow-xl active:scale-95 md:px-5 md:py-2.5"
          onClick={toggleOpenModal}
        >
          <IoIosAdd
            size={`${45}`}
            className="transition-transform duration-300 ease-in-out hover:rotate-90"
          />
          <span className="hidden md:inline">Add board</span>
        </button>
      )}
      <NewBoardModal
        toggleOpenModal={toggleOpenModal}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
      />
      <BoardsContainer toggleOpenModal={toggleOpenModal} />
    </MainContent>
  )
}
