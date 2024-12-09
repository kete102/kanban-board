import { Label } from '@headlessui/react'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

interface Props {
  date: DateValueType
  handleDateChange: (event: DateValueType) => void
}

export const CustomDatePicker = ({ date, handleDateChange }: Props) => {
  return (
    <div className="mb-2 flex flex-col gap-2 align-middle">
      <Label
        htmlFor="endDate"
        className="inline-flex items-center gap-2 text-xl font-medium text-white md:text-2xl"
      >
        End date
      </Label>
      <div className="w-fit">
        <Datepicker
          inputClassName="text-white rounded-md outline-none font-medium text-lg p-2 bg-white/5 focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
          placeholder={'Select a date'}
          useRange={false}
          asSingle={true}
          popoverDirection="up"
          primaryColor="indigo"
          value={date}
          onChange={event => handleDateChange(event)}
          inputName="taskEndDate"
          readOnly
        />
      </div>
    </div>
  )
}
