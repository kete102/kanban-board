import { useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { useBoards } from '@/hooks/useBoards'
import { Board } from '@/types'
import { useState } from 'react'
import { BoardItem } from './BoardItem'
import { DeleteModal } from './DeleteModal'
import { MainContent } from './MainContent'

export const BoardsContainer = () => {
  const boards = useAppSelector((state: RootState) => state.user.boards) || []
  const { removeBoard } = useBoards()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleDeleteClick = ({ boardId }) => {
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
    <div id="boards-container" className="rounded-md bg-rose-200 p-4">
      {boards.map((board: Board, index) => (
        <BoardItem
          key={index}
          board={board}
          onDelete={() => handleDeleteClick({ boardId: board.boardId })}
        />
      ))}
      <DeleteModal
        isOpen={isOpen}
        onConfirm={confirmDeleteBoard}
        onCancel={toggleModal}
      />
    </div>
  )
}
