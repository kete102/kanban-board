import { useModals } from '@/hooks/useModals'
import useModalStore from '@/store/ModalStore'
import { TaskInputs } from '@/types/modals/modals.types'
import { priorities } from '@/utils/priority'
import { Field, Fieldset, Input, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomModalError } from './CustomModalError'
import './datepicker.css'

export const TaskModal = ({ boardId }: { boardId: string }) => {
  const { handleSubmitTask } = useModals()
  const { toggleModal } = useModalStore()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskInputs>()
  const onSubmit: SubmitHandler<TaskInputs> = data => {
    if (data.taskPriority === 'default') {
      data.taskPriority = 'low'
    }
    console.log(data)
    handleSubmitTask({ taskData: data, boardId })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="space-y-8 rounded-xl p-6 sm:p-10">
        <Field>
          <Label className="text-xl font-medium text-white md:text-2xl">
            Title
          </Label>
          <Input
            {...register('taskTitle', { required: 'Title is required' })}
            placeholder="Call Andy..."
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white placeholder:text-lg',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <CustomModalError errors={errors.taskTitle} />
        </Field>
        <Field>
          <Label className="text-xl font-medium text-white md:text-2xl">
            What's it about?
          </Label>
          <Textarea
            placeholder="Job opportunity..."
            {...register('taskDescription', {
              required: 'Description is required'
            })}
            className={clsx(
              'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white placeholder:text-lg',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            rows={3}
          />

          <CustomModalError errors={errors.taskDescription} />
        </Field>
        <section className="flex flex-col items-start gap-8 md:flex-row md:gap-8">
          {/* DatePicker */}
          <Field className="flex w-full flex-col space-y-2">
            <Label
              htmlFor="endDate"
              className="inline-flex items-center gap-2 text-xl font-medium text-white md:text-2xl"
            >
              End date
            </Label>
            <input
              type="date"
              {...register('taskEndDate', {
                required: 'End date is required'
              })}
              className="datepicker rounded-md bg-white/5 p-2 text-lg font-medium text-white outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
            />
            <CustomModalError errors={errors.taskEndDate} />
          </Field>
          <Field className="flex w-full flex-col space-y-2">
            <Label className="text-xl font-medium text-white md:text-2xl">
              Priority
            </Label>
            <select
              {...register('taskPriority', {
                required: 'Priority is required'
              })}
              className="group flex cursor-default select-none items-center gap-2 rounded-md bg-white/5 px-2 py-3 font-medium text-white outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25 data-[focus]:bg-white/10"
            >
              <option
                defaultValue="default"
                className="bg-zinc-400 py-2 font-medium outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
              >
                Select One
              </option>
              {priorities.map(priority => (
                <option
                  key={priority.level}
                  value={priority.level}
                  className="bg-zinc-400 py-2 outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
                >
                  {priority.level}
                </option>
              ))}
            </select>
            <CustomModalError errors={errors.taskPriority} />
          </Field>
        </section>
        <div className="mt-5 inline-flex w-full justify-center gap-4">
          <button
            type="submit"
            className="shadow-xs cursor-pointer rounded-lg border-2 border-indigo-600 bg-indigo-300 px-6 py-2.5 text-center text-lg font-semibold text-zinc-600 transition-all duration-500 hover:bg-indigo-800 hover:text-white"
          >
            Create
          </button>

          <button
            type="button"
            className="shadow-xs cursor-pointer rounded-lg border-2 border-zinc-600 bg-zinc-300 px-6 py-2.5 text-center text-lg font-semibold text-zinc-600 transition-all duration-500 hover:bg-zinc-800 hover:text-white"
            onClick={() => toggleModal('createTask')}
          >
            Cancel
          </button>
        </div>
      </Fieldset>
    </form>
  )
}
