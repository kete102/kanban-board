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
  const boards = useAppSelector((state: RootState) => state.boards.boards)
  const { deleteBoard } = useBoards()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleDelete = ({ id }) => {
    toggleModal()
    setSelectedBoard(id)
  }

  const confirmDeleteBoard = () => {
    if (selectedBoard) {
      deleteBoard({ boardId: selectedBoard })
      toggleModal()
      setSelectedBoard(null)
    }
  }

  return (
    <div
      id="boards-container"
      className={
        boards.length !== 0
          ? `flex h-auto min-h-fit w-fit items-center justify-center overflow-y-scroll rounded-md px-4 py-3 lg:max-w-full`
          : 'grid h-full place-content-center'
      }
    >
      {boards.length === 0 && (
        <div className="grid h-full w-fit place-content-center rounded-md p-10 text-center">
          <section className="mb-6 w-full">
            <p className="text-4xl font-bold text-zinc-950">No boards yet!</p>
          </section>
          <section className="w-full">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-2xl text-white shadow-lg shadow-indigo-800/50 transition-all duration-75 ease-in-out hover:scale-105 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
              onClick={toggleOpenModal}
            >
              Add board
              <IoMdAddCircleOutline
                className="transition-transform duration-300 ease-in-out hover:rotate-90"
                size={19}
              />
            </button>
          </section>
        </div>
      )}
      {boards.length !== 0 && (
        <div className="mx-auto grid w-fit gap-3">
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
