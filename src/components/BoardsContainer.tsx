import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { useBoards } from '@/hooks/useBoards'
import { Board } from '@/types'
import { useState } from 'react'
import { BoardItem } from './BoardItem'
import { DeleteModal } from './DeleteModal'
import { MainContent } from './MainContent'

interface Props {
  toggleOpenModal: () => void
}

export const BoardsContainer = ({ toggleOpenModal }: Props) => {
  const { boards } = useAppSelector((state: RootState) => state.boards) || []
  const { removeBoard } = useBoards()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  console.log('BoardsContainer', boards)
  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleDelete = ({ boardId }) => {
    toggleModal()
    setSelectedBoard(boardId)
  }

  const confirmDeleteBoard = () => {
    if (selectedBoard) {
      removeBoard({ boardId: selectedBoard })
      toggleModal()
      setSelectedBoard(null)
    }
  }

  if (boards.length === 0) {
    return (
      <MainContent>
        <p className="text-white">Add boards</p>
      </MainContent>
    )
  }

  return (
    <div
      id="boards-container"
      className="h-full w-full flex-1 rounded-md bg-zinc-950 p-8"
    >
      <div className="mb-6">
        <button
          className="group relative inline-block max-w-fit"
          onClick={toggleOpenModal}
        >
          <span className="items-centrer relative z-10 flex justify-center overflow-hidden rounded-lg border-2 border-indigo-600 px-3.5 py-2 font-medium leading-tight text-indigo-600 transition-colors duration-300 ease-out group-hover:text-white">
            <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
            <span className="ease absolute left-0 -ml-2 h-40 w-40 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-indigo-600 transition-all duration-300 group-hover:-rotate-180"></span>
            <span className="relative text-2xl font-semibold">New board</span>
          </span>
          <span
            className="absolute bottom-0 right-0 -mb-1 -mr-1 h-9 w-full rounded-lg bg-indigo-600 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {boards.map((board: Board, index) => (
          <BoardItem
            key={index}
            board={board}
            onDelete={() => handleDelete({ boardId: board.boardId })}
          />
        ))}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onConfirm={confirmDeleteBoard}
        onCancel={toggleModal}
      />
    </div>
  )
}
