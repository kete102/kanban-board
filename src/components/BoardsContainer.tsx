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
      className="h-full w-full flex-1 rounded-md bg-zinc-950 px-8 py-3"
    >
      <div className="mb-6 w-full text-center">
        <button
          className="text-md inline-flex items-center gap-x-2 rounded-md px-4 py-3 font-medium text-white hover:bg-zinc-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={toggleOpenModal}
        >
          Add board <IoMdAddCircleOutline size={17} />
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
