import { Column, Task } from '@/types'
import { IoFilter } from 'react-icons/io5'
import { TaskItem } from './TaskItem'

interface Props {
  columnType: string
  column: Column
}

export const KanbanColumn = ({ columnType, column }: Props) => {
  return (
    <div
      id={column.columnId}
      className="my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-100 bg-zinc-200/90 px-3 py-2 shadow-xl shadow-white md:max-w-xl lg:max-w-2xl"
    >
      <h4 className="inline-flex w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-800/80">
        {columnType}
        <span className="text-md font-medium normal-case">
          <IoFilter />
        </span>
      </h4>
      <div className="flex w-full flex-col gap-2">
        {column.tasks.map((task: Task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </div>
    </div>
  )
}
