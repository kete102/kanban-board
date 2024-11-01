import useModalStore from '@/store/ModalStore'
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea
} from '@headlessui/react'
import clsx from 'clsx'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { CustomDatePicker } from '../CustomDatePicker'
import { CustomPriorityPicker } from '../CustomPriorityPicker'

interface Props {
  date: DateValueType
  priority: string
  handlePriorityChange: (priorityLevel: string) => void
  handleDateChange: (event: DateValueType) => void
}

export const TaskModal = ({
  date,
  priority,
  handlePriorityChange,
  handleDateChange
}: Props) => {
  const { toggleModal } = useModalStore()
  return (
    <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
      <Legend className="text-2xl font-semibold text-white">
        Create new task
      </Legend>
      <Field>
        <Label className="text-lg font-medium text-white">
          What's it about
        </Label>
        <Input
          required
          name="taskTitle"
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        />
      </Field>
      <Field>
        <Label className="text-2xl font-medium text-white">Description</Label>
        <Description className="text-md/6 mt-2 text-white/50">
          What's it about?
        </Description>
        <Textarea
          required
          name="taskDescription"
          className={clsx(
            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          rows={3}
        />
      </Field>
      <section className="flex flex-col items-start gap-2 md:flex-row md:gap-8">
        <Field>
          <CustomDatePicker date={date} handleDateChange={handleDateChange} />
        </Field>
        <Field>
          <Label className="text-2xl font-medium text-white">Priority</Label>
          <CustomPriorityPicker
            changePriority={handlePriorityChange}
            priority={priority}
          />
        </Field>
      </section>
      <div className="mt-5 inline-flex w-full justify-center gap-4">
        <button
          type="submit"
          className="shadow-xs cursor-pointer rounded-lg bg-indigo-500 px-6 py-2.5 text-center text-lg font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
        >
          Create
        </button>

        <button
          type="button"
          className="shadow-xs cursor-pointer rounded-lg bg-indigo-50 px-6 py-2.5 text-center text-lg font-semibold text-indigo-500 transition-all duration-500 hover:bg-indigo-100"
          onClick={() => toggleModal('createTask')}
        >
          Cancel
        </button>
      </div>
    </Fieldset>
  )
}
