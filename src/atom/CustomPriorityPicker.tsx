import { priorities } from '@/utils/priority'
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const CustomPriorityPicker = ({ selected, setSelected }: Props) => {
  return (
    <div className="mt-4 w-full">
      <div className="mx-auto w-full">
        <RadioGroup
          value={selected}
          name="priority"
          onChange={() => setSelected}
          aria-label="Server size"
          className="flex w-full flex-row flex-wrap items-start justify-between gap-y-2 md:flex-row md:items-center"
        >
          {priorities.map(priority => (
            <Radio
              key={priority.level}
              value={priority.level}
              className={`group relative mx-auto flex h-fit w-full max-w-28 cursor-pointer justify-center rounded-lg ${priority.bg} ${priority.text} px-5 py-3 align-middle shadow-md transition focus:outline-none data-[checked]:${priority.checkedBg} data-[checked]:${priority.checkedText} data-[focus]:outline-1 data-[focus]:outline-white`}
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
