import { Task } from '@/types/tasks/tasks.types'
import clsx from 'clsx'

export const DropZone = ({ isDragging }: { isDragging: Task | undefined }) => {
  return (
    <div
      className={clsx(
        'relative h-2 w-full text-center transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:bg-green-300 only:h-32',
        { 'py-8 opacity-100': isDragging },
        { 'opacity-0': !isDragging }
      )}
    ></div>
  )
}
