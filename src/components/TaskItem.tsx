import Badge from '@/atom/Badge'
import { Task } from '@/types'

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  return (
    <div className="w-full rounded-md bg-zinc-400/50 px-4 py-3" key={task._id}>
      <h3 className="text-lg font-bold text-zinc-950">{task.taskTitle}</h3>
      <p className="text-md mb-2 text-zinc-500">{task.taskDescription}</p>
      <Badge priority={task.priority} />
    </div>
  )
}
