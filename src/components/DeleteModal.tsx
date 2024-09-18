import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface Props {
  isOpen: boolean
  toggleModal: () => void
  removeBoard: () => void
}

export const DeleteModal = ({ isOpen, toggleModal, removeBoard }: Props) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={toggleModal}
    >
      <div className="fixed inset-0 top-52 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] grid w-full max-w-md place-items-center rounded-xl bg-black/95 p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-2xl font-medium text-white">
              Are you sure?
            </DialogTitle>
            <div className="mt-8 inline-flex items-center gap-2">
              <button
                className="text-md inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white shadow-sm"
                onClick={toggleModal}
              >
                Cancel
              </button>

              <button
                className="text-md inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white shadow-sm"
                onClick={removeBoard}
              >
                Eliminar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
