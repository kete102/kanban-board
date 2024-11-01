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
          className="data-[closed]:transform-[scale(95%)] h-full max-h-[550px] min-h-[450px] w-screen max-w-sm overflow-y-scroll rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-xl"
        >
          <form onSubmit={e => handleSubmit(e)}>{children}</form>
        </DialogPanel>
      </ModalContainer>
    </Dialog>
  )
}
