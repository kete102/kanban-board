import Badge from '@/atom/Badge'
import { Task } from '@/types'
import clsx from 'clsx'
import { BsCalendar2Check } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'

export const TaskOverlay = ({ task }: { task: Task }) => {
  return (
    <div className="group w-full cursor-grab rounded-md bg-zinc-400/50 px-4 py-3 active:animate-pulse active:cursor-grabbing">
      <section className="inline-flex w-full items-center justify-between">
        <h3
          className={clsx('text-lg font-bold text-zinc-950', {
            'line-through': task.status === 'done'
          })}
        >
          {task.taskTitle}
        </h3>
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
