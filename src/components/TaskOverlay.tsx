import { Task } from '@/types'

export const TaskOverlay = ({ task }: { task: Task }) => {
  return (
    <div className="group w-full cursor-grab rounded-md bg-zinc-400/50 px-4 py-3 active:animate-pulse active:cursor-grabbing">
      <h3 className="text-lg font-bold">{task.taskTitle}</h3>
      <p className="text-md">{task.taskDescription}</p>
    </div>
  )
}
