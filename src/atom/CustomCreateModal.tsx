import useModalStore, { ModalType } from '@/store/ModalStore'
import { Dialog, DialogPanel } from '@headlessui/react'
import { ModalContainer } from './ModalContainer'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isOpen: boolean
  modal: ModalType
  children: React.ReactNode
}

export const CustomCreateModal = ({
  handleSubmit,
  isOpen,
  modal,
  children
}: Props) => {
  const { toggleModal } = useModalStore()

  return (
    <Dialog open={isOpen} as="div" onClose={() => toggleModal(modal)}>
      <ModalContainer>
        <DialogPanel
          transition
          className="data-[closed]:transform-[scale(95%)] w-screen max-w-sm rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-xl"
        >
          <form onSubmit={e => handleSubmit(e)}>{children}</form>
        </DialogPanel>
      </ModalContainer>
    </Dialog>
  )
}
