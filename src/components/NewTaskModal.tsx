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
  Radio,
  RadioGroup,
  Textarea
} from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

interface Priority {
  level: string
  bg: string
  text: string
  checkedBg: string
  checkedText: string
  fill: string
}

const priorities: Priority[] = [
  {
    level: 'low',
    bg: 'bg-green-100',
    text: 'text-green-800',
    checkedBg: 'bg-green-600',
    checkedText: 'text-white',
    fill: 'fill-green-600'
  },
  {
    level: 'medium',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    checkedBg: 'bg-yellow-500',
    checkedText: 'text-white',
    fill: 'fill-yellow-500'
  },
  {
    level: 'high',
    bg: 'bg-red-100',
    text: 'text-red-800',
    checkedBg: 'bg-red-500 ',
    checkedText: 'text-white',
    fill: 'fill-red-500'
  }
]

export const NewTaskModal = ({ handleSubmit }: Props) => {
  const [selected, setSelected] = useState()
  const { modals, toggleModal } = useModalStore()
  return (
    <Dialog
      open={modals.createTask}
      as="div"
      onClose={() => toggleModal('createTask')}
    >
      <div className="md:top-42 lg:top-32sm:max-w-xl fixed inset-0 top-32 z-10 mx-auto w-screen max-w-xs overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl">
        <div className="flex h-full flex-col items-center justify-start">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-zinc-950/50 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 md:max-w-xl"
          >
            <form onSubmit={e => handleSubmit(e)}>
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
                <Field>
                  <Label className="text-2xl font-medium text-white">
                    Priority
                  </Label>
                  <div className="mt-4 w-full">
                    <div className="mx-auto w-full">
                      <RadioGroup
                        value={selected}
                        name="priority"
                        onChange={setSelected}
                        aria-label="Server size"
                        className="flex w-full flex-row flex-wrap items-start justify-between gap-y-2 md:flex-row md:items-center"
                      >
                        {priorities.map(priority => (
                          <Radio
                            key={priority.level}
                            value={priority.level}
                            className={`group relative mx-auto flex h-fit w-full min-w-fit max-w-60 cursor-pointer justify-center rounded-lg ${priority.bg} ${priority.text} px-5 py-3 align-middle shadow-md transition focus:outline-none data-[checked]:${priority.checkedBg} data-[checked]:${priority.checkedText} data-[focus]:outline-1 data-[focus]:outline-white`}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="text-md/6 text-center">
                                <p className="font-semibold">
                                  {priority.level}
                                </p>
                              </div>
                              <CheckCircleIcon
                                className={`${priority.fill} size-6 opacity-0 transition group-data-[checked]:opacity-100`}
                              />
                            </div>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </Field>
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
