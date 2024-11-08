import useModalStore from '@/store/ModalStore'
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea
} from '@headlessui/react'
import clsx from 'clsx'

interface BoardModalProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export const BoardModal = ({ handleSubmit }: BoardModalProps) => {
  const { toggleModal } = useModalStore()
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
        <Legend className="text-center text-3xl font-semibold text-white">
          Create new board
        </Legend>
        <Field>
          <Label className="text-2xl font-medium text-white">Title</Label>
          <Input
            required
            placeholder="Trip to L.A"
            name="boardTitle"
            className={clsx(
              'text-md mt-3 block min-h-[50px] w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-white',
              'placeholder:text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
        </Field>
        <Field>
          <Label className="text-2xl font-medium text-white">Description</Label>
          <Textarea
            placeholder="What's it about?"
            required
            name="boardDescription"
            className={clsx(
              'text-md mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-white',
              'placeholder:text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            rows={3}
          />
        </Field>
        <div className="mx-auto mt-4 inline-flex w-full justify-center gap-4">
          <button
            type="submit"
            className="shadow-xs cursor-pointer rounded-lg border-2 border-indigo-600 bg-indigo-300 px-6 py-2.5 text-center text-lg font-semibold text-zinc-600 transition-all duration-500 hover:bg-indigo-800 hover:text-white"
          >
            Create
          </button>

          <button
            type="button"
            className="shadow-xs cursor-pointer rounded-lg border-2 border-zinc-600 bg-zinc-300 px-6 py-2.5 text-center text-lg font-semibold text-zinc-600 transition-all duration-500 hover:bg-zinc-800 hover:text-white"
            onClick={() => toggleModal('createBoard')}
          >
            Cancel
          </button>
        </div>
      </Fieldset>
    </form>
  )
}
