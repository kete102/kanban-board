import Badge from '@/atom/Badge'
import { useTasks } from '@/hooks/useTasks'
import { Task } from '@/types'
import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { BsCalendar2Check } from 'react-icons/bs'
import { CiCalendar, CiTrash } from 'react-icons/ci'

interface Props {
  task: Task
  id: string
}

export const TaskItem = ({ task, id }: Props) => {
  const { deleteTask } = useTasks()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { status: task.status }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: 'transform 100ms ease-in-out'
  }

  const handleTaskDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation()
    console.log(task.id, task.boardId)
    deleteTask({ taskId: id, boardId: task.boardId })
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group w-full cursor-grab rounded-md border border-zinc-600 bg-zinc-400/50 px-4 py-3 active:animate-pulse active:cursor-grabbing active:touch-none`}
    >
      <section className="inline-flex w-full items-center justify-between">
        <h3
          className={clsx('text-lg font-bold text-zinc-950', {
            'line-through': task.status === 'done'
          })}
        >
          {task.taskTitle}
        </h3>
        <button
          className="flex items-center gap-3"
          onClick={e => handleTaskDelete(e)}
        >
          <CiTrash
            size={23}
            className="cursor-pointer transition-all lg:opacity-0 lg:group-hover:opacity-100"
          />
        </button>
      </section>
      <p
        className={clsx('text-md mb-2 w-full max-w-[250px] text-zinc-500', {
          'line-through': task.status === 'done'
        })}
      >
        {task.taskDescription}
      </p>
      <section className="inline-flex w-full items-center justify-between">
        <h5 className="inline-flex items-center gap-1 font-semibold text-zinc-500">
          {task.status === 'done' ? (
            <BsCalendar2Check size={20} />
          ) : (
            <CiCalendar size={24} />
          )}
          {new Date(task.endDate).toLocaleDateString()}
        </h5>

        <Badge priority={task.priority} />
      </section>
    </div>
  )
}
