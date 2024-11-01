import { priorities } from '@/utils/priority'
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  priority: string
  changePriority: (priorityLevel: string) => void
}

export const CustomPriorityPicker = ({ priority, changePriority }: Props) => {
  return (
    <div className="mt-4 w-full">
      <div className="mx-auto w-full">
        <RadioGroup
          value={priority}
          name="priority"
          onChange={priorityLevel => changePriority(priorityLevel)}
          aria-label="Priority level"
          className="flex w-full flex-row flex-wrap items-start justify-between gap-y-2 md:flex-col md:items-center"
        >
          {priorities.map(priority => (
            <Radio
              key={priority.level}
              value={priority.level}
              className={`group relative mx-auto flex h-fit w-full max-w-32 cursor-pointer justify-center rounded-lg ${priority.bg} ${priority.text} px-5 py-3 align-middle shadow-md transition focus:outline-none data-[checked]:${priority.checkedBg} data-[checked]:${priority.checkedText} data-[focus]:outline-1 data-[focus]:outline-white`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-md/6 text-center">
                  <p className="font-semibold">{priority.level}</p>
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
  )
}
