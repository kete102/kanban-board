import { create } from 'zustand'

type ModalType = 'createBoard' | 'deleteBoard' | 'createTask' | 'deleteTask'

interface ModalState {
  modals: Record<ModalType, boolean>
  toggleModal: (modalName: ModalType) => void
}

const useModalStore = create<ModalState>(set => ({
  modals: {
    createTask: false,
    deleteTask: false,
    createBoard: false,
    deleteBoard: false
  },
  toggleModal: modalName =>
    set(state => ({
      modals: {
        ...state.modals,
        [modalName]: !state.modals[modalName]
      }
    }))
}))

export default useModalStore
