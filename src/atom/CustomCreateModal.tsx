import { ModalContextProps, Props } from '@/interfaces/modal'
import useModalStore from '@/store/ModalStore'
import { Dialog, DialogPanel } from '@headlessui/react'
import { createContext } from 'react'
import { ModalContainer } from './ModalContainer'
import { BoardModal, TaskModal } from './modals'

export const ModalContext = createContext({} as ModalContextProps)
const { Provider } = ModalContext

export const CustomCreateModal = ({ isOpen, modalType, children }: Props) => {
  const { toggleModal } = useModalStore()

  return (
    <Provider
      value={{
        isUpdating: false,
        isOpen,
        modalType
      }}
    >
      <Dialog open={isOpen} as="div" onClose={() => toggleModal(modalType)}>
        <ModalContainer>
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] h-full max-h-[470px] min-h-[450px] w-screen max-w-sm overflow-y-scroll rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-h-[650px] md:max-w-xl"
          >
            {children}
          </DialogPanel>
        </ModalContainer>
      </Dialog>
    </Provider>
  )
}

CustomCreateModal.Board = BoardModal
CustomCreateModal.Task = TaskModal
