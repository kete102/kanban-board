import { DropZone } from '@/atom/DropZone'
import { Task } from '@/types'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { IoFilter } from 'react-icons/io5'
import { TaskItem } from './TaskItem'

interface Props {
  columnType: string
  isDragging: Task | undefined
  tasks: Task[]
}

export const KanbanColumn = ({ columnType, tasks, isDragging }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnType
  })

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-200 bg-zinc-200/90 px-3 py-2 shadow-xl md:max-w-xl lg:max-w-2xl',
        { 'bg-stone-100': isOver },
        { 'select-none': isDragging }
      )}
    >
      <h4 className="inline-flex w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-800/80">
        {columnType}
        <span className="text-md font-medium normal-case">
          <IoFilter />
        </span>
      </h4>
      <DropZone isDragging={isDragging} />
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
