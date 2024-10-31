import { NoBoards } from '@/atom/NoBoards'
import { BoardItem, DeleteModal } from '@/components'
import { useBoards } from '@/hooks/useBoards'
import useBoardStore from '@/store/BoardStore'
import useModalStore from '@/store/ModalStore'
import { Board } from '@/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'

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
      className="mt-3 flex h-full w-full flex-col items-center justify-start overflow-y-scroll rounded-md px-4 py-3 lg:max-w-full"
    >
      <div className="mx-auto my-4 flex w-full max-w-2xl flex-row items-center justify-between px-3 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <button
          className="inline-flex items-center gap-2 rounded-md border-2 border-violet-800 bg-violet-600 px-3 py-1.5 text-lg font-semibold text-white shadow-inner shadow-white/10"
          onClick={() => toggleModal('createBoard')}
        >
          Add Board
          <IoIosAdd
            size={28}
            className="transition-transform duration-300 ease-in-out hover:rotate-90"
          />
        </button>
        <section>
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md border-2 border-zinc-800 bg-zinc-600 px-3 py-1.5 text-lg font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-700 data-[open]:bg-zinc-700 data-[focus]:outline-1 data-[focus]:outline-white">
              Filter
              <IoChevronDown />
            </MenuButton>

            <MenuItems
              anchor="bottom end"
              className="text-md mt-1 flex w-32 origin-top-right flex-col gap-2 rounded-md bg-zinc-950 p-2 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="text-md rounded-md bg-zinc-800 px-2 py-1 font-medium text-white">
                  By Date
                </button>
              </MenuItem>
              <MenuItem>
                <button className="text-md rounded-md bg-zinc-800 px-2 py-1 font-medium text-white">
                  A - Z
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </section>
      </div>
      {boards.length === 0 && <NoBoards />}
      {boards.length !== 0 && (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2 md:p-3 lg:max-w-2xl lg:grid-cols-3 xl:max-w-4xl">
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
