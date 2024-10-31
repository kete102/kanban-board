import { BoardModal, CustomCreateModal } from '@/atom'
import { useBoards } from '@/hooks/useBoards'
import useModalStore from '@/store/ModalStore'
import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  const { modals, toggleModal } = useModalStore()
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
      className={`mx-auto flex h-full w-full max-w-full flex-col items-center justify-center rounded-md ${style}`}
    >
      {children}
      <CustomCreateModal
        handleSubmit={handleSubmit}
        modal="createBoard"
        isOpen={modals.createBoard}
      >
        <BoardModal />
      </CustomCreateModal>
    </div>
  )
}
