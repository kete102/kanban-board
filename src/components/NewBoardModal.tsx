import useModalStore from '@/store/ModalStore'
import {
  Description,
  Dialog,
  DialogPanel,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea
} from '@headlessui/react'
import clsx from 'clsx'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const NewBoardModal = ({ handleSubmit }: Props) => {
  const { modals, toggleModal } = useModalStore()
  return (
    <Dialog
      open={modals.createBoard}
      as="div"
      onClose={() => toggleModal('createBoard')}
    >
      <div className="fixed inset-0 top-40 z-10 w-screen overflow-y-auto">
        <div className="flex h-full flex-col items-center justify-start">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-5/6 rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <form onSubmit={e => handleSubmit(e)}>
              <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
                <Legend className="text-2xl font-semibold text-white">
                  Create new board
                </Legend>
                <Field>
                  <Label className="text-lg font-medium text-white">
                    Cool board Name
                  </Label>
                  <Input
                    required
                    name="boardTitle"
                    className={clsx(
                      'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-2xl font-medium text-white">
                    Description
                  </Label>
                  <Description className="text-md/6 mt-2 text-white/50">
                    What's it about?
                  </Description>
                  <Textarea
                    required
                    name="boardDescription"
                    className={clsx(
                      'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    rows={3}
                  />
                </Field>
                <div className="mt-4 inline-flex gap-4">
                  <button
                    type="submit"
                    className="shadow-xs cursor-pointer rounded-lg bg-indigo-500 px-6 py-2.5 text-center text-lg font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
                  >
                    Create
                  </button>

                  <button
                    type="button"
                    className="shadow-xs cursor-pointer rounded-lg bg-indigo-50 px-6 py-2.5 text-center text-lg font-semibold text-indigo-500 transition-all duration-500 hover:bg-indigo-100"
                    onClick={() => toggleModal('createBoard')}
                  >
                    Cancel
                  </button>
                </div>
              </Fieldset>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
