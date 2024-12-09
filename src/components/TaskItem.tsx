import Badge from '@/atom/Badge'
import { useTasks } from '@/hooks/useTasks'
import { Task } from '@/types/tasks/tasks.types'
import { useDraggable } from '@dnd-kit/core'
import clsx from 'clsx'
import { BsCalendar2Check } from 'react-icons/bs'
import { CiCalendar, CiTrash } from 'react-icons/ci'

interface Props {
  task: Task
  id: string
}

export const TaskItem = ({ task, id }: Props) => {
  const { deleteTask } = useTasks()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: { status: task.taskStatus }
  })

  const handleTaskDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation()
    console.log(task.taskId, task.boardId)
    deleteTask({ taskId: id, boardId: task.boardId })
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        'group w-full cursor-grab touch-none rounded-md border border-zinc-600 bg-zinc-400/50 px-4 py-3 transition-transform duration-200 ease-in-out active:cursor-grabbing active:touch-none',
        { 'opacity-0': isDragging },
        { 'select-none': isDragging }
      )}
    >
      <section className="inline-flex w-full select-none items-center justify-between">
        <h3
          className={clsx('text-lg font-bold text-zinc-950', {
            'line-through': task.taskStatus === 'done'
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
        className={clsx(
          'text-md mb-2 w-full max-w-[250px] select-none text-zinc-500',
          {
            'line-through': task.taskStatus === 'done'
          }
        )}
      >
        {task.taskDescription}
      </p>
      <section className="inline-flex w-full select-none items-center justify-between">
        <h5 className="inline-flex items-center gap-1 font-semibold text-zinc-500">
          {task.taskStatus === 'done' ? (
            <BsCalendar2Check size={20} />
          ) : (
            <CiCalendar size={24} />
          )}
          {new Date(task.taskEndDate).toLocaleDateString()}
        </h5>

        <Badge priority={task.taskPriority} />
      </section>
    </div>
  )
}
