import Badge from '@/atom/Badge'
import { useModals } from '@/hooks/useModals'
import { useTasks } from '@/hooks/useTasks'
import { Task } from '@/types'
import clsx from 'clsx'
import { BsCalendar2Check } from 'react-icons/bs'
import { CiCalendar, CiEdit, CiTrash } from 'react-icons/ci'

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const { deleteTask } = useTasks()
  const { handleIsUpdating } = useModals()

  const handleTaskDelete = () => {
    deleteTask({ taskId: task._id, boardId: task.boardId })
  }

  return (
    <div
      className="group w-full rounded-md bg-zinc-400/50 px-4 py-3"
      key={task._id}
    >
      <section className="inline-flex w-full items-center justify-between">
        <h3
          className={clsx('text-lg font-bold text-zinc-950', {
            'line-through': task.status === 'done'
          })}
        >
          {task.taskTitle}
        </h3>
        <div className="flex items-center gap-3">
          <CiEdit
            size={23}
            className="cursor-pointer transition-all lg:opacity-0 lg:group-hover:opacity-100"
            onClick={() => handleIsUpdating(task)}
          />
          <CiTrash
            size={23}
            onClick={handleTaskDelete}
            className="cursor-pointer transition-all lg:opacity-0 lg:group-hover:opacity-100"
          />
        </div>
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
