import { priorities } from '@/utils/priority'
import { Field } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface Props {
  changePriority: (priorityLevel: string) => void
}

export const CustomPriorityPicker = ({ changePriority }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedPriority, setSelectedPriority] = useState<string>('default')
  const handleSelect = (level: string) => {
    setSelectedPriority(level)
    setIsOpen(false)
    console.log(level)
    // changePriority(selectedPriority)
  }
  const selectedPriorityLabel =
    priorities.find(p => p.level === selectedPriority)?.level || 'Select One'

  return (
    <div className="mt-2 w-full">
      <div className="mx-auto w-full">
        <Field className="w-full">
          <div className="relative w-full">
            <div
              className="block w-full cursor-pointer appearance-none rounded-lg bg-white/5 p-2 px-3 text-lg text-white focus:outline-none focus:ring-2 focus:ring-white/25"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <div className="flex items-center justify-between">
                <span>{selectedPriorityLabel}</span>
                <ChevronDownIcon className="pointer-events-none h-5 w-5 fill-white/60" />
              </div>
            </div>
            {isOpen && (
              <ul className="absolute z-10 mt-2 w-full rounded-b-lg bg-zinc-700 shadow-lg">
                <li
                  className="p-2 text-white hover:bg-zinc-600"
                  onClick={() => handleSelect('default')}
                >
                  Select One
                </li>
                {priorities.map(priority => (
                  <li
                    key={priority.level}
                    className="flex items-center gap-2 p-2 text-white hover:bg-zinc-600"
                    onClick={() => handleSelect(priority.level)}
                  >
                    <span
                      className={`h-4 w-4 rounded-full ${priority.fill}`}
                      aria-hidden="true"
                    ></span>
                    {priority.level}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>
        {/* <RadioGroup */}
        {/*   value={priority} */}
        {/*   name="priority" */}
        {/*   onChange={priorityLevel => changePriority(priorityLevel)} */}
        {/*   aria-label="Priority level" */}
        {/*   className="flex w-full flex-row flex-wrap items-start justify-between gap-y-2 md:flex-col md:items-center" */}
        {/* > */}
        {/*   {priorities.map(priority => ( */}
        {/*     <Radio */}
        {/*       key={priority.level} */}
        {/*       value={priority.level} */}
        {/*       className={`group relative mx-auto flex h-fit w-full max-w-32 cursor-pointer justify-center rounded-lg ${priority.bg} ${priority.text} px-5 py-3 align-middle shadow-md transition focus:outline-none data-[checked]:${priority.checkedBg} data-[checked]:${priority.checkedText} data-[focus]:outline-1 data-[focus]:outline-white`} */}
        {/*     > */}
        {/*       <div className="flex w-full items-center justify-between"> */}
        {/*         <div className="text-md/6 text-center"> */}
        {/*           <p className="font-semibold">{priority.level}</p> */}
        {/*         </div> */}
        {/*         <CheckCircleIcon */}
        {/*           className={`${priority.fill} size-6 opacity-0 transition group-data-[checked]:opacity-100`} */}
        {/*         /> */}
        {/*       </div> */}
        {/*     </Radio> */}
        {/*   ))} */}
        {/* </RadioGroup> */}
      </div>
    </div>
  )
}
