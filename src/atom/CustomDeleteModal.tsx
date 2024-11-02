import useModalStore, { ModalType } from '@/store/ModalStore'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ModalContainer } from './ModalContainer'

interface Props {
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
  modal: ModalType
}

export const CustomDeleteModal = ({
  onCancel,
  onConfirm,
  isOpen,
  modal
}: Props) => {
  const { toggleModal } = useModalStore()
  return (
    <Dialog open={isOpen} as="div" onClose={() => toggleModal(modal)}>
      <ModalContainer>
        <DialogPanel
          transition
          className="data-[closed]:transform-[scale(95%)] flex h-full max-h-[350px] min-h-[250px] w-screen max-w-sm flex-col items-center justify-center overflow-y-scroll rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-md"
        >
          <DialogTitle as="h3" className="text-4xl font-semibold text-zinc-800">
            Are you sure?
          </DialogTitle>
          <div className="mt-8 inline-flex items-center gap-2">
            <button
              className="inline-flex items-center rounded-md border-2 border-indigo-600 bg-indigo-300 px-5 py-2.5 text-sm font-bold text-zinc-600"
              onClick={onCancel}
            >
              No, cancel
            </button>

            <button
              className="inline-flex items-center rounded-md border-2 border-red-700 bg-red-300 px-5 py-2.5 text-sm font-bold text-zinc-600"
              onClick={onConfirm}
            >
              Yes, delete
            </button>
          </div>
        </DialogPanel>
      </ModalContainer>
    </Dialog>
  )
}
