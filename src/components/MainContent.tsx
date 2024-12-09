import { CustomCreateModal } from '@/atom'
import useModalStore from '@/store/ModalStore'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children }: Props) => {
  const { modals, isModalOpen } = useModalStore()

  return (
    <div
      id="main-content"
      className={`mx-auto flex h-full min-h-fit w-full max-w-full flex-1 flex-col overflow-y-scroll rounded-md ${isModalOpen && 'pointer-events-none bg-white/95 blur-sm'}`}
    >
      {children}
      <CustomCreateModal isOpen={modals.createBoard} modalType="createBoard">
        <CustomCreateModal.Board />
      </CustomCreateModal>
      <Toaster position="bottom-right" />
    </div>
  )
}
