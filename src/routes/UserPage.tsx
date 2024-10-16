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
      {boards.length !== 0 && (
        <button
          className="fixed bottom-12 right-12 z-10 inline-flex items-center rounded-full bg-indigo-600 p-1 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 hover:shadow-xl active:scale-95 md:px-5 md:py-2.5"
          onClick={() => toggleModal}
        >
          <IoIosAdd
            size={`${45}`}
            className="transition-transform duration-300 ease-in-out hover:rotate-90"
          />
          <span className="hidden md:inline">Add board</span>
        </button>
      )}
      <NewBoardModal handleSubmit={handleSubmit} />
      <BoardsContainer />
    </MainContent>
  )
}
