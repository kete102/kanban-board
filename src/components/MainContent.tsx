import { BoardModal, CustomCreateModal } from '@/atom'
import { useBoards } from '@/hooks/useBoards'
import useModalStore from '@/store/ModalStore'
import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children }: Props) => {
  const { modals, toggleModal, isModalOpen } = useModalStore()
  const { addNewBoard } = useBoards()

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

  return (
    <div
      id="main-content"
      className={`mx-auto flex h-full min-h-fit w-full max-w-full flex-1 flex-col overflow-y-scroll rounded-md ${isModalOpen && 'pointer-events-none bg-white/95 blur-sm'}`}
    >
      {children}
      <CustomCreateModal
        handleSubmit={handleSubmit}
        isOpen={modals.createBoard}
        modal="createBoard"
      >
        <BoardModal />
      </CustomCreateModal>
    </div>
  )
}
