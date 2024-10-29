import { CustomDatePicker } from '@/atom/CustomDatePicker'
import { CustomPriorityPicker } from '@/atom/CustomPriorityPicker'
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
import { useEffect, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const DEFAULT_START_DATE = new Date()
const DEFAULT_END_DATE = new Date(DEFAULT_START_DATE)
DEFAULT_END_DATE.setDate(DEFAULT_START_DATE.getDate() + 1)

export const NewTaskModal = ({ handleSubmit }: Props) => {
  const [priority, setPriority] = useState<string>('')
  const [date, setDate] = useState<DateValueType>({
    startDate: DEFAULT_START_DATE,
    endDate: null
  })
  const { modals, toggleModal } = useModalStore()

  const handleDateChange = (event: DateValueType) => {
    if (event?.endDate) {
      setDate(event)
    }
  }

  const handlePriorityChange = (priorityLevel: string) => {
    setPriority(priorityLevel)
  }

  return (
    <Dialog
      open={modals.createTask}
      as="div"
      onClose={() => toggleModal('createTask')}
    >
      <div className="fixed inset-0 z-10 mx-auto grid h-full w-full max-w-md place-content-center md:max-w-xl">
        <div className="flex h-full flex-col items-center justify-start">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-xl"
          >
            <form onSubmit={event => handleSubmit(event)}>
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
                  <Label className="text-2xl font-medium text-white">
                    Description
                  </Label>
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
                <section className="flex flex-row items-center gap-2">
                  <Field>
                    <CustomDatePicker
                      date={date}
                      handleDateChange={handleDateChange}
                    />
                  </Field>
                  <Field>
                    <Label className="text-2xl font-medium text-white">
                      Priority
                    </Label>
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
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
