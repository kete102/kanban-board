import { useBoards } from '@/hooks/useBoards'
import useBoardStore from '@/store/BoardStore'
import useModalStore from '@/store/ModalStore'
import { Board } from '@/types'
import { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BoardItem } from './BoardItem'
import { DeleteModal } from './DeleteModal'

export const BoardsContainer = () => {
  const { toggleModal } = useModalStore()
  const { boards } = useBoardStore()
  const { deleteBoard } = useBoards()
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  const handleDeleteTasks = ({ id }) => {
    toggleModal('deleteBoard')
    setSelectedBoard(id)
  }

  const confirmDeleteBoard = () => {
    console.log(selectedBoard)
    if (selectedBoard) {
      deleteBoard({ boardId: selectedBoard })
      toggleModal('deleteBoard')
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
              onClick={() => toggleModal('createBoard')}
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
          {boards.map((board: Board) => (
            <BoardItem
              key={board.boardId}
              board={board}
              onDelete={handleDeleteTasks}
            />
          ))}
        </div>
      )}
      <DeleteModal
        onConfirm={confirmDeleteBoard}
        onCancel={() => toggleModal('deleteBoard')}
      />
    </div>
  )
}
