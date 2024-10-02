import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { useBoards } from '@/hooks/useBoards'
import { Board } from '@/types'
import { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BoardItem } from './BoardItem'
import { DeleteModal } from './DeleteModal'

interface Props {
  toggleOpenModal: () => void
}

export const BoardsContainer = ({ toggleOpenModal }: Props) => {
  const { boards } = useAppSelector((state: RootState) => state.boards) || []
  const { deleteBoard } = useBoards()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleDelete = ({ id }) => {
    toggleModal()
    setSelectedBoard(id)
    console.log('Handle delete', id)
  }

  const confirmDeleteBoard = () => {
    console.log(selectedBoard)

    if (selectedBoard) {
      deleteBoard({ boardId: selectedBoard })
      toggleModal()
      setSelectedBoard(null)
    }
  }

  return (
    <div
      id="boards-container"
      className="h-screen max-w-full flex-1 overflow-y-auto rounded-md bg-zinc-950 px-8 py-3"
    >
      <div className="mb-6 w-full text-center">
        <button
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          onClick={toggleOpenModal}
        >
          Add board{' '}
          <IoMdAddCircleOutline
            className="transition-transform duration-300 ease-in-out hover:rotate-90"
            size={19}
          />
        </button>
      </div>
      {boards.length === 0 && (
        <div className="mt-10 grid w-full place-content-center">
          <p className="text-lg text-zinc-600">Add your first board!</p>
        </div>
      )}
      {boards.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:justify-center lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
          {boards.map((board: Board, index) => (
            <BoardItem
              key={index}
              board={board}
              onDelete={() => handleDelete({ id: board.boardId })}
            />
          ))}
        </div>
      )}
      <DeleteModal
        isOpen={isOpen}
        onConfirm={confirmDeleteBoard}
        onCancel={toggleModal}
      />
    </div>
  )
}
