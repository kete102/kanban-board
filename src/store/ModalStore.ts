import { create } from 'zustand'

export type ModalType =
  | 'createBoard'
  | 'deleteBoard'
  | 'createTask'
  | 'deleteTask'

interface ModalState {
  isModalOpen: boolean
  modals: Record<ModalType, boolean>
  toggleModal: (modalName: ModalType) => void
}

const useModalStore = create<ModalState>(set => ({
  isModalOpen: false,
  modals: {
    createTask: false,
    deleteTask: false,
    createBoard: false,
    deleteBoard: false
  },
  toggleModal: modalName =>
    set(state => ({
      isModalOpen: !state.isModalOpen,
      modals: {
        ...state.modals,
        [modalName]: !state.modals[modalName]
      }
    }))
}))

export default useModalStore
