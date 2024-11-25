import { Task } from '@/types'
import { useDroppable } from '@dnd-kit/core'
import { IoFilter } from 'react-icons/io5'
import { TaskItem } from './TaskItem'

interface Props {
  columnType: string
  tasks: Task[]
}

export const KanbanColumn = ({ columnType, tasks }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnType
  })

  return (
    <div
      ref={setNodeRef}
      className={`my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-200 px-3 py-2 shadow-xl md:max-w-xl lg:max-w-2xl ${isOver ? 'bg-zinc-300' : 'bg-zinc-200/90'}`}
    >
      <h4 className="inline-flex w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-800/80">
        {columnType}
        <span className="text-md font-medium normal-case">
          <IoFilter />
        </span>
      </h4>
      <div className="flex w-full flex-col gap-2 py-2">
        {tasks.map(task => (
          <div key={task.id}>
            <TaskItem task={task} id={task.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
