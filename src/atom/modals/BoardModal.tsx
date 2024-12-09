import { useModals } from '@/hooks/useModals'
import useModalStore from '@/store/ModalStore'
import { BoardInputs } from '@/types/modals/modals.types'
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea
} from '@headlessui/react'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomModalError } from './CustomModalError'

export const BoardModal = () => {
  const { handleSubmitBoard } = useModals()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BoardInputs>()
  const { toggleModal } = useModalStore()
  const onSubmit: SubmitHandler<BoardInputs> = data => {
    handleSubmitBoard(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
        <Legend className="text-center text-3xl font-semibold text-white">
          Create new board
        </Legend>
        <Field>
          <Label className="text-2xl font-medium text-white">Title</Label>
          <Input
            {...register('boardTitle', { required: 'Title is required' })}
            placeholder="Trip to L.A"
            className={clsx(
              'text-md mt-3 block min-h-[50px] w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-white',
              'placeholder:text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <CustomModalError errors={errors.boardTitle} />
        </Field>
        <Field>
          <Label className="text-2xl font-medium text-white">Description</Label>
          <Textarea
            {...register('boardDescription', {
              required: 'Decription is required'
            })}
            placeholder="What's it about?"
            className={clsx(
              'text-md mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-white',
              'placeholder:text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            rows={3}
          />
          <CustomModalError errors={errors.boardDescription} />
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
