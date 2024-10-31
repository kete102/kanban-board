import useModalStore from '@/store/ModalStore'
import { Dialog, DialogPanel } from '@headlessui/react'

export const CustomModal = () => {
  const { toggleModal } = useModalStore()
  return (
    <Dialog open={true} as="div" onClose={() => toggleModal('createBoard')}>
      <div className="fixed inset-0 z-10 mx-auto grid h-full w-full max-w-md place-content-center md:max-w-xl">
        <div className="flex h-full flex-col items-center justify-start">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-xl"
          ></DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
