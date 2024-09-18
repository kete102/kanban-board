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
  isModalOpen: boolean
  toggleOpenModal: () => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const NewBoardModal = ({
  isModalOpen,
  toggleOpenModal,
  handleSubmit
}: Props) => {
  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 top-52 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-lg rounded-xl bg-black/95 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <form onSubmit={e => handleSubmit(e)}>
              <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                <Legend className="text-2xl font-semibold text-white">
                  Create new board
                </Legend>
                <Field>
                  <Label className="text-lg font-medium text-white">
                    Cool board Name
                  </Label>
                  <Input
                    name="board-name"
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
                    name="board-description"
                    className={clsx(
                      'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    rows={3}
                  />
                </Field>
              </Fieldset>
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
                  onClick={toggleOpenModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
