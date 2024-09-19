import { useBoards } from '@/hooks/useBoards'
import { Board } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { useState } from 'react'
import { BoardItem } from './BoardItem'
import { DeleteModal } from './DeleteModal'
import { MainContent } from './MainContent'

export const BoardsContainer = () => {
  const { userId } = useAuth()
  const { boards, removeBoard } = useBoards({ userId })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }

  const handleDeleteClick = ({ boardId }) => {
    toggleModal()
    setSelectedBoard(boardId)
    console.log('Remove Board?')
  }

  const confirmDeleteBoard = () => {
    console.log('confirmDelete:' + selectedBoard)
    if (selectedBoard) {
      removeBoard({ boardId: selectedBoard })
      toggleModal()
      setSelectedBoard(null)
    }
  }

  return (
    <MainContent style={`p-4 ${isOpen ? 'blur-sm bg-white/95' : ''}`}>
      <div className="h-full w-full rounded-md bg-zinc-950 p-10">
        {boards.map((board: Board) => (
          <BoardItem
            key={board.boardId}
            board={board}
            onDelete={() => handleDeleteClick({ boardId: board.boardId })}
          />
        ))}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onConfirm={confirmDeleteBoard}
        onCancel={toggleModal}
      />
    </MainContent>
  )
}
