import {
  BoardsContainer,
  MainContent,
  NewBoardModal,
  UserInfo
} from '@/components'
import { useBoards } from '@/hooks/useBoards'
import { useState } from 'react'

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

  return (
    <MainContent style={isModalOpen ? 'blur-sm bg-white/95' : ''}>
      <div className="flex h-full flex-col">
        <section className="m-4 flex items-center justify-between rounded-md bg-zinc-950 p-6 text-right">
          <h1 className="text-xl font-bold text-white">Kanban Board</h1>
          <button
            className="group relative inline-block"
            onClick={toggleOpenModal}
          >
            <span className="items-centrer relative z-10 flex justify-center overflow-hidden rounded-lg border-2 border-indigo-600 px-3.5 py-2 font-medium leading-tight text-indigo-600 transition-colors duration-300 ease-out group-hover:text-white">
              <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
              <span className="ease absolute left-0 -ml-2 h-40 w-40 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-indigo-600 transition-all duration-300 group-hover:-rotate-180"></span>
              <span className="relative text-lg font-semibold">New board</span>
            </span>
            <span
              className="absolute bottom-0 right-0 -mb-1 -mr-1 h-9 w-full rounded-lg bg-indigo-600 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
          <UserInfo />
        </section>
        <NewBoardModal
          toggleOpenModal={toggleOpenModal}
          handleSubmit={handleSubmit}
          isModalOpen={isModalOpen}
        />
        {/* Boards Container */}
        <BoardsContainer />
      </div>
    </MainContent>
  )
}
